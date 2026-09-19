import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

import { getAuthUserId } from "@convex-dev/auth/server";

// Helper to get the current user based on Convex authentication
async function getCurrentUser(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) return null;
  return await ctx.db.get(userId);
}

export const createOrder = mutation({
  args: {
    orderNumber: v.string(),
    subtotal: v.number(),
    shipping: v.number(),
    total: v.number(),
    currency: v.string(),
    paymentProvider: v.union(v.literal("stripe"), v.literal("paypal")),
    paymentStatus: v.union(v.literal("pending"), v.literal("paid"), v.literal("failed"), v.literal("refunded")),
    orderStatus: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
      v.literal("refunded")
    ),
    shippingAddress: v.object({
      name: v.string(),
      street1: v.string(),
      street2: v.optional(v.string()),
      city: v.string(),
      state: v.optional(v.string()),
      postalCode: v.string(),
      country: v.string(),
    }),
    customerEmail: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
        priceAtTime: v.number(),
        name: v.string(),
      })
    ),
    paypalOrderId: v.optional(v.string()),
    stripeSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    
    // Insert order
    const orderId = await ctx.db.insert("orders", {
      userId: user?._id,
      orderNumber: args.orderNumber,
      subtotal: args.subtotal,
      shipping: args.shipping,
      total: args.total,
      currency: args.currency,
      paymentProvider: args.paymentProvider,
      paymentStatus: args.paymentStatus,
      orderStatus: args.orderStatus,
      shippingAddress: args.shippingAddress,
      customerEmail: args.customerEmail,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      paypalOrderId: args.paypalOrderId,
      stripeSessionId: args.stripeSessionId,
    });

    // Insert order items
    for (const item of args.items) {
      await ctx.db.insert("orderItems", {
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        priceAtTime: item.priceAtTime,
        name: item.name,
      });
    }

    return orderId;
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    paymentStatus: v.optional(v.union(v.literal("pending"), v.literal("paid"), v.literal("failed"), v.literal("refunded"))),
    orderStatus: v.optional(v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
      v.literal("refunded")
    )),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") throw new Error("Unauthorized");
    
    const updates: any = { updatedAt: Date.now() };
    if (args.paymentStatus) updates.paymentStatus = args.paymentStatus;
    if (args.orderStatus) updates.orderStatus = args.orderStatus;

    await ctx.db.patch(args.orderId, updates);
  },
});

export const getUserOrders = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await ctx.db
          .query("orderItems")
          .withIndex("by_order", (q) => q.eq("orderId", order._id))
          .collect();
        return { ...order, items };
      })
    );

    return ordersWithItems;
  },
});

export const getAllOrders = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    const orders = await ctx.db
      .query("orders")
      .order("desc")
      .collect();

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await ctx.db
          .query("orderItems")
          .withIndex("by_order", (q) => q.eq("orderId", order._id))
          .collect();
        return { ...order, items };
      })
    );

    return ordersWithItems;
  },
});
