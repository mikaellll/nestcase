import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foire Aux Questions (FAQ) | Nestcase",
  description: "Trouvez les réponses à vos questions sur nos chargeurs, câbles, délais de livraison, retours et garanties Nestcase.",
  alternates: {
    canonical: "/faq",
  }
};

const faqs = [
  {
    category: "Produits",
    items: [
      { q: "Quelle puissance de chargeur choisir ?", a: "Pour un smartphone, un chargeur 20W ou 30W suffit généralement. Pour un ordinateur portable (MacBook, PC), nous recommandons notre gamme 65W ou plus." },
      { q: "Les câbles USB-C sont-ils compatibles avec tous les appareils ?", a: "Oui, l'USB-C est un standard universel. Assurez-vous cependant que la puissance du câble (ex: 60W, 100W) correspond aux capacités de votre chargeur et de votre appareil." },
      { q: "Les produits sont-ils compatibles avec les appareils Apple ?", a: "Absolument. Nos chargeurs fonctionnent parfaitement avec les iPhone, iPad et Mac. Vous aurez simplement besoin d'un câble USB-C vers Lightning pour les anciens modèles d'iPhone, ou USB-C vers USB-C pour l'iPhone 15 et ultérieurs." }
    ]
  },
  {
    category: "Livraison",
    id: "livraison",
    items: [
      { q: "Où Nestcase livre-t-il ?", a: "Nous livrons partout en Europe." },
      { q: "Quels sont les délais de livraison ?", a: "La préparation de commande prend 24h ouvrées. La livraison standard prend ensuite 3 à 5 jours ouvrés." },
      { q: "Combien coûte la livraison ?", a: "La livraison est de 5,90€, et est offerte pour toute commande supérieure à 50€." }
    ]
  },
  {
    category: "Retours",
    id: "retours",
    items: [
      { q: "Puis-je retourner un produit ?", a: "Oui, vous disposez de 14 jours après la réception de votre commande pour nous retourner un produit non utilisé dans son emballage d'origine." },
      { q: "Comment effectuer une demande de retour ?", a: "Rendez-vous sur la page Contact et sélectionnez 'Demande de retour / SAV' dans le sujet. Nous vous fournirons une étiquette de retour." }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Questions Fréquentes</h1>
          <p className="text-lg text-brand-graphite">Tout ce que vous devez savoir sur nos produits et nos services.</p>
        </div>

        <div className="space-y-12">
          {faqs.map((section, idx) => (
            <section key={idx} id={section.id || section.category.toLowerCase()}>
              <h2 className="text-2xl font-bold text-brand-black mb-6 pb-2 border-b border-brand-gray">
                {section.category}
              </h2>
              <div className="space-y-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-brand-gray/30 p-6 rounded-2xl">
                    <h3 className="font-bold text-brand-black text-lg mb-2">{item.q}</h3>
                    <p className="text-brand-graphite">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center bg-brand-gray/20 p-8 rounded-3xl border border-brand-gray">
          <h3 className="text-xl font-bold text-brand-black mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
          <p className="text-brand-graphite mb-6">Notre équipe est là pour vous aider.</p>
          <a href="/contact" className="inline-block px-8 py-4 bg-brand-black text-brand-white font-semibold rounded-full hover:bg-brand-graphite transition-all">
            Contactez-nous
          </a>
        </div>

      </div>
    </div>
  );
}
