import { BaseErrorData, BaseError } from './BaseError';

type NotFoundType = 'NotFound';

type NotFoundCode = 404;

type NotFoundDetail = string | string[];

export class NotFound extends BaseError {
  type!: NotFoundType;
  code!: NotFoundCode;
  detail!: NotFoundDetail;

  constructor(payload: BaseErrorData<NotFoundType, NotFoundCode, NotFoundDetail>) {
    super(payload);
  }
}
