import { NextRequest } from 'next/server';

import { AuthUpdateStatusRequestBody } from './type';

import { ErrorResponse, Forbidden, NotFound } from '@/(server)/error';
import { getConnection, getObjectId } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, getAuthorization, getRequestBodyJSON } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/status
 * @requires token
 * @body AuthUpdateStatusRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  await getConnection();

  try {
    const { accountId, userId } = getAuthorization(request, 'bearer');

    const requestBodyJSON = await getRequestBodyJSON<AuthUpdateStatusRequestBody>(request, [
      'status',
    ]);

    const account = await AccountModel.findById(getObjectId(accountId)).exec();

    if (!account)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['account'] } });

    const user = await UserModel.findById(getObjectId(userId)).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    if (requestBodyJSON.status === 'pending' || requestBodyJSON.status === 'withdrew')
      throw new Forbidden({ type: 'Forbidden', code: 403 });

    if (account.status !== requestBodyJSON.status) {
      account.status = requestBodyJSON.status;

      await account.save();
    }

    return SuccessResponse({ method: 'PATCH' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
