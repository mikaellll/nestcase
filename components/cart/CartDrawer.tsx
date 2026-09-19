"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-gray">
              <h2 className="text-xl font-bold text-brand-black flex items-center gap-2">
                <ShoppingBag size={24} /> Mon Panier
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-brand-graphite hover:text-brand-black transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-graphite">
                  <ShoppingBag size={48} className="mb-4 opacity-50" />
                  <p className="text-lg">Votre panier est vide.</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2 bg-brand-black text-brand-white font-semibold rounded-full hover:bg-brand-graphite transition-all"
                  >
                    Continuer mes achats
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      {/* Image placeholder */}
                      <div className="w-24 h-24 bg-brand-gray rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-brand-graphite">Image</span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-brand-black">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-brand-graphite hover:text-red-500 transition-colors p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-brand-graphite mb-2">{(item.price / 100).toFixed(2)} €</p>
                        
                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-auto">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-full border border-brand-gray flex items-center justify-center text-brand-graphite hover:border-brand-black transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-brand-gray flex items-center justify-center text-brand-graphite hover:border-brand-black transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-gray bg-brand-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-brand-graphite">Sous-total</span>
                  <span className="text-xl font-bold text-brand-black">{(getCartTotal() / 100).toFixed(2)} €</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-4 bg-brand-black text-brand-white font-semibold rounded-full hover:bg-brand-graphite transition-all flex items-center justify-center gap-2"
                >
                  Passer à la caisse
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
