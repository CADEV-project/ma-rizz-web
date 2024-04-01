import { useQuery } from '@tanstack/react-query';

import { userMeRequest } from '@/(client)/request';

const userQueryKeys = {
  default: ['user'] as const,
  me: () => [...userQueryKeys.default, 'me'],
};

const userQueryOptions = {
  me: () => ({
    queryKey: userQueryKeys.me(),
    queryFn: () => userMeRequest(),
  }),
};

export const useUserMe = () => useQuery(userQueryOptions.me());
