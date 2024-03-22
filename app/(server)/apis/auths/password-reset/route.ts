import { NextRequest } from 'next/server';

import { UserModel } from '@/(server)/entities';
import { ErrorResponse, Unauthorized } from '@/(server)/errors';
import { dbConnect } from '@/(server)/libs';
import { SuccessResponse, bodyParser } from '@/(server)/utils';

type PatchRequestBody = {
  email: string;
  newPassword: string;
  isVerified: boolean;
};

/**
 * NOTE: /api/auth/password-reset
 * @body PatchRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<PatchRequestBody>(await request.json(), [
      'email',
      'newPassword',
      'isVerified',
    ]);

    if (!requestBody.isVerified)
      throw new Unauthorized({ type: 'Unauthorized', code: 401, detail: { reason: 'NotVerfied' } });

    // TODO: Implmemt logic.
    // Password should be hashed before saving to the database.
    await UserModel.findOneAndUpdate(
      { email: requestBody.email },
      { password: requestBody.newPassword }
    );

    return SuccessResponse('PATCH');
  } catch (error) {
    return ErrorResponse(error);
  }
};
