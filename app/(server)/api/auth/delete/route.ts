import { NextRequest } from 'next/server';

import { AuthDeleteRequestSearchParams } from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { SuccessResponse, searchParamsParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/delete
 * @requires token
 * @params AuthDeleteRequestSearchParams
 */
export const DELETE = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = searchParamsParser<AuthDeleteRequestSearchParams>(
      request.nextUrl.searchParams,
      ['password']
    );

    console.info(searchParams);

    // TODO: Implement logic.
    // Find account by token and check the password is correct.

    return SuccessResponse('DELETE');
  } catch (error) {
    return ErrorResponse(error);
  }
};
