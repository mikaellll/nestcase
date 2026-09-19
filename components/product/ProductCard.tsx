"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/useCartStore";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  categoryName?: string;
  isFeatured?: boolean;
}

export default function ProductCard({ id, name, slug, price, image, categoryName, isFeatured }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    addItem({ id, name, price, image, quantity: 1 });
  };

  return (
    <Link href={`/shop/${slug}`} className="group block relative">
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-gray mb-4">
        {isFeatured && (
          <div className="absolute top-4 left-4 z-10 bg-brand-blue text-brand-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Nouveau
          </div>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-brand-black text-brand-white p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-blue shadow-lg"
          aria-label="Ajouter au panier"
        >
          <Plus size={20} />
        </button>
      </div>
      <div>
        {categoryName && <p className="text-sm text-brand-graphite mb-1">{categoryName}</p>}
        <h3 className="font-semibold text-brand-black text-lg mb-1">{name}</h3>
        <p className="font-bold text-brand-black">{(price / 100).toFixed(2)} €</p>
      </div>
    </Link>
  );
}
