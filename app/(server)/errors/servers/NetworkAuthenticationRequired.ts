import { BaseErrorData, BaseError } from '../BaseError';

export class NetworkAuthenticationRequired extends BaseError {
  type!: 'NetworkAuthenticationRequired';
  code!: 511;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
