export type BaseErrorData<ErrorType = string, ErrorCode = number, ErrorDetail = unknown> = {
  type: ErrorType;
  code: ErrorCode;
  detail?: ErrorDetail;
  message?: string;
};

export class BaseError extends Error {
  type: string;
  code: number;
  detail: unknown;
  message: string;

  constructor(payload: BaseErrorData) {
    super();

    this.name = this.constructor.name;
    this.type = payload.type;
    this.code = payload.code;
    this.detail = payload.detail || '';
    this.message = payload.message || '';
  }
}
