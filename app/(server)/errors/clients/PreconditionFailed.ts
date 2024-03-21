import { BaseErrorData, BaseError } from '../BaseError';

export class PreconditionFailed extends BaseError {
  type!: 'PreconditionFailed';
  code!: 412;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
