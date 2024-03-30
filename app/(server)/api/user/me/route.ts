import { NextRequest } from 'next/server';

import { UserMeResponse } from './type';

import { ErrorResponse, Forbidden } from '@/(server)/error';
import { getConnection, getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, getRequestAccessToken } from '@/(server)/util';

/**
 * NOTE: /api/user/me
 * @requires token
 * @return UserMeResponse
 */
export const GET = async (request: NextRequest) => {
  await getConnection();

  try {
    const accessToken = getRequestAccessToken(request);

    const { accountId, userId } = getVerifiedAccessToken(accessToken);

    const [account, user] = await Promise.all([
      AccountModel.findById(getObjectId(accountId)).lean().exec(),
      UserModel.findById(getObjectId(userId)).lean().exec(),
    ]);

    if (!user) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'user' });

    if (!account) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'account' });

    if (account.status === 'withdrew')
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: 'accountStatus',
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
        postalCode: user.postalCode,
        address: user.address,
        addressDetail: user.addressDetail,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
