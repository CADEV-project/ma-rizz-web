import { NextRequest } from 'next/server';

import { AuthUpdatePasswordRequestBody } from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, bodyParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/password
 * @requires token
 * @body AuthUpdatePasswordRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<AuthUpdatePasswordRequestBody>(await request.json(), [
      'currentPassword',
      'newPassword',
    ]);

    // TODO: Implement logic.
    // Check if the current password is correct.
    // Get user information from the token and update the email.
    await UserModel.findOneAndUpdate({}, { password: requestBody.newPassword });

    return SuccessResponse('PATCH');
  } catch (error) {
    return ErrorResponse(error);
  }
};
