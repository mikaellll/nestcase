import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import AddToCartClient from "@/components/product/AddToCartClient";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { JsonLd, generateProductSchema } from "@/components/seo/JsonLd";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nestcase.vercel.app";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await fetchQuery(api.products.getProductBySlug, { slug: resolvedParams.slug });
  
  if (!product) {
    return { title: 'Produit introuvable | Nestcase' };
  }

  return {
    title: `${product.name} | Nestcase`,
    description: product.description.substring(0, 160),
    alternates: {
      canonical: `/shop/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Nestcase`,
      description: product.description.substring(0, 160),
      images: [product.images[0]],
      url: `${siteUrl}/shop/${product.slug}`,
      type: 'website',
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = await fetchQuery(api.products.getProductBySlug, { slug: resolvedParams.slug });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-24 bg-brand-white">
      <JsonLd data={generateProductSchema({
        name: product.name,
        description: product.description,
        image: product.images[0],
        price: product.price / 100,
        url: `${siteUrl}/shop/${product.slug}`,
        brand: "Nestcase"
      })} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[
          { name: "Boutique", href: "/shop" },
          { name: product.name }
        ]} />

        <div className="flex flex-col lg:flex-row gap-16 mt-8">
          {/* Gallery */}
          <div className="flex-1">
            <div className="aspect-square bg-brand-gray rounded-3xl overflow-hidden mb-4">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-brand-black mb-6">
              {(product.price / 100).toFixed(2)} €
            </p>
            
            <div className="prose prose-lg text-brand-graphite mb-8">
              <p>{product.description}</p>
            </div>

            <AddToCartClient product={product} />

            {/* Trust Elements */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-brand-gray">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={32} className="text-brand-black mb-3" />
                <h4 className="font-bold text-brand-black text-sm mb-1">Garantie 2 ans</h4>
                <p className="text-xs text-brand-graphite">Sur tous nos produits</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck size={32} className="text-brand-black mb-3" />
                <h4 className="font-bold text-brand-black text-sm mb-1">Expédié sous 24h</h4>
                <p className="text-xs text-brand-graphite">Depuis l'Europe</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw size={32} className="text-brand-black mb-3" />
                <h4 className="font-bold text-brand-black text-sm mb-1">Retours simples</h4>
                <p className="text-xs text-brand-graphite">14 jours pour changer d'avis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
