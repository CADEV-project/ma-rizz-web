import { NextRequest } from 'next/server';

import { AuthSSOSignUpRequestBody } from './type';

import { Conflict, ErrorResponse } from '@/(server)/error';
import { getConnection } from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, getRequestBodyJSON, validate } from '@/(server)/util';

/**
 * NOTE: /api/auth/sso/sign-up
 * @body AuthSSOSignUpRequestBody
 * @return void
 */
export const POST = async (request: NextRequest) => {
  await getConnection();

  try {
    const requestBodyJSON = await getRequestBodyJSON<AuthSSOSignUpRequestBody>(request, [
      'type',
      'productAccountId',
    ]);

    validate({
      accountType: requestBodyJSON.type,
    });

    const accountWithAccountTypeAndProductAccountId = await AccountModel.findOne({
      type: requestBodyJSON.type,
      accountId: requestBodyJSON.productAccountId,
    })
      .lean()
      .exec();

    if (accountWithAccountTypeAndProductAccountId)
      throw new Conflict({
        type: 'Conflict',
        code: 409,
        detail: 'account',
      });

    await AccountModel.create({
      type: requestBodyJSON.type,
      accountId: requestBodyJSON.productAccountId,
      status: 'pending',
    });

    return SuccessResponse({ method: 'POST' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
