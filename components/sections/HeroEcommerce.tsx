"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroEcommerce() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-white pt-20">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black text-brand-black tracking-tight leading-[1.1] mb-6"
          >
            Power your <br />
            <span className="text-brand-blue">everyday.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-brand-graphite max-w-xl mx-auto md:mx-0 mb-10"
          >
            Chargeurs, câbles et supports pensés pour votre quotidien. Élégance et fiabilité à chaque branchement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Link
              href="/shop"
              className="px-8 py-4 bg-brand-black text-brand-white font-semibold rounded-full hover:bg-brand-graphite transition-all hover:scale-105 active:scale-95"
            >
              Découvrir la boutique
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-transparent border-2 border-brand-black text-brand-black font-semibold rounded-full hover:bg-brand-gray transition-all"
            >
              Découvrir Nestcase
            </Link>
          </motion.div>
        </div>

        {/* Image / Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 w-full max-w-lg aspect-square relative rounded-3xl overflow-hidden shadow-2xl bg-brand-gray flex items-center justify-center"
        >
          {/* Placeholder for real product image */}
          <div className="text-brand-graphite text-center">
            <span className="block text-4xl mb-4">⚡</span>
            <span className="font-semibold text-lg">Visuel Produit Premium</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
