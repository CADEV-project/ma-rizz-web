import { NextRequest } from 'next/server';

import { ErrorResponse, Forbidden } from '@/(server)/error';
import { getConnection, getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, getRequestAccessToken } from '@/(server)/util';

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

    const { accountId, userId } = getVerifiedAccessToken(accessToken);

    const account = await AccountModel.findOne({
      _id: getObjectId(accountId),
      userId: getObjectId(userId),
    }).exec();

    if (!account) throw new Forbidden({ type: 'Forbidden', code: 403, detail: 'account' });

    account.refreshToken = '';

    await account.save();

    const response = SuccessResponse({ method: 'POST' });

    response.cookies.delete(COOKIE_KEY.accessToken);
    response.cookies.delete(COOKIE_KEY.refreshToken);
    response.cookies.delete(COOKIE_KEY.autoSignIn);

    return response;
  } catch (error) {
    return ErrorResponse(error);
  }
};
