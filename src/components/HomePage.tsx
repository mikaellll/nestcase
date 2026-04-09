'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Truck, RotateCcw, Star, Zap, ChevronRight } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from './ProductCard';

export function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.badge === 'Best-seller' || p.rating >= 4.8).slice(0, 4);

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* ============ HERO ============ */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(99,102,241,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 60%, rgba(139,92,246,0.15) 0%, transparent 50%), #0a0a0a',
          }}
        />

        {/* Animated grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '60px 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            width: '100%',
          }}
          className="hero-grid"
        >
          {/* Content */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <span className="badge badge-accent" style={{ marginBottom: '20px', display: 'inline-flex' }}>
                ✦ Écosystème 2025
              </span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '24px',
                color: '#f8fafc',
              }}
            >
              Équipez votre
              <br />
              appareil avec{' '}
              <span className="gradient-text">excellence</span>
            </h1>

            <p
              style={{
                color: '#94a3b8',
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                lineHeight: 1.8,
                marginBottom: '40px',
                maxWidth: '480px',
              }}
            >
              Plus que de simples accessoires : un véritable écosystème haut de gamme. Coques blindées, supports ergonomiques en acier massif, câbles Kevlar indéchirables. L'apogée de l'innovation mobile.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
              <Link href="/boutique" className="btn-primary" id="hero-cta-primary">
                Explorer la collection
                <ArrowRight size={16} />
              </Link>
              <Link href="/boutique?category=Édition+Limitée" className="btn-secondary" id="hero-cta-secondary">
                Éditions limitées
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { value: '50K+', label: 'Clients satisfaits' },
                { value: '4.9/5', label: 'Note moyenne' },
                { value: '48h', label: 'Livraison express' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="hero-img-container">
            <div
              className="animate-float"
              style={{
                position: 'relative',
                width: 'min(480px, 100%)',
                aspectRatio: '1',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(99,102,241,0.3)',
              }}
            >
              <Image
                src="/hero-banner.png"
                alt="NestCase - Accessoires premium pour smartphone"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
              {/* Glow overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Floating badges */}
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '-5%',
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.85rem' }}>4.9/5</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '4px 0 0' }}>+50 000 avis clients</p>
            </div>

            <div
              style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 20px 40px rgba(99,102,241,0.4)',
              }}
            >
              <Zap size={20} color="white" style={{ marginBottom: '4px' }} />
              <p style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>Livraison 48h</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: '2px 0 0' }}>Gratuite dès 40€</p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .hero-img-container { display: none !important; }
          }
        `}</style>
      </section>

      {/* ============ TRUST BADGES ============ */}
      <section
        style={{
          background: '#111111',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '32px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '32px',
          }}
        >
          {[
            { icon: Shield, title: 'Protection MIL-STD', desc: 'Norme militaire anti-chocs' },
            { icon: Truck, title: 'Livraison offerte', desc: 'Dès 40€ d\'achat' },
            { icon: RotateCcw, title: 'Retours 30 jours', desc: 'Satisfait ou remboursé' },
            { icon: Star, title: 'Qualité premium', desc: 'Matériaux certifiés' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={20} color="#818cf8" />
              </div>
              <div>
                <div style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.875rem' }}>{title}</div>
                <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Nos coups de cœur
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              Sélection du moment
            </h2>
          </div>
          <Link
            href="/boutique"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818cf8', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}
          >
            Voir tout <ChevronRight size={16} />
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ============ BANNER ============ */}
      <section
        style={{
          margin: '0 24px 80px',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(99,102,241,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.3) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            padding: 'clamp(40px, 6vw, 60px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          <div>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '16px', display: 'inline-flex' }}>
              🔥 Offre spéciale
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'white', margin: '0 0 12px', lineHeight: 1.2 }}>
              Éditions Limitées<br />
              <span style={{ color: '#c7d2fe' }}>— Déjà 30% vendus</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', margin: 0 }}>
              Seulement 500 exemplaires numérotés. Ne le ratez pas.
            </p>
          </div>
          <Link
            href="/boutique?category=Édition+Limitée"
            id="banner-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              background: 'white',
              color: '#4f46e5',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 40px rgba(255,255,255,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            Découvrir maintenant <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ============ BEST SELLERS ============ */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              ⭐ Les plus appréciés
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              Best-sellers
            </h2>
          </div>
          <Link
            href="/boutique"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818cf8', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}
          >
            Voir tout <ChevronRight size={16} />
          </Link>
        </div>

        <div className="product-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section
        style={{
          background: '#111111',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Pourquoi NestCase ?
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 700, color: '#f8fafc' }}>
              L&apos;excellence à chaque détail
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: '🛡️',
                title: 'Fiabilité extrême',
                desc: 'De nos coques aux normes militaires à nos câbles testés pour +25 000 pliures, nos accessoires sont conçus pour résister au temps.',
              },
              {
                icon: '✨',
                title: 'Design d\'avant-garde',
                desc: 'Alliage d\'aluminium, nylon balistique, acier massif... Nous utilisons exclusivement des matériaux nobles aux finitions redoutables.',
              },
              {
                icon: '⚡',
                title: 'Performance maximale',
                desc: 'Bénéficiez des dernières technologies : charge ultra-rapide GaN intelligente, Power Delivery, force magnétique MagSafe surpuissante.',
              },
              {
                icon: '📱',
                title: 'Écosystème universel',
                desc: 'Que vous soyez iPhone, Samsung, Mac ou PC, nos supports, chargeurs et câbles s\'intègrent parfaitement à toutes vos interfaces technologiques.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="card-hover"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{icon}</div>
                <h3 style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>{title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
