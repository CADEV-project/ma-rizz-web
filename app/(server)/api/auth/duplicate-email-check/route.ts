import { NextRequest } from 'next/server';

import {
  AuthDuplicateEmailCheckRequestSearchParams,
  AuthDuplicateEmailCheckResponse,
} from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, searchParamsParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/duplicate-email-check
 * @params AuthDuplicateEmailCheckRequestSearchParams
 * @returns AuthDuplicateEmailCheckResponse
 */
export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = searchParamsParser<AuthDuplicateEmailCheckRequestSearchParams>(
      request.nextUrl.searchParams,
      ['email']
    );

    const user = await UserModel.findOne({ email: searchParams.email }).exec();

    return SuccessResponse<AuthDuplicateEmailCheckResponse>('GET', { isDuplicate: !!user });
  } catch (error) {
    return ErrorResponse(error);
  }
};
