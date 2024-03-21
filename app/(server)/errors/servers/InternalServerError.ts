import { BaseErrorData, BaseError } from '../BaseError';

export class InternalServerError extends BaseError {
  type!: 'InternalServerError';
  code!: 500;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
