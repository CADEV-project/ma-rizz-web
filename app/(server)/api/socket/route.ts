import axios from 'axios';

import { SuccessResponse } from '@/(server)/util';

import { ErrorResponse } from '@/(error)';

/**
 * NOTE: /api/health
 * @return void
 */
export const GET = async () => {
  try {
    await sendRequestToSocketServer();

    return SuccessResponse({ method: 'GET' });
  } catch (error) {
    return ErrorResponse({ method: 'GET' });
  }
};

const sendRequestToSocketServer = async () => {
  await axios.get('http://localhost:8000/api/socket');
};
