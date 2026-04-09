'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight, Check, Minus, Plus, Info } from 'lucide-react';
import { Product, useCartStore } from '@/lib/store';
import { products } from '@/lib/products';
import { ProductCard } from './ProductCard';

interface Props {
  product: Product;
}

export function ProductDetailPage({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.image);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'avis'>('description');
  const { addItem } = useCartStore();

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const moreProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handlePrevImage = () => {
    const idx = product.images.indexOf(activeImg);
    const newIdx = idx <= 0 ? product.images.length - 1 : idx - 1;
    setActiveImg(product.images[newIdx]);
  };

  const handleNextImage = () => {
    const idx = product.images.indexOf(activeImg);
    const newIdx = idx >= product.images.length - 1 ? 0 : idx + 1;
    setActiveImg(product.images[newIdx]);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedColor);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const fakeReviews = [
    { name: 'Marie L.', rating: 5, date: 'Il y a 2 jours', text: 'Absolument magnifique ! La qualité dépasse mes attentes. Livraison ultra rapide.' },
    { name: 'Thomas B.', rating: 5, date: 'Il y a 1 semaine', text: 'Design impeccable, coque très solide. Je recommande les yeux fermés.' },
    { name: 'Sophie M.', rating: 4, date: 'Il y a 2 semaines', text: 'Très bonne coque, belle finition. Un peu plus de coloris serait appréciable.' },
  ];

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#818cf8')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#64748b')}
        >Accueil</Link>
        <ChevronLeft size={14} color="#475569" style={{ transform: 'rotate(180deg)' }} />
        <Link href="/boutique" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#818cf8')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#64748b')}
        >Boutique</Link>
        <ChevronLeft size={14} color="#475569" style={{ transform: 'rotate(180deg)' }} />
        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{product.name}</span>
      </div>

      {/* Main product section */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px 60px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
        className="product-detail-grid"
      >
        {/* Images */}
        <div>
          {/* Main image */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '1',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'linear-gradient(145deg, #1f1f1f, #141414)',
              marginBottom: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <Image
              src={activeImg}
              alt={product.name}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '16px',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.8)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '16px',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.8)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            {product.badge && (
              <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                <span className="badge badge-accent">{product.badge}</span>
              </div>
            )}
            <button
              onClick={() => setLiked(!liked)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={18} color={liked ? '#f43f5e' : 'white'} fill={liked ? '#f43f5e' : 'none'} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(img)}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: `2px solid ${activeImg === img ? '#6366f1' : 'rgba(255,255,255,0.08)'}`,
                    cursor: 'pointer',
                    padding: 0,
                    background: '#1a1a1a',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Image src={img} alt={`Vue ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>
            {product.category}
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px', lineHeight: 1.2 }}>
            {product.name}
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 16px' }}>Compatible : {product.model}</p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'} color={s <= Math.round(product.rating) ? '#f59e0b' : '#475569'} />
              ))}
            </div>
            <span style={{ color: '#f8fafc', fontWeight: 700 }}>{product.rating}</span>
            <span style={{ color: '#64748b', fontSize: '0.875rem' }}>({product.reviewCount} avis)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '28px' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc' }}>{product.price.toFixed(2)} €</span>
            {product.originalPrice && (
              <>
                <span style={{ color: '#475569', fontSize: '1.2rem', textDecoration: 'line-through' }}>
                  {product.originalPrice.toFixed(2)} €
                </span>
                <span className="badge" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          {/* Color picker */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
              Couleur sélectionnée
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: color === 'transparent' ? 'linear-gradient(135deg, #fff, #e2e8f0)' : color,
                    border: `3px solid ${selectedColor === color ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: selectedColor === color ? '0 0 0 2px rgba(99,102,241,0.3)' : 'none',
                  }}
                >
                  {selectedColor === color && <Check size={14} color="white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
              Quantité
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                id="qty-minus"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="btn-icon"
              >
                <Minus size={16} />
              </button>
              <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.1rem', minWidth: '32px', textAlign: 'center' }}>{qty}</span>
              <button
                id="qty-plus"
                onClick={() => setQty(qty + 1)}
                className="btn-icon"
              >
                <Plus size={16} />
              </button>
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                Total : <strong style={{ color: '#818cf8' }}>{(product.price * qty).toFixed(2)} €</strong>
              </span>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
            <button
              id="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn-primary"
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '1rem',
                borderRadius: '14px',
                background: added ? 'linear-gradient(135deg, #22c55e, #16a34a)' : (!product.inStock ? '#334155' : undefined),
                cursor: product.inStock ? 'pointer' : 'not-allowed',
                opacity: product.inStock ? 1 : 0.7,
              }}
            >
              {added ? (
                <><Check size={18} /> Ajouté au panier !</>
              ) : !product.inStock ? (
                <>Rupture temporaire</>
              ) : (
                <><ShoppingBag size={18} /> Ajouter au panier</>
              )}
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
            {[
              { icon: Shield, text: 'Protection MIL-STD' },
              { icon: Truck, text: 'Livraison 48h' },
              { icon: RotateCcw, text: 'Retours 30j' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.04)',
                  textAlign: 'center',
                }}
              >
                <Icon size={18} color="#6366f1" />
                <span style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: product.inStock ? '#22c55e' : '#ef4444', boxShadow: product.inStock ? '0 0 8px #22c55e' : '0 0 8px #ef4444' }} />
            <span style={{ color: product.inStock ? '#4ade80' : '#f87171', fontSize: '0.85rem', fontWeight: 600 }}>
              {product.inStock ? 'En stock — Expédié sous 24h' : 'En rupture de stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs: description, details, avis */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '32px', display: 'flex', gap: '0' }}>
          {(['description', 'details', 'avis'] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '14px 24px',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? '#6366f1' : 'transparent'}`,
                color: activeTab === tab ? '#f8fafc' : '#64748b',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                marginBottom: '-1px',
              }}
            >
              {tab === 'avis' ? `Avis (${product.reviewCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '720px' }}>
          {activeTab === 'description' && (
            <div>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1rem', marginBottom: '24px' }}>{product.description}</p>
              <h3 style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '16px', fontSize: '1rem' }}>
                <Info size={16} style={{ marginRight: '8px', verticalAlign: 'middle', color: '#6366f1' }} />
                Caractéristiques
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {product.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '0.9rem' }}>
                    <Check size={16} color="#6366f1" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'details' && (
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { label: 'Matériau', value: 'Polycarbonate premium' },
                { label: 'Compatibilité', value: product.model },
                { label: 'Protection', value: 'Bords surélevés +1.5mm' },
                { label: 'Poids', value: '18-24g' },
                { label: 'Garantie', value: '12 mois' },
                { label: 'Pays de fabrication', value: 'Conçu en France' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{label}</span>
                  <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.9rem' }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'avis' && (
            <div>
              {/* Summary */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', padding: '24px', background: '#1a1a1a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>{product.rating}</div>
                  <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', margin: '6px 0' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{product.reviewCount} avis</div>
                </div>
              </div>

              {/* Reviews */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {fakeReviews.map((review, i) => (
                  <div key={i} style={{ padding: '20px', background: '#1a1a1a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>
                          {review.name[0]}
                        </div>
                        <div>
                          <div style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.9rem' }}>{review.name}</div>
                          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{review.date}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} fill={s <= review.rating ? '#f59e0b' : 'none'} color={s <= review.rating ? '#f59e0b' : '#475569'} />
                        ))}
                      </div>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <div style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '32px' }}>
            Vous aimerez aussi
          </h2>
          <div className="product-grid">
            {(relatedProducts.length >= 2 ? relatedProducts : moreProducts).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
