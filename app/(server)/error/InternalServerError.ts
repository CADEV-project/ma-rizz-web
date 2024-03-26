import { BaseErrorData, BaseError } from './BaseError';

type InternalServerErrorType = 'InternalServerError';

type InternalServerErrorCode = 500;

type InternalServerErrorDetail = {
  error: unknown;
};

export class InternalServerError extends BaseError {
  type!: InternalServerErrorType;
  code!: InternalServerErrorCode;
  detail!: InternalServerErrorDetail;

  constructor(
    payload: BaseErrorData<
      InternalServerErrorType,
      InternalServerErrorCode,
      InternalServerErrorDetail
    >
  ) {
    super(payload);
  }
}
