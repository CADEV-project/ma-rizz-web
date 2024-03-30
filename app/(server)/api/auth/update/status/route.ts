import { NextRequest } from 'next/server';

import { AuthUpdateStatusRequestBody } from './type';

import { ErrorResponse, Forbidden } from '@/(server)/error';
import { getConnection, getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, getRequestBodyJSON, getRequestAccessToken } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/status
 * @required accessToken
 * @body AuthUpdateStatusRequestBody
 * @return void
 */
export const PATCH = async (request: NextRequest) => {
  await getConnection();

  try {
    const accessToken = getRequestAccessToken(request);

    const { accountId, userId } = getVerifiedAccessToken(accessToken);

    const requestBodyJSON = await getRequestBodyJSON<AuthUpdateStatusRequestBody>(request, [
      'status',
    ]);

    const account = await AccountModel.findById(getObjectId(accountId)).exec();

    if (!account) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'account' });

    const user = await UserModel.findById(getObjectId(userId)).exec();

    if (!user) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'user' });

    if (requestBodyJSON.status === 'pending' || requestBodyJSON.status === 'withdrew')
      throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'accountStatus' });

    if (account.status !== requestBodyJSON.status) {
      account.status = requestBodyJSON.status;

      await account.save();
    }

    return SuccessResponse({ method: 'PATCH' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
