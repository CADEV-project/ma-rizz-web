import { BaseErrorData, BaseError } from './BaseError';

type ValidationFailedType = 'ValidationFailed';

type ValidationFailedCode = 422;

type ValidationFailedReason = 'REQUIRED' | 'REGEX_NOT_MATCHED';

type ValidationFailedDetail = {
  field: string;
  reason: ValidationFailedReason;
};

export class ValidationFailed extends BaseError {
  type!: ValidationFailedType;
  code!: ValidationFailedCode;
  detail!: ValidationFailedDetail[];

  constructor(
    payload: BaseErrorData<ValidationFailedType, ValidationFailedCode, ValidationFailedDetail[]>
  ) {
    super(payload);
  }
}
