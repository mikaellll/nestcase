"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/product/ProductCard";
import { Loader2, Search as SearchIcon } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const products = useQuery(api.products.getProducts);

  // Simple client-side search since Convex full-text search is not yet configured for this simple demo
  const searchResults = products?.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.description.toLowerCase().includes(query.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto mb-16 relative">
          <h1 className="sr-only">Rechercher un produit</h1>
          <div className="relative">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-graphite" size={24} />
            <input
              type="search"
              placeholder="Rechercher un chargeur, un câble..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-5 text-lg rounded-full border-2 border-brand-gray focus:outline-none focus:border-brand-black transition-colors shadow-sm"
              autoFocus
            />
          </div>
        </div>

        {products === undefined ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-blue" size={48} />
          </div>
        ) : (
          <div>
            {query.length > 0 && searchResults.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-brand-graphite mb-4">Aucun résultat pour "{query}"</p>
                <Link href="/shop" className="text-brand-blue hover:underline font-medium">Parcourir toute la boutique</Link>
              </div>
            ) : query.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {searchResults.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    image={product.images[0]}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-brand-graphite">Commencez à taper pour rechercher un produit.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
