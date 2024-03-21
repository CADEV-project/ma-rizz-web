import { BaseErrorData, BaseError } from '../BaseError';

export class NotImplemented extends BaseError {
  type!: 'NotImplemented';
  code!: 501;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
