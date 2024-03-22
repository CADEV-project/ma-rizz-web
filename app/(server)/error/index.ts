import { NextResponse } from 'next/server';

import { BaseError } from './BaseError';
import { Forbidden } from './Forbidden';
import { InternalServerError } from './InternalServerError';
import { NotFound } from './NotFound';
import { NotImplemented } from './NotImplemented';
import { Unauthorized } from './Unauthorized';
import { UnsupportedMediaType } from './UnsupportedMediaType';
import { ValidationFailed } from './ValidationFailed';

const BASE_ERROR: Record<string, typeof BaseError> = {
  Forbidden,
  NotFound,
  NotImplemented,
  Unauthorized,
  UnsupportedMediaType,
  ValidationFailed,
};

const isBaseError = (error: unknown): error is BaseError => {
  return (
    typeof error === 'object' &&
    'type' in (error as object) &&
    'detail' in (error as object) &&
    (error as BaseError).type in BASE_ERROR
  );
};

export const ErrorResponse = (error: unknown): NextResponse<BaseError> => {
  if (!isBaseError(error)) {
    const internalServerError = new InternalServerError({
      type: 'InternalServerError',
      code: 500,
      detail: { error: error as Error },
    });

    return NextResponse.json(internalServerError, {
      status: internalServerError.code,
      statusText: internalServerError.type,
    });
  }

  return NextResponse.json(error, { status: error.code, statusText: error.type });
};

export * from './BaseError';
export {
  Forbidden,
  InternalServerError,
  NotFound,
  NotImplemented,
  Unauthorized,
  UnsupportedMediaType,
  ValidationFailed,
};
