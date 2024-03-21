import { NextResponse } from 'next/server';

import { BaseError } from './BaseError';
import {
  BadRequest,
  Conflict,
  Forbidden,
  Locked,
  NotFound,
  PreconditionFailed,
  RequestTimeout,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  UnsupportedMediaType,
} from './clients';
import { InternalServerError, NetworkAuthenticationRequired } from './servers';

const BASE_ERROR: Record<string, typeof BaseError> = {
  BadRequest,
  Conflict,
  Forbidden,
  Locked,
  NotFound,
  PreconditionFailed,
  RequestTimeout,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  UnsupportedMediaType,
  InternalServerError,
  NetworkAuthenticationRequired,
};

const isBaseError = (error: unknown): error is BaseError => {
  return (
    typeof error === 'object' &&
    'type' in (error as object) &&
    'detail' in (error as object) &&
    (error as BaseError).type in BASE_ERROR
  );
};

export const errorHandler = (error: unknown) => {
  if (isBaseError(error)) {
    return NextResponse.json(error, { status: error.code, statusText: error.type });
  }

  return NextResponse.json(error, { status: 512, statusText: 'Unhandled Error' });
};

export * from './BaseError';
export {
  BadRequest,
  Conflict,
  Forbidden,
  Locked,
  NotFound,
  PreconditionFailed,
  RequestTimeout,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  UnsupportedMediaType,
  InternalServerError,
  NetworkAuthenticationRequired,
};
