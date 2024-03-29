import { NextRequest } from 'next/server';

import { NotFound, Unauthorized } from '@/(server)/error';

import { COOKIE_KEY } from '@/constant';

type CommonBody = Record<string, unknown>;

export const getRequestAccessToken = (request: NextRequest) => {
  const accessTokenCookie = request.cookies.get(COOKIE_KEY.accessToken);

  if (!accessTokenCookie)
    throw new Unauthorized({
      type: 'Unauthorized',
      code: 401,
      detail: {
        name: 'TokenNotExist',
        message: 'access token not exist',
      },
    });

  return accessTokenCookie.value;
};

export const getRequestRefreshToken = (request: NextRequest) => {
  const refreshTokenCookie = request.cookies.get(COOKIE_KEY.refreshToken);

  if (!refreshTokenCookie)
    throw new Unauthorized({
      type: 'Unauthorized',
      code: 401,
      detail: {
        name: 'TokenNotExist',
        message: 'refresh token not exist',
      },
    });

  return refreshTokenCookie.value;
};

export const getRequestAutoSignIn = (request: NextRequest) => {
  const autoSignInCookie = request.cookies.get(COOKIE_KEY.autoSignIn);

  if (!autoSignInCookie)
    throw new Unauthorized({
      type: 'Unauthorized',
      code: 401,
      detail: {
        name: 'TokenNotExist',
        message: 'auto sign in not exist',
      },
    });

  return autoSignInCookie.value === 'true';
};

export async function getRequestBodyJSON<Body extends CommonBody>(
  request: NextRequest,
  fields: (keyof Body)[]
): Promise<Body> {
  const requestBody = await request.json();

  const notFoundFields: string[] = [];

  if (!requestBody || typeof requestBody !== 'object' || Object.keys(requestBody).length === 0)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'body' });

  const requestBodyKeys = Object.keys(requestBody);

  fields.forEach(field => {
    if (typeof field !== 'string' || !requestBodyKeys.includes(field))
      notFoundFields.push(field as string);
  });

  if (notFoundFields.length > 0)
    throw new NotFound({
      type: 'NotFound',
      code: 404,
      detail: notFoundFields,
    });

  return requestBody as Body;
}

type CommonSearchParams = Record<string, unknown>;

type SearchParamsParserReturn<T extends CommonSearchParams> = { [K in keyof T]: string };

export function getRequestSearchPraramsJSON<SearchParams extends CommonSearchParams>(
  request: NextRequest,
  fields: (keyof SearchParams)[]
): SearchParamsParserReturn<SearchParams> {
  const searchParams = request.nextUrl.searchParams;

  const notFoundFields: string[] = [];

  if (!searchParams || searchParams.toString().length === 0)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'searchParams' });

  const searchParamsKeys = Array.from(searchParams.keys());
  const searchParamsObject: Record<string, string> = {};

  fields.forEach(field => {
    if (typeof field !== 'string' || !searchParamsKeys.includes(field))
      return notFoundFields.push(field as string);

    searchParamsObject[field as string] = searchParams.get(field as string) as string;
  });

  if (notFoundFields.length > 0)
    throw new NotFound({
      type: 'NotFound',
      code: 404,
      detail: notFoundFields,
    });

  return searchParamsObject as SearchParamsParserReturn<SearchParams>;
}
