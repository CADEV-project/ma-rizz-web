import { NextRequest } from 'next/server';

import { UserModel } from '@/(server)/entity';
import { ErrorResponse, NotFound } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { SuccessResponse } from '@/(server)/util';

type GetResponse = {
  isDuplicate: boolean;
};

/**
 * NOTE: /api/auth/duplicate-email-check
 * @params email: string
 */
export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    const email = searchParams.get('email');

    if (!email) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['email'] } });

    const user = await UserModel.findOne({ email });

    return SuccessResponse<GetResponse>('GET', { isDuplicate: !!user });
  } catch (error) {
    return ErrorResponse(error);
  }
};
