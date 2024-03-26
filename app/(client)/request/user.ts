import { baseAPIRequest } from '.';

import { UserMeResponse } from '@/(server)/api/user/me/type';
import { API_URL } from '@/constant';

export const authMeRequest = async () => {
  const response = await baseAPIRequest<UserMeResponse>({
    method: 'get',
    url: API_URL.user.me,
    // tokenType: 'required',
  });

  return response.data;
};
