import { NextRequest } from 'next/server';

import { UserModel } from '@/(server)/entity';
import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { SuccessResponse, bodyParser } from '@/(server)/util';

type PatchRequestBody = {
  email: string;
};

/**
 * NOTE: /api/auth/update/email
 * @param email
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<PatchRequestBody>(await request.json(), ['email']);

    // TODO: Implement logic.
    // Get user information from the token and update the email.
    await UserModel.findOneAndUpdate({}, { email: requestBody.email });

    return SuccessResponse('PATCH');
  } catch (error) {
    return ErrorResponse(error);
  }
};
