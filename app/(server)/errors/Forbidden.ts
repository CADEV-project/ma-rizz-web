import { BaseErrorData, BaseError } from './BaseError';

type ForbiddenType = 'Forbidden';

type ForbiddenCode = 403;

export class Forbidden extends BaseError {
  type!: ForbiddenType;
  code!: ForbiddenCode;

  constructor(payload: BaseErrorData<ForbiddenType, ForbiddenCode>) {
    super(payload);
  }
}
