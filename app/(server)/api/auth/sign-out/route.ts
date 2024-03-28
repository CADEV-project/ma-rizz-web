import { NextRequest } from 'next/server';

import { ErrorResponse, NotFound } from '@/(server)/error';
import { getConnection, getObjectId } from '@/(server)/lib';
import { AccountModel } from '@/(server)/model';
import { SuccessResponse, getAuthorization } from '@/(server)/util';

/**
 * NOTE: /api/auth/sign-out
 * @requires token
 */
export const POST = async (request: NextRequest) => {
  await getConnection();

  try {
    const { accountId, userId } = getAuthorization(request, 'bearer');

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
