import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retours et Remboursements | Nestcase",
  description: "Consultez la politique de retour de Nestcase. Vous disposez de 14 jours pour retourner un produit qui ne vous convient pas.",
  alternates: {
    canonical: "/returns",
  }
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Retours & Remboursements</h1>
          <p className="text-lg text-brand-graphite">Les conditions et la procédure pour retourner un article Nestcase.</p>
        </div>

        <div className="space-y-12 prose prose-lg prose-headings:font-bold prose-headings:text-brand-black prose-p:text-brand-graphite max-w-none">
          
          <section>
            <h2>Délai de rétractation</h2>
            <p>Conformément à la législation européenne, vous disposez d'un délai de <strong>14 jours calendaires</strong> à compter de la date de réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités (à l'exception des frais de retour).</p>
          </section>

          <section>
            <h2>Conditions de retour</h2>
            <p>Pour être éligible à un retour, votre article doit :</p>
            <ul>
              <li>Être dans le même état que celui dans lequel vous l'avez reçu (non utilisé, non rayé).</li>
              <li>Être renvoyé dans son emballage d'origine intact, incluant tous les accessoires et manuels.</li>
              <li>Être accompagné de la preuve d'achat (numéro de commande).</li>
            </ul>
            <p>Les articles endommagés par l'utilisateur ou dont l'emballage est détérioré de manière déraisonnable pourront subir une décote sur le remboursement.</p>
          </section>

          <section>
            <h2>Procédure de retour</h2>
            <ol>
              <li>Rendez-vous sur notre page <Link href="/contact" className="text-brand-blue hover:underline">Contact</Link>.</li>
              <li>Sélectionnez le sujet "Demande de retour / SAV" et précisez votre numéro de commande.</li>
              <li>Notre service client vous transmettra les instructions ainsi qu'un bordereau de retour sous 24 à 48h.</li>
              <li>Emballez soigneusement le produit et déposez-le au point relais ou bureau de poste indiqué.</li>
            </ol>
          </section>

          <section>
            <h2>Frais de retour</h2>
            <p>Dans le cas d'une rétractation classique (changement d'avis), les frais de retour sont à la charge du client. Si le retour fait suite à une erreur de notre part (produit incorrect) ou à un produit défectueux à la réception, Nestcase prendra intégralement en charge les frais de retour.</p>
          </section>

          <section>
            <h2>Remboursements</h2>
            <p>Une fois votre retour reçu et inspecté par notre entrepôt, nous vous enverrons un email pour vous notifier de l'approbation ou du refus de votre remboursement. En cas d'approbation, le remboursement sera traité automatiquement sur le moyen de paiement utilisé lors de la commande, sous <strong>5 à 10 jours ouvrés</strong> selon votre banque.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
