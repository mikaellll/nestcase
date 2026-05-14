import { NextResponse } from 'next/server';
import { validateCartItems, formatEurPayPal, type ClientLineItem } from '@/lib/checkout-server';
import { paypalCreateOrder } from '@/lib/paypal';

export async function POST(req: Request) {
  let body: { items?: ClientLineItem[]; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  const validated = validateCartItems(body.items ?? []);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const email = String(body.email ?? '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'EMAIL_REQUIRED' }, { status: 400 });
  }

  try {
    const value = formatEurPayPal(validated.total);
    const id = await paypalCreateOrder(value, email);
    return NextResponse.json({ id });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'PayPal error';
    if (message.includes('non configuré')) {
      return NextResponse.json({ error: 'PAYPAL_NOT_CONFIGURED' }, { status: 503 });
    }
    return NextResponse.json({ error: 'PAYPAL_ERROR', message }, { status: 502 });
  }
}
