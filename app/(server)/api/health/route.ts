import { NextResponse } from 'next/server';

export const GET = async () => {
  // TODO: Implement logging.
  console.info('GET /api/health');

  return NextResponse.json({}, { status: 200, statusText: 'Success' });
};
