import { BaseErrorData, BaseError } from '../BaseError';

export class BadRequest extends BaseError {
  type!: 'BadRequest';
  code!: 400;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
