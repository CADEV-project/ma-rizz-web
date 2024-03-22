import 'next-auth';
import 'next-auth/jwt';

import { AuthSignInResponse } from '@/(server)/api/auth/sign-in/type';

declare module 'next-auth' {
  export type User = AuthSignInResponse;
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
