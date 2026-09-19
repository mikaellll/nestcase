import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Nestcase",
  description: "Mentions légales de la boutique Nestcase.",
  alternates: {
    canonical: "/legal",
  }
};

export default function LegalPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-brand-black tracking-tight mb-4">Mentions Légales</h1>
        </div>

        <div className="space-y-12 prose prose-lg prose-headings:font-bold prose-headings:text-brand-black prose-p:text-brand-graphite max-w-none">
          
          <section>
            <h2>Éditeur du site</h2>
            <p>
              Le site <strong>[SITE_URL]</strong> est édité par :<br />
              <strong>Raison sociale :</strong> [LEGAL_COMPANY_NAME]<br />
              <strong>Forme juridique :</strong> [LEGAL_COMPANY_TYPE]<br />
              <strong>Capital social :</strong> [LEGAL_COMPANY_CAPITAL]<br />
              <strong>Siège social :</strong> [LEGAL_ADDRESS]<br />
              <strong>RCS :</strong> [REGISTRATION_NUMBER]<br />
              <strong>TVA Intracommunautaire :</strong> [VAT_NUMBER]
            </p>
          </section>

          <section>
            <h2>Directeur de la publication</h2>
            <p>
              <strong>[PUBLICATION_DIRECTOR_NAME]</strong>, en qualité de [PUBLICATION_DIRECTOR_TITLE].<br />
              Email : [LEGAL_EMAIL]
            </p>
          </section>

          <section>
            <h2>Hébergement</h2>
            <p>
              L'hébergement du site est assuré par :<br />
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789<br />
              États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">https://vercel.com</a>
            </p>
          </section>

          <section>
            <h2>Hébergement des bases de données</h2>
            <p>
              Nos bases de données (commandes, catalogue) sont hébergées par :<br />
              <strong>Convex Inc.</strong><br />
              <a href="https://convex.dev" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">https://convex.dev</a>
            </p>
          </section>

          <section>
            <h2>Propriété Intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
