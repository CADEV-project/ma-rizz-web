import { NextRequest } from 'next/server';

import { AuthDeleteRequestSearchParams } from './type';

import { Conflict, ErrorResponse, Forbidden, NotFound } from '@/(server)/error';
import { comparePassword, getConnection, getObjectId } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, getAuthorization, getRequestSearchPraramsJSON } from '@/(server)/util';

/**
 * NOTE: /api/auth/delete
 * @requires token
 * @params AuthDeleteRequestSearchParams
 */
export const DELETE = async (request: NextRequest) => {
  await getConnection();

  try {
    const { accountId, userId } = getAuthorization(request, 'bearer');

    const account = await AccountModel.findOne({
      _id: getObjectId(accountId),
      userId: getObjectId(userId),
    }).exec();

    if (!account)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['account'] } });

    const user = await UserModel.findById(getObjectId(userId)).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    if (account.status === 'withdrew') throw new Conflict({ type: 'Conflict', code: 409 });

    if (account.type === 'credentials') {
      const searchParams = getRequestSearchPraramsJSON<AuthDeleteRequestSearchParams>(request, [
        'password',
      ]);

      const isAuthorized = comparePassword(searchParams.password, user.password);

      if (!isAuthorized) throw new Forbidden({ type: 'Forbidden', code: 403 });
    }

    account.status = 'withdrew';

    await account.save();

    return SuccessResponse({ method: 'DELETE' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
