import { NextRequest } from 'next/server';

import { AuthUpdateMeRequestBody } from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, bodyParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/me
 * @requires token
 * @body AuthUpdateMeRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<AuthUpdateMeRequestBody>(await request.json(), [
      'name',
      'phoneNumber',
      'age',
      'gender',
      'address',
    ]);

    // TODO: Implement logic.
    // Get user information from the token and update the email.
    await UserModel.findOneAndUpdate(
      {},
      {
        name: requestBody.name,
        phoneNumber: requestBody.phoneNumber,
        age: requestBody.age,
        gender: requestBody.gender,
        address: requestBody.address,
      }
    );

    return SuccessResponse('PATCH');
  } catch (error) {
    return ErrorResponse(error);
  }
};
