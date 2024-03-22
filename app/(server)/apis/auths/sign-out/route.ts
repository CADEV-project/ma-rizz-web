import { ErrorResponse } from '@/(server)/errors';
import { SuccessResponse } from '@/(server)/utils';

/**
 * NOTE: /api/auth/sign-out
 * @requires token
 */
export const POST = async () => {
  try {
    // TOOD: Implement logic.
    // Get token and remove it from the database.
    return SuccessResponse('POST');
  } catch (error) {
    return ErrorResponse(error);
  }
};
