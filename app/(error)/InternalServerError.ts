import { BaseErrorData, BaseError } from './BaseError';

type InternalServerErrorType = 'InternalServerError';

type InternalServerErrorCode = 500;

export class InternalServerError extends BaseError {
  type!: InternalServerErrorType;
  code!: InternalServerErrorCode;

  constructor(payload: BaseErrorData<InternalServerErrorType, InternalServerErrorCode>) {
    super(payload);
  }
}
