import { NextResponse } from 'next/server';
import { paypalCaptureOrder } from '@/lib/paypal';

export async function POST(req: Request) {
  let body: { orderID?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  const orderID = String(body.orderID ?? '').trim();
  if (!orderID) {
    return NextResponse.json({ error: 'MISSING_ORDER' }, { status: 400 });
  }

  try {
    const { status } = await paypalCaptureOrder(orderID);
    return NextResponse.json({ ok: true, status });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'PayPal error';
    if (message.includes('non configuré')) {
      return NextResponse.json({ error: 'PAYPAL_NOT_CONFIGURED' }, { status: 503 });
    }
    return NextResponse.json({ error: 'PAYPAL_ERROR', message }, { status: 502 });
  }
}
