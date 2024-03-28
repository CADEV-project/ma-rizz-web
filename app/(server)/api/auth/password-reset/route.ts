import { NextRequest } from 'next/server';

import { AuthPasswordResetRequestBody } from './type';

import { Conflict, ErrorResponse, NotFound } from '@/(server)/error';
import { getConnection, getHashedPassword } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, getRequestBodyJSON } from '@/(server)/util';

/**
 * NOTE: /api/auth/password-reset
 * @body AuthPasswordResetRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  await getConnection();

  try {
    const requestBodyJSON = await getRequestBodyJSON<AuthPasswordResetRequestBody>(request, [
      'email',
      'newPassword',
      'isVerified',
    ]);

    if (!requestBodyJSON.isVerified) throw new Conflict({ type: 'Conflict', code: 409 });

    const user = await UserModel.findOne({ email: requestBodyJSON.email }).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    const hashedPassword = await getHashedPassword(requestBodyJSON.newPassword);

    user.password = hashedPassword;

    await user.save();

    return SuccessResponse({ method: 'PATCH' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
