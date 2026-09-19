import HeroEcommerce from "@/components/sections/HeroEcommerce";
import { JsonLd, generateOrganizationSchema, generateWebsiteSchema } from "@/components/seo/JsonLd";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nestcase.vercel.app";
  
  return (
    <>
      <JsonLd data={generateOrganizationSchema(siteUrl, "Nestcase")} />
      <JsonLd data={generateWebsiteSchema(siteUrl, "Nestcase")} />
      
      <main>
        <HeroEcommerce />
        
        {/* Featured Categories Carousel and Products will go here */}
        <section className="py-24 bg-brand-gray" aria-labelledby="categories-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="categories-heading" className="text-3xl font-bold text-brand-black mb-12">Catégories Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="bg-brand-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Chargeurs</h3>
                <p className="text-brand-graphite">Rapides et intelligents.</p>
              </article>
              <article className="bg-brand-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Câbles</h3>
                <p className="text-brand-graphite">Ultra-résistants.</p>
              </article>
              <article className="bg-brand-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Supports</h3>
                <p className="text-brand-graphite">Magnétiques et ajustables.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
