"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-brand-white/85 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="font-heading font-black text-2xl tracking-tighter text-brand-black">
            NESTCASE
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brand-graphite hover:text-brand-black font-medium transition-colors">
              Accueil
            </Link>
            <Link href="/shop" className="text-brand-graphite hover:text-brand-black font-medium transition-colors">
              Boutique
            </Link>
            <Link href="/about" className="text-brand-graphite hover:text-brand-black font-medium transition-colors">
              À propos
            </Link>
          </div>

          {/* Icons Menu */}
          <div className="hidden md:flex items-center space-x-6 text-brand-black">
            <button className="hover:text-brand-blue transition-colors">
              <Search size={20} />
            </button>
            <Link href="/account" className="hover:text-brand-blue transition-colors">
              <User size={20} />
            </Link>
            <button onClick={openCart} className="hover:text-brand-blue transition-colors relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-blue text-brand-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 text-brand-black">
            <button onClick={openCart} className="relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-blue text-brand-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-white border-t border-brand-gray shadow-lg">
            <div className="flex flex-col space-y-4 p-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-brand-black font-medium text-lg">
                Accueil
              </Link>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="text-brand-black font-medium text-lg">
                Boutique
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="text-brand-black font-medium text-lg">
                À propos
              </Link>
              <hr className="border-brand-gray" />
              <Link href="/account" onClick={() => setIsOpen(false)} className="text-brand-black font-medium text-lg flex items-center gap-2">
                <User size={20} /> Mon Compte
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
