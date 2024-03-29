import { NextRequest } from 'next/server';

import { AuthUpdatePasswordRequestBody } from './type';

import { ErrorResponse, Forbidden, NotFound } from '@/(server)/error';
import {
  comparePassword,
  getConnection,
  getObjectId,
  getVerifiedAccessToken,
} from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, getRequestBodyJSON, getRequestAccessToken } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/password
 * @requires token
 * @body AuthUpdatePasswordRequestBody
 * @return void;
 */
export const PATCH = async (request: NextRequest) => {
  await getConnection();

  try {
    const accessToken = getRequestAccessToken(request);

    const { accountId, userId } = getVerifiedAccessToken(accessToken);

    const requestBody = await getRequestBodyJSON<AuthUpdatePasswordRequestBody>(request, [
      'currentPassword',
      'newPassword',
    ]);

    const account = await AccountModel.findById(getObjectId(accountId)).exec();

    if (!account) throw new NotFound({ type: 'NotFound', code: 404, detail: 'account' });

    const user = await UserModel.findById(getObjectId(userId)).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: 'user' });

    const isAuthorized = comparePassword(requestBody.currentPassword, user.password);

    if (!isAuthorized) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'password' });

    user.password = requestBody.newPassword;

    await user.save();

    return SuccessResponse({ method: 'PATCH' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
