import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique des Cookies | Nestcase",
  description: "Informations sur l'utilisation des cookies sur la boutique Nestcase.",
  alternates: {
    canonical: "/cookies",
  }
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Politique des Cookies</h1>
          <p className="text-lg text-brand-graphite">Gérez vos préférences de navigation sur Nestcase.</p>
        </div>

        <div className="space-y-12 prose prose-lg prose-headings:font-bold prose-headings:text-brand-black prose-p:text-brand-graphite max-w-none">
          
          <p>
            Lors de votre visite sur le site de <strong>Nestcase</strong>, des cookies (ou traceurs) peuvent être déposés sur votre terminal (ordinateur, tablette ou smartphone). Cette page vous permet de comprendre ce qu'est un cookie, à quoi il sert, et comment vous pouvez le paramétrer.
          </p>

          <section>
            <h2>1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site internet. Il a pour but de collecter des informations relatives à votre navigation et de vous adresser des services personnalisés (comme mémoriser votre panier ou vous garder connecté).
            </p>
          </section>

          <section>
            <h2>2. Les catégories de cookies utilisées</h2>
            
            <h3>Cookies strictement nécessaires (Toujours actifs)</h3>
            <p>Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. Ils incluent :</p>
            <ul>
              <li><strong>Authentication (Clerk) :</strong> Pour maintenir votre session sécurisée.</li>
              <li><strong>Panier et Checkout (Convex / Stripe) :</strong> Pour mémoriser les articles que vous souhaitez acheter.</li>
              <li><strong>Préférences de cookies :</strong> Pour mémoriser vos choix concernant les traceurs.</li>
            </ul>

            <h3>Cookies de Performance et d'Analytics (Soumis au consentement)</h3>
            <p>Ces cookies nous permettent de comprendre comment les visiteurs interagissent avec notre site, afin d'en améliorer l'ergonomie et les performances.</p>
            <ul>
              <li><strong>Vercel Web Analytics :</strong> Mesure d'audience anonymisée (pages vues, temps passé).</li>
            </ul>

            <h3>Cookies de Marketing (Soumis au consentement)</h3>
            <p>Nous n'utilisons actuellement <strong>aucun</strong> cookie de ciblage publicitaire intrusif.</p>
          </section>

          <section>
            <h2>3. Gestion de vos préférences</h2>
            <p>
              Vous pouvez à tout moment modifier ou retirer votre consentement via le gestionnaire de cookies accessible dans le pied de page du site ("Cookie Settings"). 
              Vous pouvez également configurer votre navigateur pour bloquer l'ensemble des cookies, mais cela risque de bloquer des fonctionnalités essentielles comme le passage en caisse.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
