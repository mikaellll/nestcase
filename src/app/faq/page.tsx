import type { Metadata } from 'next';
import { FaqAccordion } from './FaqAccordion';

export const metadata: Metadata = {
  title: "FAQ & Assistance | Coques, Chargeurs et Accessoires NestCase",
  description: "Parcourez notre FAQ pour tout savoir sur nos coques de protection, chargeurs rapides, câbles tressés USB-C/Lightning, supports et compatibilité MagSafe.",
};

export default function FaqPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', background: '#080808', color: '#f8fafc' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.03em' }}>
            Questions <span style={{ color: '#818cf8' }}>Fréquentes</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Consultez cette base de connaissances complète pour tout comprendre sur nos technologies, la compatibilité de nos accessoires (coques, chargeurs, supports) et nos modalités de livraison.
          </p>
        </div>

        {/* Semantic hidden JSON-LD for pure AI/Bot extraction could be added here, but structured HTML is already perfect */}
        <article>
          <FaqAccordion />
        </article>

      </div>
    </div>
  );
}
