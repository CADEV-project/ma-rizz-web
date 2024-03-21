import { BaseErrorData, BaseError } from './BaseError';

type UnauthorizedType = 'Unauthorized';

type UnauthorizedCode = 401;

export class Unauthorized extends BaseError {
  type!: UnauthorizedType;
  code!: UnauthorizedCode;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
