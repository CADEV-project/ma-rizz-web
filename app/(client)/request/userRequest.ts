import { baseRequest } from '.';

import { UserMeResponse } from '@/(server)/api/user/me/type';
import { API_URL } from '@/constant';

export type { UserMeResponse };

export const userMeRequest = async () => {
  const response = await baseRequest<UserMeResponse>({
    method: 'get',
    url: API_URL.user.me,
  });

  return response.data;
};
