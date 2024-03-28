import { baseAction } from './baseAction';

import { UserMeResponse } from '@/(server)/api/user/me/type';
import { API_URL } from '@/constant';

export type { UserMeResponse };

export const userMeAction = async () => {
  const response = await baseAction<UserMeResponse>({
    url: API_URL.user.me,
  });

  return response.data;
};
