import { NextRequest } from 'next/server';

import { AuthMeResponse } from './type';

import { ErrorResponse, Forbidden, NotFound } from '@/(server)/error';
import { dbConnect, getDecodedToken, getObjectId } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, tokenParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/me
 * @requires token
 * @returns AuthMeResponse
 */
export const GET = async (request: NextRequest) => {
  try {
    const token = tokenParser(request.headers.get('Authorization'));

    const { userId } = getDecodedToken(token);

    await dbConnect();

    const user = await UserModel.findById(getObjectId(userId)).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    if (user.status === 'withdrew')
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { reason: 'user status is withdrew.' },
      });

    // TODO: Implement logic.
    // Find account by token and return the user data.
    return SuccessResponse<AuthMeResponse>('GET', {
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      age: user.age,
      gender: user.gender,
      address: user.address,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
