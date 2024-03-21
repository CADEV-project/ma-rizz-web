import NextAuth, { NextAuthOptions } from 'next-auth';
import Apple from 'next-auth/providers/apple';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

// import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

import { ROUTE_URL } from '@/constants';

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: '',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        phoneNumber: { label: 'Phone Number', type: 'text' },
      },
      async authorize(credentials) {
        console.info('Authorize', credentials);

        return null; // Replace this line with the correct return value
      },
    }),
    Kakao({ clientId: '', clientSecret: '' }),
    Naver({ clientId: '', clientSecret: '' }),
    Google({ clientId: '', clientSecret: '' }),
    Apple({ clientId: '', clientSecret: '' }),
  ],
  secret: '', // TODO: Must implement this.
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
  },
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
  pages: {
    newUser: ROUTE_URL.auths.newUser,
    signIn: ROUTE_URL.auths.signIn,
    error: ROUTE_URL.auths.error,
    verifyRequest: ROUTE_URL.auths.verify,
  },
  callbacks: {
    async jwt({ token }) {
      // TODO: Make Token
      return token;
    },
    async session({ session }) {
      // TODO: Session 조회시 실행
      return session;
    },
  },
  events: {
    async signIn(message) {
      console.info('signIn', message);
    },
    async signOut(message) {
      console.info('signOut', message);
    },
    async createUser(message) {
      console.info('createUser', message);
    },
    async updateUser(message) {
      console.info('updateUser', message);
    },
    async session({ session, token }) {
      console.info('session', session, token);
    },
  },
  logger: {
    error: (code, metadata) => console.error(code, metadata),
    warn: code => console.warn(code),
    debug: (code, metadata) => console.debug(code, metadata),
  },
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
