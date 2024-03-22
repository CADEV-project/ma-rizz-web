import { NextRequest } from 'next/server';

import { UserModel } from '@/(server)/entities';
import { ErrorResponse } from '@/(server)/errors';
import { dbConnect } from '@/(server)/libs';
import { SuccessResponse, bodyParser } from '@/(server)/utils';

type PatchRequestBody = {
  currentPassword: string;
  newPassword: string;
};

/**
 * NOTE: /api/auth/update/email
 * @param email
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<PatchRequestBody>(await request.json(), [
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
