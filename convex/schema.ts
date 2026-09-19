import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // Custom fields for Nestcase
    role: v.optional(v.union(v.literal("admin"), v.literal("customer"))),
    createdAt: v.optional(v.number()),
  }).index("email", ["email"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_slug", ["slug"]),

  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    shortDescription: v.optional(v.string()),
    price: v.number(), // in cents
    compareAtPrice: v.optional(v.number()),
    currency: v.string(),
    images: v.array(v.string()), // URLs or convex storage IDs
    categoryId: v.id("categories"),
    brand: v.optional(v.string()),
    sku: v.optional(v.string()),
    stock: v.number(),
    isActive: v.boolean(),
    isFeatured: v.boolean(),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"])
    .index("by_isActive", ["isActive"]),

  orders: defineTable({
    userId: v.optional(v.id("users")), // Optional for guest checkout
    stripeSessionId: v.optional(v.string()),
    paypalOrderId: v.optional(v.string()),
    orderNumber: v.string(),
    subtotal: v.number(), // in cents
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
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]).index("by_orderNumber", ["orderNumber"]),

  orderItems: defineTable({
    orderId: v.id("orders"),
    productId: v.id("products"),
    quantity: v.number(),
    priceAtTime: v.number(), // Price in cents at checkout
    name: v.string(),
  }).index("by_order", ["orderId"]),
});
