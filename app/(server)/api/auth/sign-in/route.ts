import { NextRequest } from 'next/server';

import { AuthSignInRequestBody, AuthSignInResponse } from './type';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { comparePassword, dbConnect } from '@/(server)/lib';
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

    return SuccessResponse<AuthSignInResponse>('POST', {
      id: user._id.toHexString(),
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      age: user.age,
      gender: user.gender,
      address: user.address,
      status: user.status,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
