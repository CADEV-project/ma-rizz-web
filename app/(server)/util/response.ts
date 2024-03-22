import { NextResponse } from 'next/server';

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

export function SuccessResponse<Data>(method?: Method, data?: Data) {
  return NextResponse.json<Data | Record<string, never>>(data ?? {}, {
    status: successCode(method),
    statusText: 'SUCCESS',
  });
}
