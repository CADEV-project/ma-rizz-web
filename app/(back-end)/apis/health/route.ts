import { NextRequest, NextResponse } from 'next/server';

const GET = async (request: NextRequest) => {
  console.info(request);

  return NextResponse.json({ message: '/apis/health' });
};

export { GET };
