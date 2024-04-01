'use clinet';

import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import { COOKIE_KEY } from '@/constant';

export const useAuth = () => {
  const [hasAuth, setHasAuth] = useState<boolean>();

  useEffect(() => {
    const auth = getCookie(COOKIE_KEY.auth);

    setHasAuth(!!auth && auth === 'live');
  }, []);

  return { hasAuth };
};
