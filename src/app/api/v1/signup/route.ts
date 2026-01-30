import { NextResponse } from 'next/server';

const BACKEND_BASE =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request) {
  if (!BACKEND_BASE) {
    return NextResponse.json(
      {
        error: 'API not configured',
        message:
          'Set API_BASE_URL or NEXT_PUBLIC_API_BASE_URL to your backend URL.',
      },
      { status: 503 }
    );
  }

  const url = `${BACKEND_BASE.replace(/\/$/, '')}/v1/signup`;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('[signup proxy]', err);
    return NextResponse.json(
      { error: 'Failed to reach signup API', message: String(err) },
      { status: 502 }
    );
  }
}
