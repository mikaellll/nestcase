import { NextResponse } from 'next/server';
import { createUserRecord } from '@/lib/users';
import { sessionCookieName, signSession } from '@/lib/session';

export async function POST(req: Request) {
  let body: { email?: string; password?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  const email = String(body.email ?? '').trim();
  const password = String(body.password ?? '');
  const name = String(body.name ?? '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'INVALID_EMAIL' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'WEAK_PASSWORD' }, { status: 400 });
  }

  const created = await createUserRecord(email, password, name);
  if (!created.ok) {
    return NextResponse.json({ error: 'EMAIL_TAKEN' }, { status: 409 });
  }

  let token: string;
  try {
    token = await signSession(email, name || (email.split('@')[0] ?? 'Client'));
  } catch {
    return NextResponse.json({ error: 'AUTH_MISCONFIGURED' }, { status: 503 });
  }

  const res = NextResponse.json({
    user: { email: email.toLowerCase(), name: name || (email.split('@')[0] ?? 'Client') },
  });
  res.cookies.set(sessionCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
