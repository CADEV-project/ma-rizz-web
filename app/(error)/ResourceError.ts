import { BaseErrorData, BaseError } from './BaseError';

type ResourceErrorType = 'ResourceError';

type ResourceErrorCode = 400;

type ResourceErrorDetail = {
  type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'FILE';
  action: 'LOAD' | 'COMPRESS' | 'CROP';
};

export class ResourceError extends BaseError {
  type!: ResourceErrorType;
  code!: ResourceErrorCode;
  detail!: ResourceErrorDetail;

  constructor(payload: BaseErrorData<ResourceErrorType, ResourceErrorCode, ResourceErrorDetail>) {
    super(payload);
  }
}

export const isResourceError = (error: unknown): error is ResourceError => {
  return error instanceof ResourceError;
};
