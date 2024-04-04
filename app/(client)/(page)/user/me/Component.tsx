'use client';

import { useQuery } from '@tanstack/react-query';

import { healthRequest, userMeRequest } from '@/(client)/request';

import { API_URL } from '@/constant';

export const Component: React.FC = () => {
  const { data } = useQuery({ queryKey: [API_URL.user.me], queryFn: userMeRequest });

  useQuery({ queryKey: [API_URL.health], queryFn: healthRequest });

  return <>{JSON.stringify(data)}</>;
};
