import { BaseErrorData, BaseError } from './BaseError';

type UnauthorizedType = 'Unauthorized';

type UnauthorizedCode = 401;

type UnauthorizedDetail = {
  reason: string;
};

export class Unauthorized extends BaseError {
  type!: UnauthorizedType;
  code!: UnauthorizedCode;
  detail!: UnauthorizedDetail;

  constructor(payload: BaseErrorData<UnauthorizedType, UnauthorizedCode, UnauthorizedDetail>) {
    super(payload);
  }
}
