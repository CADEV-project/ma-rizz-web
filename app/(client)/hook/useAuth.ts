'use clinet';

import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import { COOKIE_KEY } from '@/constant';

export const useAuth = () => {
  const [hasAuth, setHasAuth] = useState<boolean>(false);

  useEffect(() => {
    const authCookie = getCookie(COOKIE_KEY.auth);
    const hasAuth = !!authCookie && authCookie === 'live';

    setHasAuth(prev => {
      if (prev === hasAuth) return prev;

      return hasAuth;
    });
  }, []);

  return { hasAuth };
};
