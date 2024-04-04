import { BaseErrorData, BaseError } from './BaseError';

type TooManyRequestsType = 'TooManyRequests';

type TooManyRequestsCode = 429;

type TooManyRequestDetail = {
  limit: number;
  retryAfter: number;
};

export class TooManyRequests extends BaseError {
  type!: TooManyRequestsType;
  code!: TooManyRequestsCode;
  detail!: TooManyRequestDetail;

  constructor(
    payload: BaseErrorData<TooManyRequestsType, TooManyRequestsCode, TooManyRequestDetail>
  ) {
    super(payload);
  }
}

export const isTooManyRequests = (error: unknown): error is TooManyRequests => {
  return error instanceof TooManyRequests;
};
