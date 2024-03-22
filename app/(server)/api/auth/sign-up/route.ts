import { NextRequest } from 'next/server';

import { User, UserModel } from '@/(server)/entity';
import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { bodyParser, SuccessResponse } from '@/(server)/util';

type PostRequestBody = Omit<User, 'id' | 'createdAt'>;

/**
 * NOTE: /api/auth/sign-up
 * @param email
 * @param password
 * @param name
 * @param phoneNumber
 * @param age
 * @param gender
 * @param address
 */
export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<PostRequestBody>(await request.json(), [
      'email',
      'password',
      'name',
      'phoneNumber',
      'age',
      'gender',
      'address',
    ]);

    // TODO: Implement logic.
    // Password should be hashed before saving to the database.
    await UserModel.create(requestBody);

    return SuccessResponse('POST');
  } catch (error) {
    return ErrorResponse(error);
  }
};
