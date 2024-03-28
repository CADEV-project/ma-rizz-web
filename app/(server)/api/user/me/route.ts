import { NextRequest } from 'next/server';

import { UserMeResponse } from './type';

import { ErrorResponse, Forbidden, NotFound } from '@/(server)/error';
import { getConnection, getObjectId } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, getAuthorization } from '@/(server)/util';

/**
 * NOTE: /api/user/me
 * @requires token
 * @returns UserMeResponse
 */
export const GET = async (request: NextRequest) => {
  await getConnection();

  try {
    const { accountId, userId } = getAuthorization(request, 'bearer');

    const user = await UserModel.findById(getObjectId(userId)).exec();
    const account = await AccountModel.findById(getObjectId(accountId)).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    if (!account)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['account'] } });

    if (account.status === 'withdrew')
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { reason: 'user status is withdrew.' },
      });

    return SuccessResponse<UserMeResponse>({
      method: 'GET',
      data: {
        email: user.email,
        type: account.type,
        name: user.name,
        phoneNumber: user.phoneNumber,
        age: user.age,
        gender: user.gender,
        address: user.address,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
