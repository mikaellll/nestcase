import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Nestcase",
  description: "Découvrez Nestcase, notre vision, notre philosophie et notre ambition. Des accessoires technologiques pensés pour votre quotidien.",
  alternates: {
    canonical: "/about",
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-brand-black tracking-tight mb-6">
            Technology that fits your everyday.
          </h1>
          <p className="text-xl text-brand-graphite max-w-2xl mx-auto">
            Nestcase crée des accessoires de recharge et de mobilité pensés pour s'intégrer parfaitement à votre vie.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-brand-black mb-4">Notre vision</h2>
            <p className="text-lg text-brand-graphite leading-relaxed">
              Dans un monde hyper-connecté, manquer de batterie ou avoir un espace de travail désorganisé ne devrait plus être une préoccupation. Nestcase existe pour apporter des solutions d'alimentation et de maintien qui sont à la fois extrêmement performantes, compactes et élégantes. Nous pensons que la technologie doit vous servir, pas vous ralentir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mb-6">Notre philosophie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: "Simplicité", desc: "Des designs épurés sans compromis sur la fonction." },
                { title: "Fiabilité", desc: "Construits pour durer et résister à votre quotidien." },
                { title: "Design", desc: "Pensés pour s'intégrer harmonieusement à votre intérieur." },
                { title: "Mobilité", desc: "Légers et compacts pour vous suivre partout." },
                { title: "Compatibilité", desc: "Des standards universels (USB-C, PD) pour tous vos appareils." },
                { title: "Durabilité", desc: "Des matériaux de qualité qui allongent la durée de vie." }
              ].map((item, idx) => (
                <div key={idx} className="bg-brand-gray/30 p-6 rounded-2xl border border-brand-gray">
                  <h3 className="font-bold text-brand-black mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-graphite">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mb-4">Nos produits</h2>
            <p className="text-lg text-brand-graphite leading-relaxed mb-6">
              Nous concevons une gamme complète d'accessoires essentiels :
            </p>
            <ul className="space-y-3 text-brand-graphite list-disc list-inside">
              <li><strong>Chargeurs :</strong> Rapides, compacts (technologie GaN) et multi-ports.</li>
              <li><strong>Câbles :</strong> Renforcés, durables et capables de supporter de hautes puissances.</li>
              <li><strong>Supports :</strong> Ergonomiques pour bureau et voiture.</li>
              <li><strong>Accessoires :</strong> Tout ce qu'il faut pour faciliter votre mobilité.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mb-4">Notre ambition</h2>
            <p className="text-lg text-brand-graphite leading-relaxed">
              Nestcase s'inscrit dans une démarche à long terme pour devenir la marque de référence européenne dans les accessoires technologiques du quotidien. Nous privilégions des conceptions durables, des partenaires industriels de confiance et un support client irréprochable.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
