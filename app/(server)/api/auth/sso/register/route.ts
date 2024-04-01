import { NextRequest } from 'next/server';

import { AuthSSORegisterRequestBody } from './type';

import { ErrorResponse, Forbidden, ValidationFailed } from '@/(server)/error';
import { getConnection, getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { AccountModel, UserModel, VerificationModel } from '@/(server)/model';
import {
  SuccessResponse,
  getRequestBodyJSON,
  validate,
  getRequestAccessToken,
} from '@/(server)/util';

import { MILLISECOND_TIME_FORMAT } from '@/constant';

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
      { key: 'email', required: true },
      { key: 'name', required: true },
      { key: 'image' },
      { key: 'phoneNumber', required: true },
      { key: 'age', required: true },
      { key: 'gender', required: true },
      { key: 'postalCode', required: true },
      { key: 'address', required: true },
      { key: 'addressDetail' },
      { key: 'verificationCode', required: true },
    ]);

    validate({
      email: requestBodyJSON.email,
      phoneNumber: requestBodyJSON.phoneNumber,
      age: requestBodyJSON.age,
      gender: requestBodyJSON.gender,
    });

    const [account, verification] = await Promise.all([
      AccountModel.findById(getObjectId(accountId)).exec(),
      VerificationModel.findOne({ phoneNumber: requestBodyJSON.phoneNumber }).exec(),
    ]);

    if (!account)
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'account', reason: 'NOT_EXIST' },
      });

    if (!verification)
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'verification', reason: 'NOT_EXIST' },
      });

    if (verification.verificationCode !== requestBodyJSON.verificationCode)
      throw new ValidationFailed({
        type: 'ValidationFailed',
        code: 422,
        detail: [{ field: 'verificationCode', reason: 'NOT_MATCHED' }],
      });

    if (
      verification.updatedAt.getTime() + MILLISECOND_TIME_FORMAT.minutes(5) <
      new Date().getTime()
    )
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'verification', reason: 'TIMEOUT' },
      });

    await session.withTransaction(async () => {
      const [user] = await UserModel.create(
        [
          {
            ...requestBodyJSON,
          },
        ],
        { session }
      );

      account.user = user._id;

      await account.save({ session });

      verification.verificationCode = '';

      await verification.save({ session });
    });

    return SuccessResponse({ method: 'POST' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
