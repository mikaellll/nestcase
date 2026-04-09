'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, useCartStore } from '@/lib/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.colors[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link
      href={`/produit/${product.id}`}
      id={`product-card-${product.id}`}
      className="card-hover"
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.04)',
        position: 'relative',
      }}
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1',
          background: 'linear-gradient(145deg, #1f1f1f, #141414)',
          overflow: 'hidden',
        }}
      >
        <Image
          src={product.images[currentImageIdx] || product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-img"
        />

        {/* Carousel Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: 0.8,
                zIndex: 10,
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: 0.8,
                zIndex: 10,
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Overlay on hover */}
        <div
          className="card-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '16px',
          }}
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '12px',
              background: added ? '#22c55e' : (product.inStock ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#334155'),
              border: 'none',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
            }}
          >
            {product.inStock ? (
              <>
                <ShoppingBag size={14} />
                {added ? 'Ajouté ✓' : 'Ajouter au panier'}
              </>
            ) : (
              'Rupture de stock'
            )}
          </button>
        </div>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {product.badge && (
            <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="badge" style={{ fontSize: '0.65rem', padding: '3px 8px', background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Like button */}
        <button
          onClick={handleLike}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <Heart
            size={14}
            color={liked ? '#f43f5e' : '#94a3b8'}
            fill={liked ? '#f43f5e' : 'none'}
          />
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <p style={{ color: '#6366f1', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>
          {product.category}
        </p>
        <h3 style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', margin: '0 0 4px' }}>
          {product.name}
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0 0 12px' }}>{product.model}</p>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={11}
                fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'}
                color={s <= Math.round(product.rating) ? '#f59e0b' : '#475569'}
              />
            ))}
          </div>
          <span style={{ color: '#64748b', fontSize: '0.75rem' }}>({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#f8fafc', fontWeight: 800, fontSize: '1.1rem' }}>
            {product.price.toFixed(2)} €
          </span>
          {product.originalPrice && (
            <span style={{ color: '#475569', fontSize: '0.85rem', textDecoration: 'line-through' }}>
              {product.originalPrice.toFixed(2)} €
            </span>
          )}
        </div>
      </div>

      <style>{`
        #product-card-${product.id}:hover .card-overlay { opacity: 1 !important; }
        #product-card-${product.id}:hover .product-img { transform: scale(1.04); }
      `}</style>
    </Link>
  );
}
