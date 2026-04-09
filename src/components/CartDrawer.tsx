'use client';

import { useEffect } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const count = totalItems();
  const total = totalPrice();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1500,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Drawer */}
      <div
        id="cart-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1600,
          width: '100%',
          maxWidth: '420px',
          background: '#111111',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingBag size={22} color="#818cf8" />
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>Votre panier</h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                {count} {count === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>
          <button
            id="close-cart-btn"
            className="btn-icon"
            onClick={closeCart}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <ShoppingBag size={48} color="#2a2a2a" style={{ margin: '0 auto 16px', display: 'block' }} />
              <h3 style={{ color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>Panier vide</h3>
              <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '24px' }}>
                Ajoutez des produits pour commencer
              </p>
              <button onClick={closeCart} className="btn-primary" style={{ fontSize: '0.875rem' }}>
                <Link href="/boutique" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Voir la boutique <ArrowRight size={14} />
                </Link>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${index}`}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '16px',
                    background: '#1a1a1a',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {/* Image */}
                  <div style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#222' }}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={72}
                      height={72}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.9rem', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.product.name}
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0 0 12px' }}>
                      {item.product.model}
                    </p>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                          style={{
                            width: '28px', height: '28px', borderRadius: '8px',
                            background: '#2a2a2a', border: '1px solid #333',
                            color: '#94a3b8', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ color: '#f8fafc', fontWeight: 600, minWidth: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                          style={{
                            width: '28px', height: '28px', borderRadius: '8px',
                            background: '#2a2a2a', border: '1px solid #333',
                            color: '#94a3b8', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#818cf8', fontWeight: 700 }}>
                          {(item.product.price * item.quantity).toFixed(2)} €
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedColor)}
                          style={{
                            color: '#475569', background: 'none', border: 'none',
                            cursor: 'pointer', transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#ef4444')}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#475569')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: '#0d0d0d',
            }}
          >
            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Sous-total</span>
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>{total.toFixed(2)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Livraison</span>
              <span style={{ color: '#4ade80', fontWeight: 600, fontSize: '0.875rem' }}>
                {total >= 40 ? 'Gratuite 🎉' : `+4,99 €`}
              </span>
            </div>

            {total < 40 && (
              <div style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                marginBottom: '16px',
                fontSize: '0.8rem',
                color: '#818cf8',
              }}>
                Plus que {(40 - total).toFixed(2)} € pour la livraison offerte !
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 20px' }}>
              <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.1rem' }}>Total</span>
              <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: '1.1rem' }}>
                {(total >= 40 ? total : total + 4.99).toFixed(2)} €
              </span>
            </div>

            <button
              id="checkout-btn"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '0.95rem' }}
            >
              Commander maintenant <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
