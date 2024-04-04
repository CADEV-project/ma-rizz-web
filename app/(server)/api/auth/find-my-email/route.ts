import { NextRequest } from 'next/server';

import { AuthFindMyEmailRequestSearchParams, AuthFindMyEmailResponse } from './type';

import { getConnection } from '@/(server)/lib';
import { UserModel, VerificationModel } from '@/(server)/model';
import { SuccessResponse, getRequestSearchPraramsJSON } from '@/(server)/util';

import { ErrorResponse, Forbidden, ValidationFailed } from '@/(error)';

import { MILLISECOND_TIME_FORMAT } from '@/constant';

/**
 * NOTE: /api/auth/find-my-email
 * @searchParams AuthFindMyEmailRequestSearchParams
 * @return AuthFindMyEmailResponse
 */
export const GET = async (request: NextRequest) => {
  try {
    await getConnection();

    const searchParams = getRequestSearchPraramsJSON<AuthFindMyEmailRequestSearchParams>(request, [
      { key: 'verificationCode', required: true },
      { key: 'phoneNumber', required: true },
    ]);

    const [user, verification] = await Promise.all([
      UserModel.findOne({ phoneNumber: searchParams.phoneNumber }).lean().exec(),
      VerificationModel.findOne({ phoneNumber: searchParams.phoneNumber }).exec(),
    ]);

    if (!verification)
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'verification', reason: 'NOT_EXIST' },
      });

    if (verification.verificationCode !== searchParams.verificationCode)
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

    if (!user)
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'user', reason: 'NOT_EXIST' },
      });

    verification.verificationCode = '';

    await verification.save();

    return SuccessResponse<AuthFindMyEmailResponse>({ method: 'GET', data: { email: user.email } });
  } catch (error) {
    return ErrorResponse(error);
  }
};
