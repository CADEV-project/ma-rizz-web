import { NextResponse } from 'next/server';

export const middleware = async () => {
  // NOTE: Other case, just pass the request.
  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicons).*)'],
};
