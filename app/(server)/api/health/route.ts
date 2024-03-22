import { SuccessResponse } from '@/(server)/util';

/**
 * NOTE: /api/health
 * This is a health check endpoint.
 * @returns Empty object.
 */
export const GET = async () => {
  // TODO: Implement logging.
  console.info('GET /api/health');

  return SuccessResponse();
};
