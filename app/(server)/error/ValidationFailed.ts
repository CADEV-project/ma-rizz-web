import { BaseErrorData, BaseError } from './BaseError';

type ValidationFailedType = 'ValidationFailed';

type ValidationFailedCode = 422;

type ValidationFailedDetail = {
  field: string;
  reason: string;
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
