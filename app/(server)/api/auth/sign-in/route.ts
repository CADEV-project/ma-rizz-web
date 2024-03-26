import { NextRequest } from 'next/server';

import { AuthSignInRequestBody, AuthSignInResponse } from './type';

import { ErrorResponse, Forbidden, NotFound } from '@/(server)/error';
import { comparePassword, dbConnect, getSignedTokens } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, bodyParser, validate } from '@/(server)/util';

/**
 * NOTE: /api/auth/sign-in
 * @body AuthSignInRequestBody
 * @returns AuthSignInResponse
 */
export const POST = async (request: NextRequest) => {
  await dbConnect();

  try {
    const requestBodyJSON = bodyParser<AuthSignInRequestBody>(await request.json(), [
      'email',
      'password',
    ]);

    validate({ email: requestBodyJSON.email, password: requestBodyJSON.password });

    const user = await UserModel.findOne({ email: requestBodyJSON.email }).exec();

    if (!user) {
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['email'] } });
    }

    const isAuthorized = await comparePassword(requestBodyJSON.password, user.password);

    if (!isAuthorized) {
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['password'] } });
    }

    const account = await AccountModel.findOne({ userId: user._id }).exec();

    if (!account) {
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['account'] } });
    }

    const isActive = account.status === 'active';

    if (!isActive) {
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { reason: account.status },
      });
    }

    const tokenDatas = getSignedTokens({ userId: user._id.toHexString() });

    await AccountModel.findOneAndUpdate(
      { _id: user._id },
      { refreshToken: tokenDatas.refreshToken }
    ).exec();

    return SuccessResponse<AuthSignInResponse>('POST', tokenDatas);
  } catch (error) {
    return ErrorResponse(error);
  }
};
