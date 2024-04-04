import { NextRequest } from 'next/server';

import { getConnection, getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, getRequestAccessToken } from '@/(server)/util';

import { ErrorResponse, Forbidden } from '@/(error)';

import { COOKIE_KEY } from '@/constant';

/**
 * NOTE: /api/auth/sign-out
 * @required accessToken
 * @return void
 */
export const POST = async (request: NextRequest) => {
  await getConnection();

  try {
    const accessToken = getRequestAccessToken(request);

    const { accountId } = getVerifiedAccessToken(accessToken);

    const account = await AccountModel.findById(getObjectId(accountId)).exec();

    if (!account)
      throw new Forbidden({
        type: 'Forbidden',
        code: 403,
        detail: { field: 'account', reason: 'NOT_EXIST' },
      });

    account.refreshToken = '';

    await account.save();

    const response = SuccessResponse({ method: 'POST' });

    response.cookies.delete(COOKIE_KEY.accessToken);
    response.cookies.delete(COOKIE_KEY.refreshToken);
    response.cookies.delete(COOKIE_KEY.autoSignIn);
    response.cookies.delete(COOKIE_KEY.auth);

    return response;
  } catch (error) {
    return ErrorResponse(error);
  }
};
