import { NextRequest } from 'next/server';

import { UserModel } from '@/(server)/entities';
import { ErrorResponse } from '@/(server)/errors';
import { dbConnect } from '@/(server)/libs';
import { Gender } from '@/(server)/unions';
import { SuccessResponse, bodyParser } from '@/(server)/utils';

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
