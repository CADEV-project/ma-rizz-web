// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    gender: string;
    address: string;
    createdAt: string;
  }
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
  }
}
