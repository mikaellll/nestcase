import { NextResponse } from "next/server";
import Stripe from "stripe";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_fallback", {
  apiVersion: "2026-08-26.dahlia" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_fallback";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Note: You must configure your Convex Next.js integration properly
      // to use fetchMutation from a route handler.
      // E.g., setting NEXT_PUBLIC_CONVEX_URL in your env.
      
      // Update order status in Convex
      // await fetchMutation(api.orders.updateOrderStatus, {
      //   stripeSessionId: session.id,
      //   paymentStatus: "paid",
      //   orderStatus: "processing"
      // });
      
      console.log(`✅ Session complétée : ${session.id}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
