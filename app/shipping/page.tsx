import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison | Nestcase",
  description: "Découvrez nos politiques de livraison pour l'Europe. Délais, tarifs et suivi de commande Nestcase.",
  alternates: {
    canonical: "/shipping",
  }
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Livraison</h1>
          <p className="text-lg text-brand-graphite">Tout ce que vous devez savoir sur l'expédition de vos commandes Nestcase.</p>
        </div>

        <div className="space-y-12 prose prose-lg prose-headings:font-bold prose-headings:text-brand-black prose-p:text-brand-graphite max-w-none">
          
          <section>
            <h2>Zones de livraison</h2>
            <p>Nestcase livre actuellement dans l'ensemble de l'Union Européenne. Les livraisons vers les DOM-TOM ou en dehors de l'Europe ne sont pas encore disponibles, mais nous y travaillons activement.</p>
          </section>

          <section>
            <h2>Frais et délais</h2>
            <p>Toutes nos commandes sont préparées et expédiées sous <strong>24 heures ouvrées</strong> depuis notre centre logistique européen.</p>
            <ul>
              <li><strong>Livraison Standard (3 à 5 jours)</strong> : 5,90 €</li>
              <li><strong>Livraison Standard</strong> : GRATUITE pour toute commande supérieure à 50 €</li>
            </ul>
          </section>

          <section>
            <h2>Suivi de commande</h2>
            <p>Dès que votre commande quitte notre entrepôt, vous recevrez un email contenant un lien de suivi. Vous pouvez également retrouver l'état de votre livraison directement depuis la section <strong>Mes Commandes</strong> dans votre Espace Client.</p>
          </section>

          <section>
            <h2>Problèmes de livraison</h2>
            <p>Malgré tout le soin apporté à la préparation de vos colis, des incidents peuvent survenir :</p>
            <ul>
              <li><strong>Colis endommagé</strong> : Si votre colis arrive ouvert ou fortement abîmé, refusez-le auprès du livreur ou prenez des photos avant ouverture. Contactez-nous sous 48h.</li>
              <li><strong>Adresse incorrecte</strong> : Si vous constatez une erreur dans l'adresse de livraison après validation de la commande, contactez-nous immédiatement via la page Contact. Si le colis est déjà expédié, des frais de réexpédition pourront être appliqués.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
