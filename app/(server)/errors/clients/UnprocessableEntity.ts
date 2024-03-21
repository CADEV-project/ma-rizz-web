import { BaseErrorData, BaseError } from '../BaseError';

type UnprocessableEntityDetail = {
  field: string;
  reason: string;
}[];

export class UnprocessableEntity extends BaseError {
  type!: 'UnprocessableEntity';
  code!: 422;
  detail!: UnprocessableEntityDetail;

  constructor(payload: BaseErrorData<UnprocessableEntityDetail>) {
    super(payload);
  }
}
