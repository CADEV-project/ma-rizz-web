import { NextRequest } from 'next/server';

import { AuthRefreshTokenResponse } from './type';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { getSignedTokens } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, tokenParser } from '@/(server)/util';

/**
 *
 * @requires token
 * @returns AuthRefreshTokenResponse
 */
export const GET = async (request: NextRequest) => {
  try {
    const token = tokenParser(request.headers.get('Authorization'));

    const user = await UserModel.findOne({ refreshToken: token }).exec();

    if (!user)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['refreshToken'] } });

    const tokenDatas = getSignedTokens({ userId: user._id.toHexString() });

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { refreshToken: tokenDatas.refreshToken }
    ).exec();

    return SuccessResponse<AuthRefreshTokenResponse>('GET', tokenDatas);
  } catch (error) {
    return ErrorResponse(error);
  }
};
