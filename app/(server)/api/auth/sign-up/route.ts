import { NextRequest, NextResponse } from 'next/server';

import { User, UserEntity } from '@/(server)/entities';
import { errorResponse } from '@/(server)/errors';
import { dbConnect } from '@/(server)/libs';
import { requestBodyParser } from '@/(server)/utils';

type PostRequestBody = Omit<User, 'id' | 'createdAt'>;

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();

    const requestBody = requestBodyParser<PostRequestBody>(await request.json(), [
      'email',
      'password',
      'name',
      'phoneNumber',
      'age',
      'gender',
      'address',
    ]);

    const userModel = new UserEntity(requestBody);

    await userModel.save();

    return NextResponse.json({}, { status: 201, statusText: 'Success' });
  } catch (error) {
    return errorResponse(error);
  }
};
