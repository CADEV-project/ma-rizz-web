import { NextRequest } from 'next/server';

import { NotFound, Unauthorized, ValidationFailed } from '@/(server)/error';

import { COOKIE_KEY } from '@/constant';

type CommonBody = Record<string, unknown>;

export const isAuthorizedRequest = (request: NextRequest) => {
  return !!request.cookies.get(COOKIE_KEY.accessToken);
};

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

type BodyField<Body> = { key: keyof Body; required?: boolean };

export async function getRequestBodyJSON<Body extends CommonBody>(
  request: NextRequest,
  fields: BodyField<Body>[]
): Promise<Body> {
  const requestBody = await request.json();

  const validationFailedDetails: { field: string; reason: 'REQUIRED' }[] = [];

  if (!requestBody || typeof requestBody !== 'object' || Object.keys(requestBody).length === 0)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'body' });

  const requestBodyKeys = Object.keys(requestBody);

  fields.forEach(field => {
    if (
      (!requestBodyKeys.includes(field.key as string) || requestBody[field.key as string] === '') &&
      field.required
    )
      validationFailedDetails.push({ field: field.key as string, reason: 'REQUIRED' });
  });

  if (validationFailedDetails.length > 0)
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: validationFailedDetails,
    });

  return requestBody as Body;
}

type CommonSearchParams = Record<string, unknown>;

type SearchParamsParserReturn<T extends CommonSearchParams> = { [K in keyof T]: string };

type SearchParamsField<SearchParams> = {
  key: keyof SearchParams;
  required?: boolean;
};

export function getRequestSearchPraramsJSON<SearchParams extends CommonSearchParams>(
  request: NextRequest,
  fields: SearchParamsField<SearchParams>[]
): SearchParamsParserReturn<SearchParams> {
  const searchParams = request.nextUrl.searchParams;

  const validationFailedDetails: { field: string; reason: 'REQUIRED' }[] = [];

  if (!searchParams || searchParams.toString().length === 0)
    throw new NotFound({ type: 'NotFound', code: 404, detail: 'searchParams' });

  const searchParamsKeys = Array.from(searchParams.keys());
  const searchParamsObject: Record<string, string> = {};

  fields.forEach(field => {
    if (
      (!searchParamsKeys.includes(field.key as string) ||
        searchParams.get(field.key as string) === '') &&
      field.required
    )
      return validationFailedDetails.push({ field: field.key as string, reason: 'REQUIRED' });

    searchParamsObject[field.key as string] = searchParams.get(field.key as string) as string;
  });

  if (validationFailedDetails.length > 0)
    throw new ValidationFailed({
      type: 'ValidationFailed',
      code: 422,
      detail: validationFailedDetails,
    });

  return searchParamsObject as SearchParamsParserReturn<SearchParams>;
}