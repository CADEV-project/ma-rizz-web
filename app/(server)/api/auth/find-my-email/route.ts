import { NextRequest } from 'next/server';

import { AuthFindMyEmailRequestSearchParams, AuthFindMyEmailResponse } from './type';

import { ErrorResponse, Forbidden } from '@/(server)/error';
import { getConnection } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, getRequestSearchPraramsJSON } from '@/(server)/util';

/**
 * NOTE: /api/auth/find-my-email
 * @params AuthFindMyEmailRequestSearchParams
 * @return AuthFindMyEmailResponse
 */
export const GET = async (request: NextRequest) => {
  try {
    await getConnection();

    const searchParams = getRequestSearchPraramsJSON<AuthFindMyEmailRequestSearchParams>(request, [
      'isVerified',
      'phoneNumber',
    ]);

    if (searchParams.isVerified !== 'true')
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: 'isVerified',
      });

    const user = await UserModel.findOne({ phoneNumber: searchParams.phoneNumber }).exec();

    if (!user) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'user' });

    return SuccessResponse<AuthFindMyEmailResponse>({ method: 'GET', data: { email: user.email } });
  } catch (error) {
    return ErrorResponse(error);
  }
};
