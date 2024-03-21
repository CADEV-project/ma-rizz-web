import { BaseErrorData, BaseError } from '../BaseError';

export class TooManyRequests extends BaseError {
  type!: 'TooManyRequests';
  code!: 429;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
