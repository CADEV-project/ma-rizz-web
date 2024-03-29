import { NextRequest } from 'next/server';

import { AuthSSORegisterRequestBody } from './type';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { getConnection, getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { AccountModel, UserModel } from '@/(server)/model';
import {
  SuccessResponse,
  getRequestBodyJSON,
  validate,
  getRequestAccessToken,
} from '@/(server)/util';

/**
 * NOTE: /api/auth/sso/register
 * @body AuthSSORegisterRequestBody
 * @return void
 */
export const POST = async (request: NextRequest) => {
  const connection = await getConnection();

  const session = await connection.startSession();

  try {
    const accessToken = getRequestAccessToken(request);

    const { accountId } = getVerifiedAccessToken(accessToken);

    const requestBodyJSON = await getRequestBodyJSON<AuthSSORegisterRequestBody>(request, [
      'email',
      'name',
      'phoneNumber',
      'age',
      'gender',
      'address',
    ]);

    validate({
      email: requestBodyJSON.email,
      phoneNumber: requestBodyJSON.phoneNumber,
      age: requestBodyJSON.age,
      gender: requestBodyJSON.gender,
    });

    const account = await AccountModel.findById(getObjectId(accountId)).exec();

    if (!account) throw new NotFound({ type: 'NotFound', code: 404, detail: 'account' });

    await session.withTransaction(async () => {
      const [user] = await UserModel.create(
        [
          {
            ...requestBodyJSON,
          },
        ],
        { session }
      );

      account.userId = user._id;

      await account.save({ session });
    });

    return SuccessResponse({ method: 'POST' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
