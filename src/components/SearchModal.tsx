'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import { Product } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery('');
       
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q)
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(filtered.slice(0, 5));
    } else {
       
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 16px 16px',
      }}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal */}
      <div
        id="search-modal"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: query ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}
        >
          <Search size={20} color="#6366f1" />
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            placeholder="Rechercher une coque, un modèle..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '1rem',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                color: '#64748b',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              color: '#64748b',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '0.8rem',
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid #2a2a2a',
            }}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div style={{ padding: '8px' }}>
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/produit/${product.id}`}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.1)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', background: '#1a1a1a', flexShrink: 0 }}>
                  <Image src={product.image} alt={product.name} width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.9rem' }}>{product.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{product.model} · {product.category}</div>
                </div>
                <div style={{ color: '#818cf8', fontWeight: 700 }}>{product.price.toFixed(2)} €</div>
                <ArrowRight size={16} color="#64748b" />
              </Link>
            ))}

            <Link
              href={`/boutique?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                margin: '8px 0',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#818cf8',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              Voir tous les résultats <ArrowRight size={14} />
            </Link>
          </div>
        ) : query ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
            <Search size={32} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.3 }} />
            <p>Aucun résultat pour &quot;{query}&quot;</p>
          </div>
        ) : (
          <div style={{ padding: '16px' }}>
            <p style={{ color: '#64748b', fontSize: '0.8rem', padding: '8px 12px', marginBottom: '8px' }}>Recherches populaires</p>
            {['iPhone 15 Pro', 'Cuir', 'Édition Limitée', 'MagSafe'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  margin: '4px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Search size={12} />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
