import { useQuery } from '@tanstack/react-query';

import { userMeRequest } from '@/(client)/request';

const userQueryKeys = {
  default: ['user'] as const,
  me: (hasAuth: boolean) => [...userQueryKeys.default, 'me', { hasAuth: !!hasAuth }],
};

const userQueryOptions = {
  me: (hasAuth: boolean) => ({
    queryKey: userQueryKeys.me(hasAuth),
    queryFn: () => userMeRequest(),
    enabled: hasAuth,
  }),
};

export const useUserMe = (hasAuth: boolean) => useQuery({ ...userQueryOptions.me(hasAuth) });
