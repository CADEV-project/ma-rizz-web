'use client';

import { useAuth } from '@/(client)/hooks';
import { useUserMe } from '@/(client)/services';

export const Component: React.FC = () => {
  const { hasAuth } = useAuth();
  const { data } = useUserMe(hasAuth);

  return <>{JSON.stringify(data)}</>;
};
