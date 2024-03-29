import { BaseErrorData, BaseError } from './BaseError';

type ForbiddenType = 'Forbidden';

type ForbiddenCode = 403;

type ForbiddenDetail = string;

export class Forbidden extends BaseError {
  type!: ForbiddenType;
  code!: ForbiddenCode;
  detail!: ForbiddenDetail;

  constructor(payload: BaseErrorData<ForbiddenType, ForbiddenCode, ForbiddenDetail>) {
    super(payload);
  }
}
