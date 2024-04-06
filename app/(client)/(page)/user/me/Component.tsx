'use client';

import { useAuth } from '@/(client)/hook';
import { useUserMe } from '@/(client)/service';

export const Component: React.FC = () => {
  const { hasAuth } = useAuth();
  const { data } = useUserMe(hasAuth);

  return <>{JSON.stringify(data)}</>;
};
