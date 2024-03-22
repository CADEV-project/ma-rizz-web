import { NextRequest } from 'next/server';

import { AuthUpdateEmailRequestBody } from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, bodyParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/email
 * @requires token
 * @body AuthUpdateEmailRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<AuthUpdateEmailRequestBody>(await request.json(), ['email']);

    // TODO: Implement logic.
    // Get user information from the token and update the email.
    await UserModel.findOneAndUpdate({}, { email: requestBody.email });

    return SuccessResponse('PATCH');
  } catch (error) {
    return ErrorResponse(error);
  }
};
