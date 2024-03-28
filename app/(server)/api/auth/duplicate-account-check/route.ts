import { NextRequest } from 'next/server';

import {
  AuthDuplicateAccountCheckRequestSearchParams,
  AuthDuplicateAccountCheckResponse,
} from './type';

import { ErrorResponse } from '@/(server)/error';
import { getConnection } from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, getRequestSearchPraramsJSON, validate } from '@/(server)/util';

/**
 * NOTE: /api/auth/duplicate-account-check
 * @params AuthDuplicateAccountCheckRequestSearchParams
 * @return AuthDuplicateAccountCheckResponse
 */
export const GET = async (request: NextRequest) => {
  await getConnection();

  try {
    const searchParams = getRequestSearchPraramsJSON<AuthDuplicateAccountCheckRequestSearchParams>(
      request,
      ['type', 'productAccountId']
    );

    validate({ accountType: searchParams.type });

    const account = await AccountModel.findOne({
      type: searchParams.type,
      productAccountId: searchParams.productAccountId,
    }).exec();

    return SuccessResponse<AuthDuplicateAccountCheckResponse>({
      method: 'GET',
      data: { isDuplicate: !!account },
    });
  } catch (error) {
    return ErrorResponse(error);
  }
};
