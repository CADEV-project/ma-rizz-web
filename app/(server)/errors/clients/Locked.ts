import { BaseErrorData, BaseError } from '../BaseError';

export class Locked extends BaseError {
  type!: 'Locked';
  code!: 423;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
