import { NextResponse } from 'next/server';
import { FLIGHTS_MOCK } from '@/data/flightsMock';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  let result = FLIGHTS_MOCK;

  if (origin) {
    result = result.filter((f) => f.origin.code.toLowerCase() === origin.toLowerCase());
  }
  if (destination) {
    result = result.filter((f) => f.destination.code.toLowerCase() === destination.toLowerCase());
  }

  return NextResponse.json({
    status: 'success',
    count: result.length,
    data: result,
  });
}
