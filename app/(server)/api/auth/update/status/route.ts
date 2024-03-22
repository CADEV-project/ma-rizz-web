import { NextRequest } from 'next/server';

import { UserModel } from '@/(server)/entity';
import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { UserStatus } from '@/(server)/union';
import { SuccessResponse, bodyParser } from '@/(server)/util';

type PatchRequestBody = {
  status: UserStatus;
};

/**
 * NOTE: /api/auth/update/email
 * @param email
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<PatchRequestBody>(await request.json(), ['status']);

    // TODO: Implement logic.
    // Check if the current password is correct.
    // Get user information from the token and update the email.
    await UserModel.findOneAndUpdate({}, { status: requestBody.status });

    return SuccessResponse('PATCH');
  } catch (error) {
    return ErrorResponse(error);
  }
};
