import { useQuery } from '@tanstack/react-query';

import { userMeRequest } from '@/(client)/request';

const queryKeys = {
  default: ['user'] as const,
  me: () => [...queryKeys.default, 'me'],
};

const queryOptions = {
  me: () => ({
    queryKey: queryKeys.me(),
    queryFn: () => userMeRequest(),
  }),
};

export const useUserMe = () => useQuery(queryOptions.me());
