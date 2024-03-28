import { NextRequest } from 'next/server';

import { AuthUpdateMeRequestBody } from './type';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { getConnection, getObjectId } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import { SuccessResponse, getAuthorization, getRequestBodyJSON } from '@/(server)/util';

/**
 * NOTE: /api/auth/update/me
 * @requires token
 * @body AuthUpdateMeRequestBody
 */
export const PATCH = async (request: NextRequest) => {
  await getConnection();

  try {
    const { accountId, userId } = getAuthorization(request, 'bearer');

    const requestBody = await getRequestBodyJSON<AuthUpdateMeRequestBody>(request, [
      'name',
      'phoneNumber',
      'age',
      'gender',
      'address',
    ]);

    const account = await AccountModel.findById(getObjectId(accountId)).exec();

    if (!account)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['account'] } });

    const user = await UserModel.findById(getObjectId(userId)).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    user.name = requestBody.name;
    user.phoneNumber = requestBody.phoneNumber;
    user.age = requestBody.age;
    user.gender = requestBody.gender;
    user.address = requestBody.address;

    await user.save();

    return SuccessResponse({ method: 'PATCH' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
