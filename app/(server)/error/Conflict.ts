import { BaseErrorData, BaseError } from './BaseError';

type ConflictType = 'Conflict';

type ConflictCode = 409;

type ConflictDetail = string | string[];

export class Conflict extends BaseError {
  type!: ConflictType;
  code!: ConflictCode;
  detail!: ConflictDetail;

  constructor(payload: BaseErrorData<ConflictType, ConflictCode, ConflictDetail>) {
    super(payload);
  }
}
