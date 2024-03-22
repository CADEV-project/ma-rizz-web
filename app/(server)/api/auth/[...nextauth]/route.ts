import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';
// import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

import axios from 'axios';

import { NotFound } from '@/(server)/error';

import { AuthSignInResponse } from '@/(server)/api/auth/sign-in/type';
import { API_URL, ROUTE_URL } from '@/constant';
import { SERVER_SETTINGS } from '@/setting';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: ROUTE_URL.auths.signIn,
    newUser: ROUTE_URL.auths.new,
    error: ROUTE_URL.auths.error,
  },
  secret: SERVER_SETTINGS.NEXTAUTH_SECRET,
  debug: false,
  providers: [
    Credentials({
      credentials: {
        email: { type: 'text' },
        password: { type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials)
          throw new NotFound({ type: 'NotFound', code: 404, detail: { fields: ['credentials'] } });

        const response = await axios.post<AuthSignInResponse>(
          `${SERVER_SETTINGS.NEXTAUTH_URL}/api/${API_URL.auth.signIn}`,
          {
            email: credentials.email,
            password: credentials.password,
          }
        );

        const user = response.data;

        if (response.status === 201 && user) return user;

        return null;
      },
    }),
    Kakao({ clientId: '', clientSecret: '' }),
  ],
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 30 * 60, // 30 minutes
  // },
  // jwt: {
  //   async encode({ secret, token }) {
  //     if (!token) throw new Error('Token is required.');

  //     return jsonwebtoken.sign(token, secret);
  //   },
  //   async decode({ secret, token }) {
  //     if (!token) throw new Error('Token is required.');

  //     return jsonwebtoken.verify(token, secret) as JwtPayload | null;
  //   },
  // },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.info('SignIn Callback', user, account, profile, email, credentials);

  //     return true;
  //   },
  //   async jwt({ token }) {
  //     // TODO: Make Token
  //     return token;
  //   },
  //   async session({ session }) {
  //     // TODO: Session 조회시 실행
  //     return session;
  //   },
  // },
  // events: {
  //   async signIn(message) {
  //     console.info('SignIn Event', message);
  //   },
  //   async signOut(message) {
  //     console.info('signOut', message);
  //   },
  //   async createUser(message) {
  //     console.info('createUser', message);
  //   },
  //   async updateUser(message) {
  //     console.info('updateUser', message);
  //   },
  //   async session({ session, token }) {
  //     console.info('session', session, token);
  //   },
  // },
  // logger: {
  //   error: (code, metadata) => console.error(code, metadata),
  //   warn: code => console.warn(code),
  //   debug: (code, metadata) => console.debug(code, metadata),
  // },
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
