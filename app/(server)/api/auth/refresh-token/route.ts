import { NextRequest } from 'next/server';

import { ErrorResponse, NotFound, Unauthorized } from '@/(server)/error';
import {
  getConnection,
  getObjectId,
  getSignedTokens,
  getVerifiedRefreshToken,
} from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, getAccessTokenCokie, getRefreshTokenCookie } from '@/(server)/util';

import { COOKIE_KEY } from '@/constant';

/**
 *
 * @requires token
 * @returns AuthRefreshTokenResponse
 */
export const POST = async (request: NextRequest) => {
  await getConnection();

  try {
    const refreshTokenCookie = request.cookies.get(COOKIE_KEY.refreshToken);

    if (!refreshTokenCookie)
      throw new Unauthorized({
        type: 'Unauthorized',
        code: 401,
        detail: { reason: 'Refresh token is not exist.' },
      });

    const { accountId, userId } = getVerifiedRefreshToken(refreshTokenCookie.value);

    const account = await AccountModel.findOne({
      _id: getObjectId(accountId),
      userId: getObjectId(userId),
      refreshToken: refreshTokenCookie.value,
    }).exec();

    if (!account)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['account'] } });

    const newSignedTokens = getSignedTokens({ accountId, userId });

    account.refreshToken = newSignedTokens.refreshToken;

    await account.save();

    const newAccessTokenCookie = getAccessTokenCokie(newSignedTokens.accessToken);
    const newRefreshTokenCookie = getRefreshTokenCookie(newSignedTokens.refreshToken);

    return SuccessResponse({
      method: 'POST',
      cookies: [newAccessTokenCookie, newRefreshTokenCookie],
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
