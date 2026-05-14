'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/lib/store';

function SuccessInner() {
  const clearCart = useCartStore((s) => s.clearCart);
  const params = useSearchParams();
  const provider = params.get('provider');

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(99,102,241,0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '2rem',
        }}
      >
        ✓
      </div>
      <h1 style={{ color: '#f8fafc', fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px' }}>Merci pour votre commande</h1>
      <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
        {provider === 'paypal'
          ? 'Votre paiement PayPal a été accepté. Vous recevrez un e-mail de confirmation sous peu.'
          : 'Votre paiement Stripe a été traité. Vous recevrez un e-mail de confirmation sous peu.'}
      </p>
      <Link href="/boutique" className="btn-primary" style={{ display: 'inline-flex', padding: '14px 28px', borderRadius: '14px' }}>
        Retour à la boutique
      </Link>
    </div>
  );
}

export default function PaiementReussiPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', padding: '120px 24px', color: '#64748b', textAlign: 'center' }}>Chargement…</div>}>
      <SuccessInner />
    </Suspense>
  );
}
