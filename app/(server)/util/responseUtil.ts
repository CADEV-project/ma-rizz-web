import { NextResponse } from 'next/server';

import { Cookie } from '@/(server)/util';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const successCode = (method?: Method) => {
  switch (method) {
    case 'GET':
      return 200;
    case 'POST':
      return 201;
    case 'PUT':
    case 'PATCH':
      return 204;
    case 'DELETE':
      return 202;
    default:
      return 200;
  }
};

type SuccessResponseParams<Data> = {
  method: Method;
  data?: Data;
  cookies?: Cookie | Cookie[];
};

export function SuccessResponse<Data>({ method, data, cookies }: SuccessResponseParams<Data>) {
  const response = NextResponse.json<Data | Record<string, never>>(data ?? {}, {
    status: successCode(method),
    statusText: 'SUCCESS',
  });

  if (cookies) {
    if (!Array.isArray(cookies)) cookies = [cookies];

    cookies.forEach(cookie => {
      response.cookies.set(cookie.key, cookie.value, cookie.options);
    });
  }

  return response;
}
