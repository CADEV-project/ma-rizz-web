import { NextRequest } from 'next/server';

import { AuthPasswordResetRequestBody } from './type';

import { ErrorResponse, Unauthorized } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, bodyParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/password-reset
 * @body AuthPasswordResetRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = bodyParser<AuthPasswordResetRequestBody>(await request.json(), [
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
