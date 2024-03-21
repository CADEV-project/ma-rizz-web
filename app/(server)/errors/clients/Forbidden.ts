import { BaseErrorData, BaseError } from '../BaseError';

type ForbiddenDetail = {
  currentAuthority: string;
  requiredAuthorities: string[];
};

export class Forbidden extends BaseError {
  type!: 'Unauthorized';
  code!: 403;
  detail!: ForbiddenDetail;

  constructor(payload: BaseErrorData<ForbiddenDetail>) {
    super(payload);
  }
}
