import axios from 'axios';

import { SuccessResponse } from '@/(server)/util';

/**
 * NOTE: /api/health
 * @return void
 */
export const GET = async () => {
  await sendRequestToSocketServer();

  return SuccessResponse({ method: 'GET' });
};

const sendRequestToSocketServer = async () => {
  await axios.get('http://localhost:8000/api/socket');
};
