import { NextRequest } from 'next/server';

import { ErrorResponse, Forbidden } from '@/(server)/error';
import {
  getConnection,
  getObjectId,
  getSignedTokens,
  getVerifiedRefreshToken,
} from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import {
  SuccessResponse,
  getAccessTokenCokie,
  getAutoSignInCookie,
  getRefreshTokenCookie,
  getRequestAutoSignIn,
  getRequestRefreshToken,
} from '@/(server)/util';

import { COOKIE_KEY } from '@/constant';

/**
 * NOTE: /api/auth/refresh-token
 * @required refreshToken
 * @return AuthRefreshTokenResponse
 */
export const POST = async (request: NextRequest) => {
  await getConnection();

  try {
    const refreshToken = getRequestRefreshToken(request);
    const autoSignIn = getRequestAutoSignIn(request);

    const { accountId, userId } = getVerifiedRefreshToken(refreshToken);

    const account = await AccountModel.findOne({
      _id: getObjectId(accountId),
      userId: getObjectId(userId),
      refreshToken,
    }).exec();

    if (!account) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'account' });

    const newSignedTokens = getSignedTokens({ accountId, userId });

    account.refreshToken = newSignedTokens.refreshToken;

    await account.save();

    const newAccessTokenCookie = getAccessTokenCokie({
      value: newSignedTokens.accessToken,
      autoSignIn,
    });
    const newRefreshTokenCookie = getRefreshTokenCookie({
      value: newSignedTokens.refreshToken,
      autoSignIn,
    });
    const newAutoSignInCookie = autoSignIn ? getAutoSignInCookie(autoSignIn) : undefined;

    return SuccessResponse({
      method: 'POST',
      cookies: newAutoSignInCookie
        ? [newAccessTokenCookie, newRefreshTokenCookie, newAutoSignInCookie]
        : [newAccessTokenCookie, newRefreshTokenCookie],
    });
  } catch (error) {
    const response = ErrorResponse(error);

    response.cookies.delete(COOKIE_KEY.accessToken);
    response.cookies.delete(COOKIE_KEY.refreshToken);
    response.cookies.delete(COOKIE_KEY.autoSignIn);

    return response;
  }
};
