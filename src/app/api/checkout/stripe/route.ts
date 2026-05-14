import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateCartItems, type ClientLineItem } from '@/lib/checkout-server';

function baseUrl(req: Request): string {
  const env = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
  if (env) return env;
  const host = req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') ?? 'http';
  if (host) return `${proto}://${host}`;
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://nestcase.com';
}

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: 'STRIPE_NOT_CONFIGURED' }, { status: 503 });
  }

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

  const stripe = new Stripe(key);

  const lineItems = validated.lines.map((line) => ({
    quantity: line.quantity,
    price_data: {
      currency: 'eur',
      unit_amount: Math.round(line.unitPrice * 100),
      product_data: {
        name: line.name,
        description: `Couleur : ${line.color}`,
      },
    },
  }));

  if (validated.shipping > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(validated.shipping * 100),
        product_data: { name: 'Livraison', description: 'Frais de port' },
      },
    });
  }

  const origin = baseUrl(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      success_url: `${origin}/paiement/reussi?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/paiement/annule`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'DE', 'ES', 'IT', 'PT', 'NL'],
      },
      phone_number_collection: { enabled: true },
      payment_method_types: ['card', 'link'],
    });

    if (!session.url) {
      return NextResponse.json({ error: 'NO_CHECKOUT_URL' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Stripe error';
    return NextResponse.json({ error: 'STRIPE_ERROR', message }, { status: 502 });
  }
}
