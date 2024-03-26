import { NextRequest } from 'next/server';

import { AuthSignUpWithOAuthRequestBody } from './type';

import { Conflict, ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, bodyParser, validate } from '@/(server)/util';

/**
 * NOTE: /api/auth/sign-up-with-oauth
 * @body AuthSignUpWithOAuthRequest
 */
export const POST = async (request: NextRequest) => {
  try {
    const requestBodyJSON = bodyParser<AuthSignUpWithOAuthRequestBody>(await request.json(), [
      'type',
      'accountId',
    ]);

    validate({
      accountType: requestBodyJSON.type,
    });

    await dbConnect();

    const accountWithAccountTypeAndId = await AccountModel.findOne({
      type: requestBodyJSON.type,
      accountId: requestBodyJSON.accountId,
    }).exec();

    if (accountWithAccountTypeAndId)
      throw new Conflict({ type: 'Conflict', code: 409, detail: { fields: ['account'] } });

    await AccountModel.create({
      type: requestBodyJSON.type,
      accountId: requestBodyJSON.accountId,
      status: 'pending',
    });

    return SuccessResponse('POST');
  } catch (error) {
    return ErrorResponse(error);
  }
};
