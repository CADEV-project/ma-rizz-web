import { BaseErrorData, BaseError } from './BaseError';

type BadRequestType = 'BabRequest';

type BadRequestCode = 400;

type BadRequestDetail = {
  field: string;
  reason: 'INVALID_FORMAT' | 'INVALID_VALUE';
};

export class BadRequest extends BaseError {
  type!: BadRequestType;
  code!: BadRequestCode;
  detail!: BadRequestDetail;

  constructor(payload: BaseErrorData<BadRequestType, BadRequestCode, BadRequestDetail>) {
    super(payload);
  }
}

export const isBadRequest = (error: unknown): error is BadRequest => {
  return error instanceof BadRequest;
};
