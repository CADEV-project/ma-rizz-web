import { NextRequest } from 'next/server';

import { AuthUpdateMeRequestBody } from './type';

import { ErrorResponse, Forbidden } from '@/(server)/error';
import { getConnection, getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, getRequestBodyJSON, getRequestAccessToken } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/me
 * @required accessToken
 * @body AuthUpdateMeRequestBody
 * @return void
 */
export const PATCH = async (request: NextRequest) => {
  await getConnection();

  try {
    const accessToken = getRequestAccessToken(request);

    const { accountId, userId } = getVerifiedAccessToken(accessToken);

    const requestBody = await getRequestBodyJSON<AuthUpdateMeRequestBody>(request, [
      'name',
      'phoneNumber',
      'age',
      'gender',
      'postalCode',
      'address',
      'addressDetail',
    ]);

    const account = await AccountModel.findById(getObjectId(accountId)).exec();

    if (!account) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'account' });

    const user = await UserModel.findById(getObjectId(userId)).exec();

    if (!user) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'user' });

    user.name = requestBody.name;
    user.phoneNumber = requestBody.phoneNumber;
    user.age = requestBody.age;
    user.gender = requestBody.gender;
    user.postalCode = requestBody.postalCode;
    user.address = requestBody.address;
    user.addressDetail = requestBody.addressDetail;

    await user.save();

    return SuccessResponse({ method: 'PATCH' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
