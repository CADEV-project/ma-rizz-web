import { baseRequest } from '.';

import { API_URL } from '@/constant';

export const healthRequest = async () => {
  const response = await baseRequest<void>({ method: 'get', url: API_URL.health });

  return response.data;
};
