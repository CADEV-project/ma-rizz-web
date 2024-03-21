import { BaseErrorData, BaseError } from '../BaseError';

type NotFoundType = 'NotFound';

export class NotFound extends BaseError {
  type!: NotFoundType;
  code!: 404;

  constructor(payload: BaseErrorData<NotFoundType>) {
    super(payload);
  }
}
