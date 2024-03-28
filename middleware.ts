import { NextRequest, NextResponse } from 'next/server';

import { AUTHORIZATION, COOKIE_KEY, ROUTE_URL } from '@/constant';
import { SERVER_SETTINGS } from '@/setting';

// NOTE: On middleware part, access token and refresh token must set in cookies.
export const middleware = async (request: NextRequest) => {
  const PROTECTED_PAGE_ROUTE = /^(\/user\/)/;

  const isAPIRoute = request.nextUrl.pathname.startsWith(SERVER_SETTINGS.API_PREFIX);
  const isAuthAPIRoute = request.nextUrl.pathname.startsWith(
    `${SERVER_SETTINGS.API_PREFIX}${ROUTE_URL.auth.prefix}`
  );
  const isAuthPageRoute = request.nextUrl.pathname.startsWith(ROUTE_URL.auth.prefix);
  const isProtectedPageRoute = PROTECTED_PAGE_ROUTE.test(request.nextUrl.pathname);

  const accessToken = request.headers.get(AUTHORIZATION);
  const refreshTokenCookie = request.cookies.get(COOKIE_KEY.refreshToken);

  if (isAPIRoute) {
    // NOTE: Case of API routes

    if (!isAuthAPIRoute && !refreshTokenCookie && accessToken) {
      // NOTE: When go to api route handlers and if the access token is not included but refresh token is included in the request, the refresh token is deleted on the server side.

      request.cookies.delete(COOKIE_KEY.accessToken);

      const requestHeaders = new Headers(request.headers);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      response.cookies.delete(COOKIE_KEY.accessToken);

      return response;
    }
  } else {
    if (isAuthPageRoute) {
      if (accessToken) {
        if (refreshTokenCookie) {
          // NOTE: When go to auth pages, If the access token and refresh token is included in the request, can't access the auth page.

          return NextResponse.redirect(new URL(ROUTE_URL.home, request.url));
        } else {
          // NOTE: When go to auth pages, if the access token is included in the request and refresh token is not included, the access token is deleted on the server side.

          request.cookies.delete(COOKIE_KEY.accessToken);

          const requestHeaders = new Headers(request.headers);

          const response = NextResponse.next({ request: { headers: requestHeaders } });

          response.cookies.delete(COOKIE_KEY.accessToken);

          return response;
        }
      }
    }

    if (isProtectedPageRoute) {
      const response = NextResponse.redirect(new URL(ROUTE_URL.auth.signIn, request.url));

      if (!accessToken) {
        // NOTE: When go to protected pages, if the access token is not in the request, redirect to sign-in page.

        if (refreshTokenCookie) {
          // NOTE: If refresh token is included in the request, the refresh token is deleted on the server side.

          response.cookies.delete(COOKIE_KEY.refreshToken);
        }

        return response;
      } else {
        if (!refreshTokenCookie) {
          // NOTE: When go to protected pages, if the access token is included in the request but refresh token is not included, the access token is deleted on the server side.

          response.cookies.delete(COOKIE_KEY.accessToken);

          return response;
        }
      }
    }
  }

  // NOTE: Other case, just pass the request
  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicons).*)'],
};
