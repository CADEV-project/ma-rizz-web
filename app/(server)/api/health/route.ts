import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { SuccessResponse } from '@/(server)/util';

import { SERVER_SETTINGS } from '@/setting';

/**
 * NOTE: /api/health
 */
export const GET = async (request: NextRequest) => {
  const authToken = await getToken({ req: request, secret: SERVER_SETTINGS.NEXTAUTH_SECRET });

  return SuccessResponse('GET', { authToken });
};
