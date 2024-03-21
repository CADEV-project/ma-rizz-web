import { BaseErrorData, BaseError } from './BaseError';

type NotFoundType = 'NotFound';

type NotFoundCode = 404;

export class NotFound extends BaseError {
  type!: NotFoundType;
  code!: NotFoundCode;

  constructor(payload: BaseErrorData<NotFoundType, NotFoundCode>) {
    super(payload);
  }
}
