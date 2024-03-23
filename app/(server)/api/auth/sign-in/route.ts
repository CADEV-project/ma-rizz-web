import { NextRequest } from 'next/server';

import { AuthSignInRequestBody, AuthSignInResponse } from './type';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { comparePassword, dbConnect, getSignedTokens } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, bodyParser, validator } from '@/(server)/util';

/**
 * NOTE: /api/auth/sign-in
 * @body AuthSignInRequest
 * @returns AuthSignInResponse
 */
export const POST = async (request: NextRequest) => {
  try {
    const requestBodyJSON = bodyParser<AuthSignInRequestBody>(await request.json(), [
      'email',
      'password',
    ]);

    validator({ email: requestBodyJSON.email, password: requestBodyJSON.password });

    await dbConnect();

    const user = await UserModel.findOne({ email: requestBodyJSON.email }).exec();

    if (!user) {
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['email'] } });
    }

    const isAuthorized = await comparePassword(requestBodyJSON.password, user.password);

    if (!isAuthorized) {
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['password'] } });
    }

    const tokenDatas = getSignedTokens({ userId: user._id.toHexString() });

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { refreshToken: tokenDatas.refreshToken }
    ).exec();

    return SuccessResponse<AuthSignInResponse>('POST', tokenDatas);
  } catch (error) {
    return ErrorResponse(error);
  }
};
