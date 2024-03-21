import { BaseErrorData, BaseError } from '../BaseError';

export class Conflict extends BaseError {
  type!: 'Conflict';
  code!: 409;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
