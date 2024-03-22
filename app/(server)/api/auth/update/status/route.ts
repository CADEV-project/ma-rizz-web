import { NextRequest } from 'next/server';

import { AuthUpdateStatusRequestBody } from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, bodyParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/status
 * @requires token
 * @body AuthUpdateStatusRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<AuthUpdateStatusRequestBody>(await request.json(), ['status']);

    // TODO: Implement logic.
    // Check if the current password is correct.
    // Get user information from the token and update the email.
    await UserModel.findOneAndUpdate({}, { status: requestBody.status });

    return SuccessResponse('PATCH');
  } catch (error) {
    return ErrorResponse(error);
  }
};
