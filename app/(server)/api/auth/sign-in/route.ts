import { NextRequest } from 'next/server';

import { AuthSignInRequestBody } from './type';

import { ErrorResponse, Forbidden, NotFound } from '@/(server)/error';
import { comparePassword, getConnection, getSignedTokens } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import {
  SuccessResponse,
  getRequestBodyJSON,
  getAccessTokenCokie,
  getRefreshTokenCookie,
  validate,
  getAutoSignInCookie,
} from '@/(server)/util';

/**
 * NOTE: /api/auth/sign-in
 * @body AuthSignInRequestBody
 * @return void
 */
export const POST = async (request: NextRequest) => {
  await getConnection();

  try {
    const requestBodyJSON = await getRequestBodyJSON<AuthSignInRequestBody>(request, [
      'email',
      'password',
      'autoSignIn',
    ]);

    validate({ email: requestBodyJSON.email, password: requestBodyJSON.password });

    const user = await UserModel.findOne({ email: requestBodyJSON.email }).exec();

    if (!user) {
      throw new NotFound({ type: 'NotFound', code: 404, detail: 'email' });
    }

    const isAuthorized = await comparePassword(requestBodyJSON.password, user.password);

    if (!isAuthorized) {
      throw new NotFound({ type: 'NotFound', code: 404, detail: 'password' });
    }

    const account = await AccountModel.findOne({ userId: user._id }).exec();

    if (!account) {
      throw new NotFound({ type: 'NotFound', code: 404, detail: 'account' });
    }

    const isActive = account.status === 'active';

    if (!isActive) {
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: 'accountStatus',
      });
    }

    const signedTokens = getSignedTokens({
      accountId: account._id.toHexString(),
      userId: user._id.toHexString(),
    });

    account.refreshToken = signedTokens.refreshToken;

    await account.save();

    const accessTokenCookie = getAccessTokenCokie({
      value: signedTokens.accessToken,
      autoSignIn: requestBodyJSON.autoSignIn,
    });
    const refreshTokenCookie = getRefreshTokenCookie({
      value: signedTokens.refreshToken,
      autoSignIn: requestBodyJSON.autoSignIn,
    });
    const autoSignInCookie = getAutoSignInCookie(requestBodyJSON.autoSignIn);

    return SuccessResponse({
      method: 'POST',
      cookies: [accessTokenCookie, refreshTokenCookie, autoSignInCookie],
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
