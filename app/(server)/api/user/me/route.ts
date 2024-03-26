import { UserMeResponse } from './type';

import { ErrorResponse } from '@/(server)/error';
import { dbConnect } from '@/(server)/lib';
import { SuccessResponse } from '@/(server)/util';

/**
 * NOTE: /api/user/me
 * @requires token
 * @returns UserMeResponse
 */
export const GET = async () => {
  await dbConnect();

  try {
    // const token = await getToken({ req: request }); // tokenParser(request.headers.get('Authorization'));

    // if (!token || !token.accessToken)
    //   throw new Forbidden({
    //     type: 'Forbidden',
    //     code: 403,
    //     detail: { reason: 'token is required.' },
    //   });

    // const { userId } = getDecodedToken(token.accessToken);

    // const user = await UserModel.findById(getObjectId(userId)).exec();

    // if (!user) throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['user'] } });

    // // if (user.status === 'withdrew')
    // //   throw new Forbidden({
    // //     type: 'Forbidden',
    // //     code: 403,
    // //     detail: { reason: 'user status is withdrew.' },
    // //   });

    // // TODO: Implement logic.
    // // Find account by token and return the user data.
    // return SuccessResponse<AuthMeResponse>('GET', {
    //   email: user.email,
    //   name: user.name,
    //   phoneNumber: user.phoneNumber,
    //   age: user.age,
    //   gender: user.gender,
    //   address: user.address,
    //   image: user.image,
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // });
    return SuccessResponse<UserMeResponse>('GET');
  } catch (error) {
    return ErrorResponse(error);
  }
};
