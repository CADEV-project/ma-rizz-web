import { AuthMeResponse } from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { SuccessResponse } from '@/(server)/util';

/**
 * NOTE: /api/auth/me
 * @requires token
 * @returns AuthMeResponse
 */
export const GET = async () => {
  try {
    await dbConnect();

    // TODO: Implement logic.
    // Find account by token and return the user data.
    return SuccessResponse<AuthMeResponse>('GET', {
      id: 'id',
      email: 'email',
      name: 'name',
      phoneNumber: 'phoneNumber',
      age: 'age',
      gender: 'male',
      address: 'address',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
