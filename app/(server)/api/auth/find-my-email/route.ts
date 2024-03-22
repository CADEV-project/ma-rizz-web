import { NextRequest } from 'next/server';

import { AuthFindMyEmailRequestSearchParams, AuthFindMyEmailResponse } from './type';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, searchParamsParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/find-my-email
 * @param AuthFindMyEmailRequestSearchParams
 * @returns AuthFindMyEmailResponse
 */
export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = searchParamsParser<AuthFindMyEmailRequestSearchParams>(
      request.nextUrl.searchParams,
      ['isVerified', 'phoneNumber']
    );

    if (searchParams.isVerified !== 'true')
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['isVerified'] } });

    const user = await UserModel.findOne({ phoneNumber: searchParams.phoneNumber }).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    return SuccessResponse<AuthFindMyEmailResponse>('GET', { email: user.email });
  } catch (error) {
    return ErrorResponse(error);
  }
};
