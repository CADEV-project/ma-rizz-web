import { NextRequest } from 'next/server';

import { AuthDuplicateAccountCheckRequestSearchParams } from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, searchParamsParser, validate } from '@/(server)/util';

export const GET = async (request: NextRequest) => {
  await dbConnect();

  try {
    const searchParams = searchParamsParser<AuthDuplicateAccountCheckRequestSearchParams>(
      request.nextUrl.searchParams,
      ['type', 'accountId']
    );

    validate({ accountType: searchParams.type });

    const accountWithAccountTypeAndAccountId = await AccountModel.findOne({
      type: searchParams.type,
      accountId: searchParams.accountId,
    }).exec();

    return SuccessResponse('GET', { isDuplicate: !!accountWithAccountTypeAndAccountId });
  } catch (error) {
    return ErrorResponse(error);
  }
};
