import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    accountId: string;
    userId: string;
  }
}
