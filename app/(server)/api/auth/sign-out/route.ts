import { NextRequest } from 'next/server';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { getConnection, getObjectId, getVerifiedAccessToken } from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, getRequestAccessToken } from '@/(server)/util';

/**
 * NOTE: /api/auth/sign-out
 * @requires token
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

    if (!account)
      throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['account'] } });

    account.refreshToken = '';

    await account.save();

    return SuccessResponse({ method: 'POST' });
  } catch (error) {
    return ErrorResponse(error);
  }
};
