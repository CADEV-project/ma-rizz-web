import { NextRequest } from 'next/server';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { SuccessResponse } from '@/(server)/util';

/**
 * NOTE: /api/auth/delete
 * @requires token
 * @params password: string
 */
export const DELETE = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    const password = searchParams.get('password');

    if (!password)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['password'] } });

    // TODO: Implement logic.
    // Find account by token and check the password is correct.

    return SuccessResponse('DELETE');
  } catch (error) {
    return ErrorResponse(error);
  }
};
