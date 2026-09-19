import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Nestcase",
  description: "Consultez les Conditions Générales de Vente (CGV) de la boutique Nestcase.",
  alternates: {
    canonical: "/terms",
  }
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Conditions Générales de Vente (CGV)</h1>
          <p className="text-lg text-brand-graphite">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        </div>

        <div className="space-y-12 prose prose-lg prose-headings:font-bold prose-headings:text-brand-black prose-p:text-brand-graphite max-w-none">
          
          <section>
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits (accessoires technologiques, chargeurs, câbles, supports) effectuées par <strong>[LEGAL_COMPANY_NAME]</strong> ("Nestcase") via le site internet <code>[SITE_URL]</code>. Toute commande implique l'acceptation sans réserve des présentes CGV par le client.
            </p>
          </section>

          <section>
            <h2>2. Produits et Disponibilité</h2>
            <p>
              Les caractéristiques essentielles de chaque produit sont présentées sur leur page respective. Les offres de produits sont valables tant qu'elles sont visibles sur le site, dans la limite des stocks disponibles. En cas d'indisponibilité après passation de votre commande, nous vous en informerons par email et vous rembourserons intégralement.
            </p>
          </section>

          <section>
            <h2>3. Prix</h2>
            <p>
              Les prix de nos produits sont indiqués en Euros (€) toutes taxes comprises (TTC), hors frais de livraison. Nestcase se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2>4. Commandes et Paiement</h2>
            <p>
              Le paiement est exigible immédiatement à la commande. Les règlements peuvent s'effectuer par carte bancaire via le système sécurisé Stripe, ou via PayPal. La commande n'est définitive qu'après confirmation de l'encaissement par nos prestataires de paiement.
            </p>
          </section>

          <section>
            <h2>5. Livraison</h2>
            <p>
              Les produits sont livrés à l'adresse de livraison indiquée lors de la commande. Pour le détail des tarifs et des délais, veuillez consulter notre page <a href="/shipping" className="text-brand-blue hover:underline">Livraison</a>. En cas de retard d'expédition, un email vous sera adressé.
            </p>
          </section>

          <section>
            <h2>6. Droit de rétractation et Retours</h2>
            <p>
              Le client dispose d'un délai légal de 14 jours pour exercer son droit de rétractation. Les détails et la marche à suivre sont précisés sur notre page <a href="/returns" className="text-brand-blue hover:underline">Retours</a>.
            </p>
          </section>

          <section>
            <h2>7. Garanties légales</h2>
            <p>
              Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés prévues par la loi européenne, pour une durée de 2 ans. Voir les détails sur la page <a href="/warranty" className="text-brand-blue hover:underline">Garantie</a>.
            </p>
          </section>

          <section>
            <h2>8. Litiges et Droit applicable</h2>
            <p>
              Les présentes CGV sont soumises à la loi du pays d'établissement de <strong>[LEGAL_COMPANY_NAME]</strong>. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. La plateforme européenne de règlement en ligne des litiges (RLL) est accessible via la Commission Européenne.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
