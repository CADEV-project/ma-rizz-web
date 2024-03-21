import { ErrorResponse } from '@/(server)/errors';
import { dbConnect } from '@/(server)/libs';
import { SuccessResponse } from '@/(server)/utils';

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
