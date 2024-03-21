import { BaseErrorData, BaseError } from './BaseError';

type UnsupportedMediaTypeType = 'UnsupportedMediaType';

type UnsupportedMediaTypeCode = 415;

type UnsupportedMediaTypeDetail = {
  currentMediaType: string;
  supportedMediaTypes: string[];
};

export class UnsupportedMediaType extends BaseError {
  type!: UnsupportedMediaTypeType;
  code!: UnsupportedMediaTypeCode;
  detail!: UnsupportedMediaTypeDetail;

  constructor(
    payload: BaseErrorData<
      UnsupportedMediaTypeType,
      UnsupportedMediaTypeCode,
      UnsupportedMediaTypeDetail
    >
  ) {
    super(payload);
  }
}
