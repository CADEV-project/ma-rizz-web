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

    this.name = payload.type;
    this.type = payload.type;
    this.code = payload.code;
    this.detail = payload.detail || '';
    this.message = payload.message || '';
  }
}

export type DatabaseError = {
  errors: DatabaseErrorColumn;
};

type DatabaseErrorColumn = Record<string, DatabaseErrorData>;

type DatabaseErrorData = {
  name: string;
  message: string;
  properties: unknown;
  kind: string;
  path: string;
  value: string;
  reason: BaseError;
};
