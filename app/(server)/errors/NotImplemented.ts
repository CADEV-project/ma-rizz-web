import { BaseErrorData, BaseError } from './BaseError';

type NotImplementedType = 'NotImplemented';

type NotImplementedCode = 501;

export class NotImplemented extends BaseError {
  type!: NotImplementedType;
  code!: NotImplementedCode;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}
