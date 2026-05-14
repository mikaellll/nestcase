import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'nestcase_session';

export function getAuthSecret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) {
    throw new Error('AUTH_SECRET doit faire au moins 32 caractères (voir .env.example).');
  }
  return new TextEncoder().encode(s);
}

export async function signSession(email: string, name: string): Promise<string> {
  return new SignJWT({ name })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(email.toLowerCase().trim())
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(getAuthSecret());
}

export async function readSession(
  token: string | undefined
): Promise<{ email: string; name: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    const email = typeof payload.sub === 'string' ? payload.sub : null;
    if (!email) return null;
    const name = typeof payload.name === 'string' ? payload.name : '';
    return { email, name };
  } catch {
    return null;
  }
}

export const sessionCookieName = COOKIE_NAME;
