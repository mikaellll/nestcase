import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readSession, sessionCookieName } from '@/lib/session';

export async function GET() {
  const token = (await cookies()).get(sessionCookieName)?.value;
  let session: { email: string; name: string } | null = null;
  try {
    session = await readSession(token);
  } catch {
    return NextResponse.json({ user: null });
  }
  if (!session) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({
    user: { email: session.email, name: session.name },
  });
}
