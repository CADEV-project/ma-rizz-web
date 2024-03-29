import { BaseErrorData, BaseError } from './BaseError';

type UnauthorizedType = 'Unauthorized';

type UnauthorizedCode = 401;

type TokenNotExist = {
  name: 'TokenNotExist';
  message: 'access token not exist' | 'refresh token not exist' | 'auto sign in not exist';
};

type TokenExpiredError = {
  name: 'TokenExpiredError';
  messsage: 'jwt expired';
  expiredAt: number;
};

type JsonWebTokenError = {
  name: 'JsonWebTokenError';
  message:
    | 'invalid token'
    | 'jwt malformed'
    | 'jwt signature is required'
    | 'invalid signature'
    | 'jwt audience invalid'
    | 'jwt issuer invalid'
    | 'jwt id invalid'
    | 'jwt subject invalid';
};

type NotBeforeError = {
  name: 'NotBeforeError';
  message: 'jwt not active';
  date: Date;
};

type UnauthorizedDetail = TokenNotExist | TokenExpiredError | JsonWebTokenError | NotBeforeError;

export class Unauthorized extends BaseError {
  type!: UnauthorizedType;
  code!: UnauthorizedCode;
  detail!: UnauthorizedDetail;

  constructor(payload: BaseErrorData<UnauthorizedType, UnauthorizedCode, UnauthorizedDetail>) {
    super(payload);
  }
}
