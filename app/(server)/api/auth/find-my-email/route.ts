import { NextRequest } from 'next/server';

import { AuthFindMyEmailRequestSearchParams, AuthFindMyEmailResponse } from './type';

import { Conflict, ErrorResponse, NotFound } from '@/(server)/error';
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

    if (searchParams.isVerified !== 'true') throw new Conflict({ type: 'Conflict', code: 409 });

    const user = await UserModel.findOne({ phoneNumber: searchParams.phoneNumber }).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    return SuccessResponse<AuthFindMyEmailResponse>({ method: 'GET', data: { email: user.email } });
  } catch (error) {
    return ErrorResponse(error);
  }
};
