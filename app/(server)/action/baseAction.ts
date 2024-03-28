import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';

import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { COOKIE_KEY } from '@/constant';
import { SERVER_SETTINGS } from '@/setting';

const CONTENT_TYPE_KEY = 'Content-Type' as const;
const CONTENT_TYPE = ['json', 'form', 'multipart'] as const;

const COOKIE_TYPE_KEY = 'Cookie' as const;

type ContentType = (typeof CONTENT_TYPE)[number];

type ServerActionProps = Pick<
  AxiosRequestConfig,
  | 'baseURL'
  | 'method'
  | 'headers'
  | 'url'
  | 'params'
  | 'data'
  | 'responseType'
  | 'onDownloadProgress'
  | 'onUploadProgress'
> & { contentType?: ContentType };

/** NOTE: Used in RSC. */
export async function baseAction<TData>({
  baseURL,
  url,
  headers,
  contentType,
  ...restProps
}: ServerActionProps) {
  try {
    const cookieStore = cookies();

    const formattedURL = getFormattedURL(baseURL, url);
    const formattedContentType = getFormattedContentType(contentType);
    const formattedCookie = getFormattedCookie(cookieStore);

    return await axios<TData>({
      ...restProps,
      ...formattedURL,
      headers: {
        ...headers,
        ...formattedContentType,
        ...formattedCookie,
      },
    });
  } catch (error) {
    if (error instanceof AxiosError && error.isAxiosError) {
      if (error.response) {
        throw error.response.data;
      }
    }

    throw error;
  }
}

const getFormattedURL = (baseURL?: string, url?: string) => {
  return url?.startsWith('http') ? { url } : { baseURL: baseURL ?? SERVER_SETTINGS.API_URL, url };
};

const getFormattedContentType = (contentType?: ContentType) => {
  switch (contentType) {
    case 'json':
      return {
        [CONTENT_TYPE_KEY]: 'application/json',
      };
    case 'form':
      return {
        [CONTENT_TYPE_KEY]: 'application/x-www-form-urlencoded',
      };
    case 'multipart':
      return {
        [CONTENT_TYPE_KEY]: 'multipart/form-data',
      };
    default:
      return {
        [CONTENT_TYPE_KEY]: 'application/json',
      };
  }
};

const getFormattedCookie = (cookieStore: ReadonlyRequestCookies) => {
  const accessTokenCookie = cookieStore.get(COOKIE_KEY.accessToken);
  const refreshTokenCookie = cookieStore.get(COOKIE_KEY.refreshToken);

  const formattedAccessTokenCookie = accessTokenCookie
    ? `${accessTokenCookie?.name}=${accessTokenCookie?.value};`
    : '';
  const formattedRefreshTokenCookie = refreshTokenCookie
    ? `${refreshTokenCookie?.name}=${refreshTokenCookie?.value}`
    : '';

  if (!accessTokenCookie && !refreshTokenCookie) return {};

  if (accessTokenCookie && refreshTokenCookie)
    return {
      [COOKIE_TYPE_KEY]: `${formattedAccessTokenCookie}; ${formattedRefreshTokenCookie}`,
    };

  return {
    [COOKIE_TYPE_KEY]: `${formattedAccessTokenCookie}${formattedRefreshTokenCookie}`,
  };
};

// const setCookieToStore = async (
//   cookieStore: ReadonlyRequestCookies,
//   responseCookies?: string[]
// ) => {
//   'use server';

//   if (!responseCookies) return;

//   const tokenCookies = responseCookies.filter(
//     cookie =>
//       cookie.startsWith(COOKIE_KEY.bearerAccessToken) ||
//       cookie.startsWith(COOKIE_KEY.bearerRefreshToken)
//   );

//   tokenCookies.forEach(tokenCookie => {
//     const splitedTokenCookies = tokenCookie.split(';');

//     const cookieKey = splitedTokenCookies[0].split('=')[0];
//     const cookieValue = splitedTokenCookies[0].split('=')[1];
//     const cookieOptions = splitedTokenCookies.slice(1);

//     const cookiePath = cookieOptions.find(option => option.includes(COOKIE_PATH))?.split('=')[1];
//     const cookieDomain = cookieOptions
//       .find(option => option.includes(COOKIE_DOMAIN))
//       ?.split('=')[1];
//     const cookieSecure = cookieOptions.find(option => option.includes(COOKIE_SECURE));
//     const cookieHttpOnly = cookieOptions.find(option => option.includes(COOKIE_HTTPONLY));
//     const cookieSameSite = cookieOptions
//       .find(option => option.includes(COOKIE_SAMESITE))
//       ?.split('=')[1];
//     const cookieMaxAge = cookieOptions
//       .find(option => option.includes(COOKIE_MAX_AGE))
//       ?.split('=')[1];

//     cookieStore.set(cookieKey, cookieValue, {
//       path: cookiePath,
//       domain: cookieDomain,
//       secure: !!cookieSecure,
//       httpOnly: !!cookieHttpOnly,
//       sameSite: cookieSameSite as SameSite,
//       maxAge: cookieMaxAge ? parseInt(cookieMaxAge) : undefined,
//     });
//   });
// };

// axios.interceptors.response.use(response => {
//   'use server';

//   const responseCookies = response.headers['set-cookie'];
//   const cookieStore = cookies();

//   if (!responseCookies) return response;

//   const tokenCookies = responseCookies.filter(
//     cookie =>
//       cookie.startsWith(COOKIE_KEY.bearerAccessToken) ||
//       cookie.startsWith(COOKIE_KEY.bearerRefreshToken)
//   );

//   tokenCookies.forEach(tokenCookie => {
//     const splitedTokenCookies = tokenCookie.split(';');

//     const cookieKey = splitedTokenCookies[0].split('=')[0];
//     const cookieValue = splitedTokenCookies[0].split('=')[1];
//     const cookieOptions = splitedTokenCookies.slice(1);

//     const cookiePath = cookieOptions.find(option => option.includes(COOKIE_PATH))?.split('=')[1];
//     const cookieDomain = cookieOptions
//       .find(option => option.includes(COOKIE_DOMAIN))
//       ?.split('=')[1];
//     const cookieSecure = cookieOptions.find(option => option.includes(COOKIE_SECURE));
//     const cookieHttpOnly = cookieOptions.find(option => option.includes(COOKIE_HTTPONLY));
//     const cookieSameSite = cookieOptions
//       .find(option => option.includes(COOKIE_SAMESITE))
//       ?.split('=')[1];
//     const cookieMaxAge = cookieOptions
//       .find(option => option.includes(COOKIE_MAX_AGE))
//       ?.split('=')[1];

//     cookieStore.set(cookieKey, cookieValue, {
//       path: cookiePath,
//       domain: cookieDomain,
//       secure: !!cookieSecure,
//       httpOnly: !!cookieHttpOnly,
//       sameSite: cookieSameSite as SameSite,
//       maxAge: cookieMaxAge ? parseInt(cookieMaxAge) : undefined,
//     });
//   });

//   return response;
// });
