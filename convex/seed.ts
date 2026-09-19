import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Categories
    const chargersId = await ctx.db.insert("categories", {
      name: "Chargeurs",
      slug: "chargeurs",
      description: "Chargeurs rapides et intelligents.",
      isActive: true,
    });
    const cablesId = await ctx.db.insert("categories", {
      name: "Câbles",
      slug: "cables",
      description: "Câbles ultra-résistants.",
      isActive: true,
    });
    const mountsId = await ctx.db.insert("categories", {
      name: "Supports téléphone",
      slug: "supports-telephone",
      description: "Supports magnétiques et ajustables.",
      isActive: true,
    });

    const now = Date.now();

    // 2. Products - Chargers
    await ctx.db.insert("products", {
      name: "Nestcase Power 20W",
      slug: "nestcase-power-20w",
      description: "Chargeur rapide 20W compact, idéal pour les déplacements.",
      shortDescription: "Chargeur rapide 20W",
      price: 1990, // 19.90€
      currency: "EUR",
      images: ["https://placehold.co/600x600/0B0D0F/FFF?text=Power+20W"],
      categoryId: chargersId,
      brand: "Nestcase",
      stock: 50,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });
    
    await ctx.db.insert("products", {
      name: "Nestcase Power 35W",
      slug: "nestcase-power-35w",
      description: "Chargeur double port 35W, chargez votre téléphone et votre tablette en même temps.",
      shortDescription: "Chargeur double port 35W",
      price: 3490, // 34.90€
      compareAtPrice: 3990,
      currency: "EUR",
      images: ["https://placehold.co/600x600/0B0D0F/FFF?text=Power+35W"],
      categoryId: chargersId,
      brand: "Nestcase",
      stock: 30,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("products", {
      name: "Nestcase Power 65W",
      slug: "nestcase-power-65w",
      description: "La puissance ultime. Chargeur 65W capable de charger un ordinateur portable.",
      shortDescription: "Chargeur ultra rapide 65W",
      price: 4990,
      currency: "EUR",
      images: ["https://placehold.co/600x600/0B0D0F/FFF?text=Power+65W"],
      categoryId: chargersId,
      brand: "Nestcase",
      stock: 15,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    // 3. Products - Cables
    await ctx.db.insert("products", {
      name: "Nestcase USB-C 1m",
      slug: "nestcase-usb-c-1m",
      description: "Câble tressé ultra-résistant de 1 mètre.",
      shortDescription: "Câble USB-C 1m",
      price: 1490,
      currency: "EUR",
      images: ["https://placehold.co/600x600/0B0D0F/FFF?text=Cable+USB-C+1m"],
      categoryId: cablesId,
      brand: "Nestcase",
      stock: 100,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("products", {
      name: "Nestcase USB-C to Lightning",
      slug: "nestcase-usb-c-to-lightning",
      description: "Câble pour appareils Apple, certifié MFi.",
      shortDescription: "Câble Lightning",
      price: 1990,
      currency: "EUR",
      images: ["https://placehold.co/600x600/0B0D0F/FFF?text=Cable+Lightning"],
      categoryId: cablesId,
      brand: "Nestcase",
      stock: 75,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    // 4. Products - Mounts
    await ctx.db.insert("products", {
      name: "Nestcase Desk Stand",
      slug: "nestcase-desk-stand",
      description: "Support de bureau élégant en aluminium.",
      shortDescription: "Support Bureau",
      price: 2990,
      currency: "EUR",
      images: ["https://placehold.co/600x600/0B0D0F/FFF?text=Desk+Stand"],
      categoryId: mountsId,
      brand: "Nestcase",
      stock: 40,
      isActive: true,
      isFeatured: true,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("products", {
      name: "Nestcase Magnetic Stand",
      slug: "nestcase-magnetic-stand",
      description: "Support magnétique avec charge sans fil intégrée.",
      shortDescription: "Support Magnétique",
      price: 5990,
      currency: "EUR",
      images: ["https://placehold.co/600x600/0B0D0F/FFF?text=Magnetic+Stand"],
      categoryId: mountsId,
      brand: "Nestcase",
      stock: 20,
      isActive: true,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});
