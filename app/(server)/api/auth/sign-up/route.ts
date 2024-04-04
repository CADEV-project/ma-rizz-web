import { NextRequest } from 'next/server';

import { AuthSignUpRequestBody } from './type';

import { getConnection, getHashedPassword } from '@/(server)/lib';
import { AccountModel, UserModel, VerificationModel } from '@/(server)/model';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '@/(server)/union';
import { getRequestBodyJSON, SuccessResponse, validate } from '@/(server)/util';

import { Conflict, ErrorResponse, Forbidden, ValidationFailed } from '@/(error)';

import { MILLISECOND_TIME_FORMAT } from '@/constant';

/**
 * NOTE: /api/auth/sign-up
 * @body AuthSignUpRequestBody
 * @return void
 */
export const POST = async (request: NextRequest) => {
  const db = await getConnection();

  const session = await db.startSession();

  try {
    const requestBodyJSON = await getRequestBodyJSON<AuthSignUpRequestBody>(request, [
      { key: 'email', required: true },
      { key: 'password', required: true },
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
      password: requestBodyJSON.password,
      phoneNumber: requestBodyJSON.phoneNumber,
      age: requestBodyJSON.age,
      gender: requestBodyJSON.gender,
    });

    const [users, verification] = await Promise.all([
      UserModel.find({
        $or: [{ email: requestBodyJSON.email }, { phoneNumber: requestBodyJSON.phoneNumber }],
      })
        .lean()
        .exec(),
      VerificationModel.findOne({ phoneNumber: requestBodyJSON.phoneNumber }).exec(),
    ]);

    if (users.length)
      throw new Conflict({
        type: 'Conflict',
        code: 409,
        detail: ['email', 'phoneNumber'],
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

    const limitTime =
      new Date(verification.updatedAt).getTime() + MILLISECOND_TIME_FORMAT.minutes(5);
    const currentTime = Date.now();

    if (limitTime < currentTime)
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'verification', reason: 'TIMEOUT' },
      });

    const hashedPassword = await getHashedPassword(requestBodyJSON.password);

    await session.withTransaction(async () => {
      const [newUser] = await UserModel.create(
        [
          {
            ...requestBodyJSON,
            password: hashedPassword,
          },
        ],
        { session }
      );

      await AccountModel.create(
        [
          {
            type: ACCOUNT_TYPE.credentials,
            status: ACCOUNT_STATUS.active,
            user: newUser._id,
          },
        ],
        { session }
      );

      await verification.deleteOne({ session });
    });

    return SuccessResponse({ method: 'POST' });
  } catch (error) {
    return ErrorResponse(error);
  } finally {
    await session.endSession();
  }
};
