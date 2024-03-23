import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  export type User = {
    accessToken: string;
    accessTokenExpiry: number;
    refreshToken: string;
  };
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    accessTokenExpiry: number;
    refreshToken: string;
  }
}
