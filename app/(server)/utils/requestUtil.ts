import { NextRequest } from 'next/server';

import { BadRequest, Unauthorized } from '@/(error)';

import { COOKIE_KEY } from '@/constant';

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

type CommonBody = Record<string, unknown>;

type BodyField<Body> = { key: keyof Body; required?: boolean };

export async function getRequestBodyJSON<Body extends CommonBody>(
  request: NextRequest,
  fields: BodyField<Body>[]
): Promise<Body> {
  const requestBody = await request.json();

  const badRequestDetails: { field: string; reason: 'REQUIRED' }[] = [];

  if (!requestBody || typeof requestBody !== 'object' || Object.keys(requestBody).length === 0)
    throw new BadRequest({
      type: 'BadRequest',
      code: 400,
      detail: [{ field: 'requestBody', reason: 'REQUIRED' }],
    });

  const requestBodyKeys = Object.keys(requestBody);

  fields.forEach(field => {
    if (
      (!requestBodyKeys.includes(field.key as string) || requestBody[field.key as string] === '') &&
      field.required
    )
      badRequestDetails.push({ field: field.key as string, reason: 'REQUIRED' });
  });

  if (badRequestDetails.length > 0)
    throw new BadRequest({
      type: 'BadRequest',
      code: 400,
      detail: badRequestDetails,
    });

  return requestBody as Body;
}

type CommonSearchParams = Record<string, unknown>;

type GetRequestSearchParamsJSONReturn<T extends CommonSearchParams> = { [K in keyof T]: string };

type SearchParamsField<SearchParams> = {
  key: keyof SearchParams;
  required?: boolean;
};

export function getRequestSearchPraramsJSON<SearchParams extends CommonSearchParams>(
  request: NextRequest,
  fields: SearchParamsField<SearchParams>[]
): GetRequestSearchParamsJSONReturn<SearchParams> {
  const searchParams = request.nextUrl.searchParams;

  const badRequestDetails: { field: string; reason: 'REQUIRED' }[] = [];

  if (!searchParams || searchParams.toString().length === 0)
    throw new BadRequest({
      type: 'BadRequest',
      code: 400,
      detail: [{ field: 'searchParams', reason: 'REQUIRED' }],
    });

  const searchParamsKeys = Array.from(searchParams.keys());
  const searchParamsJSON: Record<string, string> = {};

  fields.forEach(field => {
    if (
      (!searchParamsKeys.includes(field.key as string) ||
        searchParams.get(field.key as string) === '') &&
      field.required
    )
      return badRequestDetails.push({ field: field.key as string, reason: 'REQUIRED' });

    searchParamsJSON[field.key as string] = searchParams.get(field.key as string) as string;
  });

  if (badRequestDetails.length > 0)
    throw new BadRequest({
      type: 'BadRequest',
      code: 400,
      detail: badRequestDetails,
    });

  return searchParamsJSON as GetRequestSearchParamsJSONReturn<SearchParams>;
}

type CommonFormData = Record<string, unknown>;

type FormField<FormData> = { key: keyof FormData; required?: boolean };

export async function getRequestFormDataJSON<FormData extends CommonFormData>(
  request: NextRequest,
  fields: FormField<FormData>[]
): Promise<FormData> {
  const formData = await request.formData();

  if (!formData)
    throw new BadRequest({
      type: 'BadRequest',
      code: 400,
      detail: [{ field: 'formData', reason: 'REQUIRED' }],
    });

  const badRequestDetails: { field: string; reason: 'REQUIRED' }[] = [];

  const formDataJSON: Record<string, unknown> = {};

  const formDataKeys = Array.from(formData.keys());

  fields.forEach(field => {
    if (
      (!formDataKeys.includes(field.key as string) || formData.get(field.key as string) === '') &&
      field.required
    )
      badRequestDetails.push({ field: field.key as string, reason: 'REQUIRED' });

    formDataJSON[field.key as string] = formData.get(field.key as string) as string;
  });

  if (badRequestDetails.length > 0)
    throw new BadRequest({
      type: 'BadRequest',
      code: 400,
      detail: badRequestDetails,
    });

  return formDataJSON as FormData;
}
