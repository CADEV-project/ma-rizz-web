import { BaseErrorData, BaseError } from '../BaseError';

export class RequestTimeout extends BaseError {
  type!: 'RequestTimeout';
  code!: 408;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
