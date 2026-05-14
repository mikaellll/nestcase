'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useCartStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { SHIPPING_FLAT, SHIPPING_THRESHOLD } from '@/lib/checkout-server';

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

export function CheckoutClient() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, hydrated } = useAuthStore();
  const [email, setEmail] = useState('');
  const [stripeLoading, setStripeLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && user?.email) setEmail((e) => e || user.email);
  }, [hydrated, user?.email]);

  const subtotal = totalPrice();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const payloadItems = useMemo(
    () =>
      items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        color: i.selectedColor,
      })),
    [items]
  );

  async function payStripe() {
    setMessage(null);
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Indiquez une adresse e-mail valide pour continuer.');
      return;
    }
    setStripeLoading(true);
    try {
      const res = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payloadItems, email: email.trim() }),
      });
      const data = (await res.json()) as { url?: string; error?: string; message?: string };
      if (!res.ok) {
        if (data.error === 'STRIPE_NOT_CONFIGURED') {
          setMessage('Stripe n’est pas encore configuré (STRIPE_SECRET_KEY manquant).');
        } else {
          setMessage(data.message ?? 'Paiement par carte indisponible pour le moment.');
        }
        return;
      }
      if (data.url) window.location.href = data.url;
    } finally {
      setStripeLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', padding: '120px 24px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
        <h1 style={{ color: '#f8fafc', fontSize: '1.5rem', marginBottom: '12px' }}>Panier vide</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Ajoutez des articles avant de payer.</p>
        <Link href="/boutique" className="btn-primary" style={{ display: 'inline-flex', padding: '12px 24px', borderRadius: '14px' }}>
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 80px', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
        Paiement sécurisé
      </h1>
      <p style={{ color: '#64748b', marginBottom: '28px', maxWidth: '640px', lineHeight: 1.6 }}>
        {user
          ? `Vous êtes connecté en tant que ${user.name}. Vous pouvez modifier l’e-mail de confirmation ci-dessous si besoin.`
          : 'Achat en tant qu’invité : aucun compte n’est requis. Votre e-mail sert uniquement à la confirmation de commande.'}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px',
          alignItems: 'start',
        }}
        className="checkout-grid"
      >
        <style>{`
          @media (min-width: 900px) {
            .checkout-grid { grid-template-columns: 1fr 340px !important; }
          }
        `}</style>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 16px' }}>Contact</h2>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>E-mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: '#0d0d0d',
                  color: '#f8fafc',
                  fontSize: '0.95rem',
                }}
                placeholder="vous@exemple.fr"
              />
            </label>
            {!user && hydrated && (
              <p style={{ color: '#475569', fontSize: '0.8rem', marginTop: '14px', marginBottom: 0 }}>
                Vous préférez un compte ?{' '}
                <Link href="/inscription" style={{ color: '#818cf8' }}>
                  Créer un compte
                </Link>{' '}
                ou{' '}
                <Link href="/connexion" style={{ color: '#818cf8' }}>
                  se connecter
                </Link>
                .
              </p>
            )}
          </section>

          <section
            style={{
              padding: '24px',
              borderRadius: '20px',
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 8px' }}>Moyens de paiement</h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.5 }}>
              <strong style={{ color: '#94a3b8' }}>Carte bancaire, Apple Pay & Google Pay</strong> — redirection vers Stripe Checkout.
              Les portefeuilles Apple Pay et Google Pay apparaissent automatiquement sur la page Stripe lorsque votre navigateur et votre
              compte marchand le permettent (domaine vérifié dans le tableau de bord Stripe).
            </p>

            <button
              type="button"
              className="btn-primary"
              disabled={stripeLoading}
              onClick={() => void payStripe()}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                fontSize: '0.95rem',
                marginBottom: '16px',
              }}
            >
              {stripeLoading ? 'Redirection…' : 'Payer avec carte / Apple Pay / Google Pay'}
            </button>

            {paypalClientId ? (
              <div style={{ marginTop: '8px' }}>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '12px' }}>
                  <strong style={{ color: '#94a3b8' }}>PayPal</strong> — payez avec votre compte PayPal.
                </p>
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'EUR', intent: 'capture' }}>
                  <PayPalButtons
                    style={{ layout: 'vertical', shape: 'rect', label: 'paypal' }}
                    disabled={!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                    createOrder={async () => {
                      setMessage(null);
                      const res = await fetch('/api/checkout/paypal/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items: payloadItems, email: email.trim() }),
                      });
                      const data = (await res.json()) as { id?: string; error?: string; message?: string };
                      if (!res.ok) {
                        throw new Error(data.message ?? data.error ?? 'PayPal indisponible');
                      }
                      if (!data.id) throw new Error('Réponse PayPal invalide');
                      return data.id;
                    }}
                    onApprove={async (data) => {
                      const res = await fetch('/api/checkout/paypal/capture', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderID: data.orderID }),
                      });
                      if (!res.ok) {
                        setMessage('La capture PayPal a échoué. Réessayez ou utilisez la carte.');
                        return;
                      }
                      clearCart();
                      router.push('/paiement/reussi?provider=paypal');
                    }}
                    onError={() => {
                      setMessage('Erreur PayPal. Vérifiez la configuration ou réessayez.');
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <p style={{ color: '#475569', fontSize: '0.8rem', margin: 0 }}>
                PayPal : ajoutez <code style={{ color: '#818cf8' }}>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> et les clés serveur pour activer le bouton.
              </p>
            )}

            {message && (
              <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '16px', marginBottom: 0 }} role="alert">
                {message}
              </p>
            )}
          </section>
        </div>

        <aside
          style={{
            padding: '24px',
            borderRadius: '20px',
            background: '#0d0d0d',
            border: '1px solid rgba(255,255,255,0.06)',
            position: 'sticky',
            top: '100px',
          }}
        >
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 16px' }}>Récapitulatif</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {items.map((item, idx) => (
              <div key={`${item.product.id}-${item.selectedColor}-${idx}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden', background: '#222', flexShrink: 0 }}>
                  <Image src={item.product.image} alt="" width={52} height={52} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.product.name}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>× {item.quantity}</div>
                </div>
                <div style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem' }}>{(item.product.price * item.quantity).toFixed(2)} €</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span>Sous-total</span>
            <span style={{ color: '#f8fafc' }}>{subtotal.toFixed(2)} €</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.875rem', marginBottom: '16px' }}>
            <span>Livraison</span>
            <span style={{ color: shipping === 0 ? '#4ade80' : '#f8fafc' }}>{shipping === 0 ? 'Offerte' : `${shipping.toFixed(2)} €`}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: '1.1rem' }}>Total</span>
            <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: '1.25rem' }}>{total.toFixed(2)} €</span>
          </div>
          <Link href="/boutique" style={{ display: 'block', marginTop: '20px', color: '#64748b', fontSize: '0.85rem' }}>
            ← Continuer les achats
          </Link>
        </aside>
      </div>
    </div>
  );
}
