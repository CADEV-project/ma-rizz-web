import { NextRequest } from 'next/server';

import { ErrorResponse, NotFound } from '@/(server)/errors';
import { dbConnect } from '@/(server)/libs';
import { SuccessResponse } from '@/(server)/utils';

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
