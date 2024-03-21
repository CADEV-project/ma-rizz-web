export type BaseErrorData<ErrorDetail = unknown> = {
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

    this.name = '';
    this.type = '';
    this.code = 0;
    this.message = payload.message || '';
    this.detail = payload.detail || '';
  }
}
