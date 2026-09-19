import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibilité | Nestcase",
  description: "Déclaration d'accessibilité de Nestcase. Notre engagement pour rendre le e-commerce accessible à tous.",
  alternates: {
    canonical: "/accessibility",
  }
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Accessibilité Numérique</h1>
        </div>

        <div className="space-y-12 prose prose-lg prose-headings:font-bold prose-headings:text-brand-black prose-p:text-brand-graphite max-w-none">
          
          <p>
            L'accessibilité web est au cœur de la conception de <strong>Nestcase</strong>. Nous pensons que le e-commerce doit être simple, fluide et accessible à tous les utilisateurs, quelles que soient leurs capacités.
          </p>

          <section>
            <h2>Nos engagements</h2>
            <p>
              Nous mettons tout en œuvre pour concevoir et développer notre boutique en respectant les standards d'accessibilité (WCAG 2.1). Nos actions incluent notamment :
            </p>
            <ul>
              <li><strong>Navigation au clavier :</strong> Tous les éléments interactifs (boutons, formulaires de paiement, filtres de produits) peuvent être parcourus et utilisés via la touche Tab.</li>
              <li><strong>Contraste des couleurs :</strong> Notre palette (Brand Black, Brand White, Brand Graphite) a été choisie pour offrir des contrastes élevés, facilitant la lecture pour les personnes malvoyantes.</li>
              <li><strong>Textes alternatifs :</strong> Toutes les images de nos produits sont accompagnées d'une balise <code>alt</code> descriptive afin de permettre aux lecteurs d'écran de retranscrire leur contenu.</li>
              <li><strong>Sémantique HTML :</strong> Nous utilisons un code HTML structuré (titres hiérarchiques, balises sémantiques <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, etc.) pour une navigation claire.</li>
            </ul>
          </section>

          <section>
            <h2>Limites actuelles</h2>
            <p>
              Bien que nous fassions de notre mieux, certains composants tiers (comme les modules de paiement embarqués de prestataires externes) peuvent parfois présenter des défis d'accessibilité indépendants de notre volonté.
            </p>
          </section>

          <section>
            <h2>Nous contacter</h2>
            <p>
              Si vous rencontrez des difficultés pour naviguer sur notre site, pour lire un contenu ou pour finaliser un achat, n'hésitez pas à nous contacter. Nous serons ravis de vous assister personnellement :
            </p>
            <ul>
              <li>Par email : <strong>[LEGAL_EMAIL]</strong></li>
              <li>Via notre <a href="/contact" className="text-brand-blue hover:underline">Formulaire de contact</a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
