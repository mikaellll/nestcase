import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Nestcase",
  description: "Découvrez comment Nestcase protège vos données personnelles et respecte votre vie privée dans le cadre de vos achats en ligne.",
  alternates: {
    canonical: "/privacy",
  }
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Politique de Confidentialité</h1>
          <p className="text-lg text-brand-graphite">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        </div>

        <div className="space-y-12 prose prose-lg prose-headings:font-bold prose-headings:text-brand-black prose-p:text-brand-graphite max-w-none">
          
          <p>
            Chez <strong>Nestcase</strong>, nous attachons une grande importance à la protection de vos données personnelles. Cette politique explique quelles données nous collectons, comment nous les utilisons et quels sont vos droits, conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>

          <section>
            <h2>1. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul>
              <li><strong>Données d'identité :</strong> prénom, nom, adresse email (via notre système d'authentification sécurisé Clerk).</li>
              <li><strong>Données de livraison :</strong> adresse postale complète et numéro de téléphone, uniquement lors du passage en caisse.</li>
              <li><strong>Données de transaction :</strong> historique de vos commandes et articles achetés (gérés via notre base de données sécurisée Convex).</li>
              <li><strong>Données de paiement :</strong> les informations de carte bancaire sont traitées exclusivement par Stripe ou PayPal. <em>Nestcase ne stocke aucune donnée bancaire brute.</em></li>
              <li><strong>Données de navigation (Analytics) :</strong> adresse IP anonymisée, type de navigateur, pages visitées (via Vercel Web Analytics, sous réserve de votre consentement pour les cookies non essentiels).</li>
            </ul>
          </section>

          <section>
            <h2>2. Finalités du traitement</h2>
            <p>Vos données sont utilisées pour les finalités suivantes :</p>
            <ul>
              <li>Gestion et traitement de vos commandes (base légale : exécution du contrat).</li>
              <li>Service client et gestion des retours (base légale : exécution du contrat).</li>
              <li>Création et gestion de votre compte client (base légale : votre consentement).</li>
              <li>Prévention de la fraude lors des paiements (base légale : intérêt légitime).</li>
              <li>Analyse du trafic pour améliorer notre boutique (base légale : votre consentement via le bandeau cookie).</li>
            </ul>
          </section>

          <section>
            <h2>3. Destinataires des données</h2>
            <p>Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec nos sous-traitants de confiance dans le strict cadre de l'exécution de nos services :</p>
            <ul>
              <li><strong>Clerk :</strong> pour la gestion sécurisée de l'authentification.</li>
              <li><strong>Convex :</strong> pour l'hébergement de notre base de données cloud (commandes, catalogue).</li>
              <li><strong>Stripe / PayPal :</strong> pour le traitement des paiements.</li>
              <li><strong>Transporteurs :</strong> (ex: Colissimo, DHL) pour livrer votre commande.</li>
            </ul>
          </section>

          <section>
            <h2>4. Durée de conservation</h2>
            <p>Nous conservons vos données :</p>
            <ul>
              <li><strong>Données liées aux commandes :</strong> 10 ans pour répondre aux obligations comptables et fiscales.</li>
              <li><strong>Données du compte client :</strong> jusqu'à la suppression de votre compte, ou après 3 ans d'inactivité.</li>
              <li><strong>Données de navigation :</strong> 13 mois maximum après le dépôt du cookie.</li>
            </ul>
          </section>

          <section>
            <h2>5. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de portabilité et d'opposition au traitement de vos données. Pour exercer vos droits, vous pouvez nous contacter via notre page <a href="/contact" className="text-brand-blue hover:underline">Contact</a> ou directement par email à <strong>[LEGAL_EMAIL]</strong>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
