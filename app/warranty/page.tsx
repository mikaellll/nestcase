import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Garantie Commerciale | Nestcase",
  description: "Découvrez la garantie applicable sur tous nos produits Nestcase. Nous concevons nos chargeurs et accessoires pour durer.",
  alternates: {
    canonical: "/warranty",
  }
};

export default function WarrantyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Garantie Nestcase</h1>
          <p className="text-lg text-brand-graphite">Notre engagement sur la qualité et la durabilité de nos accessoires.</p>
        </div>

        <div className="space-y-12 prose prose-lg prose-headings:font-bold prose-headings:text-brand-black prose-p:text-brand-graphite max-w-none">
          
          <section>
            <h2>Durée de la garantie</h2>
            <p>Conformément à la garantie légale de conformité en vigueur dans l'Union Européenne, l'ensemble de nos produits Nestcase (chargeurs, câbles, supports) bénéficie d'une garantie de <strong>2 ans (24 mois)</strong> à compter de la date de livraison du produit.</p>
          </section>

          <section>
            <h2>Ce que couvre la garantie</h2>
            <p>Notre garantie couvre exclusivement les défauts de fabrication et les pannes matérielles survenant dans le cadre d'une utilisation normale et conforme aux spécifications du produit. Cela inclut :</p>
            <ul>
              <li>Les défauts électroniques internes (composants défaillants sur un chargeur).</li>
              <li>Les défauts structurels anormaux non liés à l'usure (détachement inexpliqué d'un connecteur de câble).</li>
            </ul>
          </section>

          <section>
            <h2>Exclusions de garantie</h2>
            <p>La garantie Nestcase ne s'applique pas dans les cas suivants :</p>
            <ul>
              <li>L'usure normale du produit (ex: rayures, décoloration, effilochage cosmétique d'un câble après plusieurs mois d'usage).</li>
              <li>Les dommages accidentels (chutes, chocs, écrasements).</li>
              <li>Les dommages causés par l'exposition à des liquides ou à une humidité excessive.</li>
              <li>L'utilisation avec des équipements non conformes ou défectueux (ex: branchement sur une prise murale défaillante ayant causé un court-circuit).</li>
              <li>Toute modification ou tentative de réparation par l'utilisateur ou un tiers non autorisé.</li>
            </ul>
          </section>

          <section>
            <h2>Comment faire jouer la garantie ?</h2>
            <ol>
              <li>Assurez-vous que votre produit est toujours couvert par la période de garantie de 2 ans.</li>
              <li>Rendez-vous sur notre page <Link href="/contact" className="text-brand-blue hover:underline">Contact</Link>.</li>
              <li>Sélectionnez le sujet "Demande de retour / SAV" et fournissez une description détaillée du problème.</li>
              <li>Joignez (ou préparez) impérativement une photo ou une courte vidéo du défaut constaté.</li>
              <li>Précisez votre numéro de commande initial (la preuve d'achat est obligatoire).</li>
            </ol>
            <p>Si votre réclamation est valide, nous procéderons à notre discrétion au remplacement de l'article par un produit identique (ou équivalent si la référence n'est plus produite) ou à un remboursement.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
