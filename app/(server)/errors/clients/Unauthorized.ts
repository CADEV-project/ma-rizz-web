import { BaseErrorData, BaseError } from '../BaseError';

export class Unauthorized extends BaseError {
  type!: 'Unauthorized';
  code!: 401;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
