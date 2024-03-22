import { NextRequest } from 'next/server';

import { AuthSignUpRequestBody } from './type';

import { Conflict, ErrorResponse } from '@/(server)/error';
import { dbConnect, getHashedPassword } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { bodyParser, SuccessResponse, validator } from '@/(server)/util';

/**
 * NOTE: /api/auth/sign-up
 * @body AuthSignUpRequest
 */
export const POST = async (request: NextRequest) => {
  try {
    const requestBodyJSON = bodyParser<AuthSignUpRequestBody>(await request.json(), [
      'email',
      'password',
      'name',
      'phoneNumber',
      'age',
      'gender',
      'address',
    ]);

    validator({
      email: requestBodyJSON.email,
      password: requestBodyJSON.password,
      phoneNumber: requestBodyJSON.phoneNumber,
      age: requestBodyJSON.age,
      gender: requestBodyJSON.gender,
    });

    await dbConnect();

    const userWithEmail = await UserModel.findOne({ email: requestBodyJSON.email }).exec();

    if (userWithEmail)
      throw new Conflict({ type: 'Conflict', code: 409, detail: { fields: ['email'] } });

    const userWithPhoneNumber = await UserModel.findOne({
      phoneNumber: requestBodyJSON.phoneNumber,
    }).exec();

    if (userWithPhoneNumber)
      throw new Conflict({ type: 'Conflict', code: 409, detail: { fields: ['phoneNumber'] } });

    const hashedPassword = await getHashedPassword(requestBodyJSON.password);

    await UserModel.create({
      ...requestBodyJSON,
      password: hashedPassword,
    });

    return SuccessResponse('POST');
  } catch (error) {
    return ErrorResponse(error);
  }
};
