import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { SuccessResponse } from '@/(server)/util';

/**
 * NOTE: /api/auth/me
 * @requires token
 */
export const GET = async () => {
  try {
    await dbConnect();

    // TODO: Implement logic.
    // Find account by token and return the user data.

    return SuccessResponse('GET');
  } catch (error) {
    return ErrorResponse(error);
  }
};
