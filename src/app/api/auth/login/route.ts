import { NextResponse } from 'next/server';
import { findUser, verifyUserPassword } from '@/lib/users';
import { sessionCookieName, signSession } from '@/lib/session';

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  const email = String(body.email ?? '').trim();
  const password = String(body.password ?? '');
  if (!email || !password) {
    return NextResponse.json({ error: 'INVALID_CREDENTIALS' }, { status: 400 });
  }

  const user = await findUser(email);
  if (!user || !(await verifyUserPassword(user, password))) {
    return NextResponse.json({ error: 'INVALID_CREDENTIALS' }, { status: 401 });
  }

  let token: string;
  try {
    token = await signSession(user.email, user.name);
  } catch {
    return NextResponse.json({ error: 'AUTH_MISCONFIGURED' }, { status: 503 });
  }

  const res = NextResponse.json({
    user: { email: user.email, name: user.name },
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
