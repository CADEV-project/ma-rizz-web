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

export const getAutoSignInCookie = (autoSignIn: boolean): Cookie => {
  const AUTO_SIGN_IN_COOKIE_MAX_AGE = getNumericTime({ type: 'minute', day: 30 });

  return getCookie(COOKIE_KEY.autoSignIn, `${autoSignIn}`, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: AUTO_SIGN_IN_COOKIE_MAX_AGE,
    path: '/',
  });
};

type GetAccessTokenCookieParams = {
  value: string;
  options?: Partial<ResponseCookie>;
  autoSignIn: boolean;
};

/** NOTE: Expires in 1h */
export const getAccessTokenCokie = ({
  value,
  options,
  autoSignIn,
}: GetAccessTokenCookieParams): Cookie => {
  const ACCESS_TOKEN_COOKIE_MAX_AGE = getNumericTime({ type: 'minute', hour: 1 });

  return getCookie(COOKIE_KEY.accessToken, value, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: autoSignIn ? ACCESS_TOKEN_COOKIE_MAX_AGE : undefined,
    path: '/',
    ...options,
  });
};

type GetRefreshTokenCookieParams = {
  value: string;
  options?: Partial<ResponseCookie>;
  autoSignIn: boolean;
};

/** NOTE: Expires in 30d */
export const getRefreshTokenCookie = ({
  value,
  options,
  autoSignIn,
}: GetRefreshTokenCookieParams): Cookie => {
  const REFRESH_TOKEN_COOKIE_MAX_AGE = getNumericTime({ type: 'minute', day: 30 });

  return getCookie(COOKIE_KEY.refreshToken, value, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: autoSignIn ? REFRESH_TOKEN_COOKIE_MAX_AGE : undefined,
    path: '/',
    ...options,
  });
};
