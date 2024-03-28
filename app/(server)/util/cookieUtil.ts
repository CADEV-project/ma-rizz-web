import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { getNumericTime } from '@/(server)/util';

import { COOKIE_KEY } from '@/constant';

export type Cookie = {
  key: string;
  value: string;
  options?: Partial<ResponseCookie>;
};

export const getCookie = (
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
): Cookie => {
  return {
    key,
    value,
    options,
  };
};

/** NOTE: Expires in 1h */
export const getAccessTokenCokie = (value: string, options?: Partial<ResponseCookie>): Cookie => {
  const ACCESS_TOKEN_COOKIE_MAX_AGE = getNumericTime({ type: 'minute', hour: 1 });

  return getCookie(COOKIE_KEY.accessToken, value, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
    path: '/',
    ...options,
  });
};

/** NOTE: Expires in 30d */
export const getRefreshTokenCookie = (value: string, options?: Partial<ResponseCookie>): Cookie => {
  const REFRESH_TOKEN_COOKIE_MAX_AGE = getNumericTime({ type: 'minute', day: 30 });

  return getCookie(COOKIE_KEY.refreshToken, value, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
    path: '/',
    ...options,
  });
};
