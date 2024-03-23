import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Kakao from 'next-auth/providers/kakao';
// import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

import axios from 'axios';

import { NotFound } from '@/(server)/error';

import { AuthSignInResponse } from '@/(server)/api/auth/sign-in/type';
import { API_URL, ROUTE_URL } from '@/constant';
import { SERVER_SETTINGS } from '@/setting';

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

const authOptions: NextAuthOptions = {
  pages: {
    // TODO: Implment this after.
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

        if (response.status === 201) return { ...response.data };

        return null;
      },
    }),
    Kakao({ clientId: '', clientSecret: '' }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: COOKIE_MAX_AGE,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = { ...token };

      return session;
    },
  },
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
