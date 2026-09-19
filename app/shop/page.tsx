"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/product/ProductCard";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ShopPage() {
  const products = useQuery(api.products.getProducts);
  const categories = useQuery(api.products.getCategories);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  if (products === undefined || categories === undefined) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-brand-white">
        <Loader2 className="animate-spin text-brand-blue" size={48} />
      </div>
    );
  }

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.categoryId === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">La Boutique</h1>
          <p className="text-lg text-brand-graphite max-w-2xl">Découvrez notre gamme complète d'accessoires technologiques. Conçus pour la performance et la durabilité.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-brand-gray pb-6">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeCategory === "all" 
                ? "bg-brand-black text-brand-white" 
                : "bg-brand-gray text-brand-graphite hover:bg-brand-graphite hover:text-brand-white"
            }`}
          >
            Tous les produits
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat._id 
                  ? "bg-brand-black text-brand-white" 
                  : "bg-brand-gray text-brand-graphite hover:bg-brand-graphite hover:text-brand-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 text-brand-graphite">
            <p className="text-xl">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => {
              const category = categories.find(c => c._id === product.categoryId);
              return (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  image={product.images[0]}
                  categoryName={category?.name}
                  isFeatured={product.isFeatured}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
