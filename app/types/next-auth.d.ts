// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

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
