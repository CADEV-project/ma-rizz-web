import { BaseErrorData, BaseError } from '../BaseError';

type UnsupportedMediaTypeDetail = {
  currentMediaType: string;
  supportedMediaTypes: string[];
};

export class UnsupportedMediaType extends BaseError {
  type!: 'UnsupportedMediaType';
  code!: 415;
  detail!: UnsupportedMediaTypeDetail;

  constructor(payload: BaseErrorData<UnsupportedMediaTypeDetail>) {
    super(payload);
  }
}
