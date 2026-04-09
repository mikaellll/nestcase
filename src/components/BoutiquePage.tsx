'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid3X3, Grid2X2, X, ChevronDown } from 'lucide-react';
import { products, categories, models, sortOptions } from '@/lib/products';
import { ProductCard } from './ProductCard';

export function BoutiquePage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedModel, setSelectedModel] = useState('Tous');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [gridCols, setGridCols] = useState(4);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cat) setSelectedCategory(decodeURIComponent(cat));
     
    if (q) setSearchQuery(decodeURIComponent(q));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'Tous') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedModel !== 'Tous') {
      result = result.filter((p) => p.model === selectedModel);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, selectedModel, sortBy, priceRange, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('Tous');
    setSelectedModel('Tous');
    setSortBy('featured');
    setPriceRange([0, 100]);
    setSearchQuery('');
  };

  const hasFilters = selectedCategory !== 'Tous' || selectedModel !== 'Tous' || searchQuery;

  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh' }}>
      {/* Page header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '48px 24px 40px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Notre collection
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            Boutique
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {/* Filter toggle */}
          <button
            id="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              background: showFilters ? 'rgba(99,102,241,0.15)' : '#1a1a1a',
              border: `1px solid ${showFilters ? 'rgba(99,102,241,0.4)' : '#2a2a2a'}`,
              color: showFilters ? '#818cf8' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
            }}
          >
            <SlidersHorizontal size={16} />
            Filtres
            {hasFilters && (
              <span style={{ background: '#6366f1', color: 'white', borderRadius: '8px', padding: '1px 6px', fontSize: '0.7rem' }}>
                ●
              </span>
            )}
          </button>

          {/* Sort */}
          <div style={{ position: 'relative', marginLeft: 'auto' }}>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                appearance: 'none',
                padding: '10px 36px 10px 16px',
                borderRadius: '12px',
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                color: '#f8fafc',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ background: '#1a1a1a' }}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
          </div>

          {/* Grid toggle */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              id="grid-4-btn"
              className="btn-icon"
              onClick={() => setGridCols(4)}
              style={{ background: gridCols === 4 ? 'rgba(99,102,241,0.15)' : '#1a1a1a', borderColor: gridCols === 4 ? 'rgba(99,102,241,0.4)' : '#2a2a2a', color: gridCols === 4 ? '#818cf8' : '#64748b' }}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              id="grid-2-btn"
              className="btn-icon"
              onClick={() => setGridCols(2)}
              style={{ background: gridCols === 2 ? 'rgba(99,102,241,0.15)' : '#1a1a1a', borderColor: gridCols === 2 ? 'rgba(99,102,241,0.4)' : '#2a2a2a', color: gridCols === 2 ? '#818cf8' : '#64748b' }}
            >
              <Grid2X2 size={16} />
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Category filter */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                Catégorie
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: selectedCategory === cat ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selectedCategory === cat ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.06)'}`,
                      color: selectedCategory === cat ? '#818cf8' : '#64748b',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Model filter */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                Modèle
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  id="model-select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{
                    width: '100%',
                    appearance: 'none',
                    padding: '10px 36px 10px 14px',
                    borderRadius: '12px',
                    background: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    color: '#f8fafc',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                  }}
                >
                  {models.map((m) => (
                    <option key={m} value={m} style={{ background: '#1a1a1a' }}>{m}</option>
                  ))}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Price range */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>
                Budget : {priceRange[0]}€ — {priceRange[1]}€
              </label>
              <input
                id="price-range"
                type="range"
                min={0}
                max={100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>

            {/* Reset */}
            {hasFilters && (
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  id="reset-filters-btn"
                  onClick={resetFilters}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <X size={14} /> Réinitialiser
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results count */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            <span style={{ color: '#f8fafc', fontWeight: 700 }}>{filteredProducts.length}</span> produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'Tous' && (
              <span> dans <span style={{ color: '#818cf8' }}>{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {selectedCategory !== 'Tous' && (
              <button
                onClick={() => setSelectedCategory('Tous')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem',
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                  color: '#818cf8', cursor: 'pointer',
                }}
              >
                {selectedCategory} <X size={12} />
              </button>
            )}
            {selectedModel !== 'Tous' && (
              <button
                onClick={() => setSelectedModel('Tous')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem',
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                  color: '#818cf8', cursor: 'pointer',
                }}
              >
                {selectedModel} <X size={12} />
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem',
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                  color: '#818cf8', cursor: 'pointer',
                }}
              >
                &quot;{searchQuery}&quot; <X size={12} />
              </button>
            )}
          </div>
        )}

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(gridCols, 4)}, 1fr)`,
              gap: '24px',
            }}
            className="boutique-grid"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</p>
            <h3 style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.3rem', marginBottom: '8px' }}>
              Aucun produit trouvé
            </h3>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>Essayez de modifier vos filtres</p>
            <button onClick={resetFilters} className="btn-primary">
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .boutique-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .boutique-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
