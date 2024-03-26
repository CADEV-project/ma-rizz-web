import { SuccessResponse } from '@/(server)/util';

/**
 * NOTE: /api/health
 */
export const GET = async () => {
  return SuccessResponse('GET');
};
