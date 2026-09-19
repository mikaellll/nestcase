import { action } from "./_generated/server";
import { v } from "convex/values";
import Stripe from "stripe";

// Cast apiVersion to any to avoid TS mismatches with different Stripe SDK versions
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_fallback", {
  apiVersion: "2024-06-20" as any, 
});

export const createCheckoutSession = action({
  args: {
    items: v.array(
      v.object({
        id: v.string(), // Product ID
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = args.items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    // Add shipping cost if applicable
    const subtotal = args.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (subtotal < 5000) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Frais de livraison",
          },
          unit_amount: 590, // 5.90€
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    });

    return session.url;
  },
});
