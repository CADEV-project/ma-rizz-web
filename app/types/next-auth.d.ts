import { AccountType } from '@/(server)/union';
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id?: never; // Remove id property from User interface.
    accessToken?: string;
    accessTokenExpiry?: number;
    refreshToken?: string;
  }
  interface Session {
    type?: AccountType;
    accessToken?: string;
    accessTokenExpiry?: number;
    refreshToken?: string;
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    type?: AccountType;
    accessToken?: string;
    accessTokenExpiry?: number;
    refreshToken?: string;
  }
}
