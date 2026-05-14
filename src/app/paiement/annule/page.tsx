import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Paiement annulé',
  description: 'Vous avez annulé le paiement.',
};

export default function PaiementAnnulePage() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
      <h1 style={{ color: '#f8fafc', fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px' }}>Paiement annulé</h1>
      <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
        Aucun montant n’a été débité. Vous pouvez reprendre votre panier quand vous voulez.
      </p>
      <Link href="/checkout" className="btn-primary" style={{ display: 'inline-flex', padding: '14px 28px', borderRadius: '14px', marginRight: '12px' }}>
        Retour au paiement
      </Link>
      <Link href="/boutique" style={{ display: 'inline-flex', padding: '14px 28px', borderRadius: '14px', color: '#64748b' }}>
        Boutique
      </Link>
    </div>
  );
}
