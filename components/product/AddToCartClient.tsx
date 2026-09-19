"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";

type AddToCartProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
};

export default function AddToCartClient({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-4 px-4 py-3 border-2 border-brand-gray rounded-full">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-brand-graphite hover:text-brand-black transition-colors p-1"
          >
            <Minus size={20} />
          </button>
          <span className="font-semibold text-lg w-6 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="text-brand-graphite hover:text-brand-black transition-colors p-1"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="text-sm font-medium">
          {product.stock > 0 ? (
            <span className="text-green-600">En stock</span>
          ) : (
            <span className="text-red-500">Rupture de stock</span>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className={`w-full md:w-auto px-12 py-5 font-bold text-lg rounded-full transition-all flex items-center justify-center gap-2 ${
          product.stock === 0 
            ? "bg-brand-gray text-brand-graphite cursor-not-allowed" 
            : added 
              ? "bg-green-600 text-brand-white"
              : "bg-brand-black text-brand-white hover:bg-brand-graphite"
        }`}
      >
        {added ? (
          <><Check size={24} /> Ajouté</>
        ) : (
          "Ajouter au panier"
        )}
      </button>
    </>
  );
}
