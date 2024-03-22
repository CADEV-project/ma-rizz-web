import { NextRequest } from 'next/server';

import { UserModel } from '@/(server)/entity';
import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { Gender } from '@/(server)/union';
import { SuccessResponse, bodyParser } from '@/(server)/util';

type PatchRequestBody = {
  name: string;
  phoneNumber: string;
  age: string;
  gender: Gender;
  address: string;
};

/**
 * NOTE: /api/auth/update/email
 * @param email
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<PatchRequestBody>(await request.json(), [
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
