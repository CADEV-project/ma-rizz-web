import { NextRequest } from 'next/server';

import { AuthPasswordResetRequestBody } from './type';

import { getConnection, getHashedPassword } from '@/(server)/lib';
import { UserModel, VerificationModel } from '@/(server)/model';
import { SuccessResponse, getRequestBodyJSON } from '@/(server)/util';

import { ErrorResponse, Forbidden, ValidationFailed } from '@/(error)';

import { MILLISECOND_TIME_FORMAT } from '@/constant';

/**
 * NOTE: /api/auth/password-reset
 * @body AuthPasswordResetRequestBody
 * @return void
 */
export const PATCH = async (request: NextRequest) => {
  const connection = await getConnection();

  const session = await connection.startSession();

  try {
    const requestBodyJSON = await getRequestBodyJSON<AuthPasswordResetRequestBody>(request, [
      { key: 'email', required: true },
      { key: 'newPassword', required: true },
      { key: 'verificationCode', required: true },
    ]);

    const user = await UserModel.findOne({ email: requestBodyJSON.email }).exec();

    if (!user)
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'user', reason: 'NOT_EXIST' },
      });

    const verification = await VerificationModel.findOne({
      phoneNumber: user.phoneNumber,
    }).exec();

    if (!verification)
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'verification', reason: 'NOT_EXIST' },
      });

    if (verification.verificationCode !== requestBodyJSON.verificationCode)
      throw new ValidationFailed({
        type: 'ValidationFailed',
        code: 422,
        detail: [{ field: 'verificationCode', reason: 'NOT_MATCHED' }],
      });

    if (
      verification.updatedAt.getTime() + MILLISECOND_TIME_FORMAT.minutes(5) <
      new Date().getTime()
    )
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'verification', reason: 'TIMEOUT' },
      });

    const hashedPassword = await getHashedPassword(requestBodyJSON.newPassword);

    await session.withTransaction(async () => {
      user.password = hashedPassword;

      await user.save();

      verification.verificationCode = '';

      await verification.save();
    });

    return SuccessResponse({ method: 'PATCH' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
