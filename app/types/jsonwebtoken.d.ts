import 'jsonwebtoken';

import { AccountType } from '@/(server)/unions';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    accountId: string;
    accountType: AccountType;
  }
}
