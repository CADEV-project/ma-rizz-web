import { BaseErrorData, BaseError } from './BaseError';

type NotImplementedType = 'NotImplemented';

type NotImplementedCode = 501;

type NotImplementedDetail = string;

export class NotImplemented extends BaseError {
  type!: NotImplementedType;
  code!: NotImplementedCode;
  detail!: NotImplementedDetail;

  constructor(payload: BaseErrorData) {
    super(payload);
  }
}

export const isNotImplemented = (error: unknown): error is NotImplemented => {
  return error instanceof NotImplemented;
};
