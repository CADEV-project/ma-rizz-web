export { default } from 'next-auth/middleware';

// NOTE: Configuration for protected routes (without authentication)
export const config = {
  // TODO: Make matchers to protected routes
  matcher: [],
};
