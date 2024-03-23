import { NextRequest } from 'next/server';

import { AuthDeleteRequestSearchParams } from './type';

import { Conflict, ErrorResponse, NotFound, Unauthorized } from '@/(server)/error';
import { comparePassword, dbConnect, getDecodedToken, getObjectId } from '@/(server)/lib';
import { UserModel } from '@/(server)/model';
import { SuccessResponse, searchParamsParser, tokenParser } from '@/(server)/util';

/**
 * NOTE: /api/auth/delete
 * @requires token
 * @params AuthDeleteRequestSearchParams
 */
export const DELETE = async (request: NextRequest) => {
  try {
    const token = tokenParser(request.headers.get('Authorization'));

    const decodedToken = getDecodedToken(token);

    const searchParams = searchParamsParser<AuthDeleteRequestSearchParams>(
      request.nextUrl.searchParams,
      ['password']
    );

    await dbConnect();

    const user = await UserModel.findById(getObjectId(decodedToken.userId)).exec();

    if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    if (user.status === 'withdrew') throw new Conflict({ type: 'Conflict', code: 409 });

    const isAuthorized = comparePassword(searchParams.password, user.password);

    if (!isAuthorized) throw new Unauthorized({ type: 'Unauthorized', code: 401 });

    await UserModel.findOneAndUpdate({ _id: user._id }, { status: 'withdrew' });

    return SuccessResponse('DELETE');
  } catch (error) {
    return ErrorResponse(error);
  }
};
