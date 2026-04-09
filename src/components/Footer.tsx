'use client';

import Link from 'next/link';
import { Zap, Globe, MessageCircle, PlayCircle, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    boutique: [
      { href: '/boutique', label: 'Tous les produits' },
      { href: '/boutique?category=Supports', label: 'Supports Bureau' },
      { href: '/boutique?category=Chargeurs', label: 'Chargeurs Rapides' },
      { href: '/boutique?category=Câbles', label: 'Câbles Renforcés' },
    ],
    aide: [
      { href: '#', label: 'Comment commander' },
      { href: '#', label: 'Livraison & retours' },
      { href: '#', label: 'Garantie produits' },
      { href: '#', label: 'Contact' },
    ],
  };

  return (
    <footer
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: '80px',
      }}
    >
      {/* Newsletter bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
          borderBottom: '1px solid rgba(99,102,241,0.2)',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div>
            <h3 style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.25rem', marginBottom: '4px' }}>
              Rejoignez le club NestCase 🎁
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
              -10% sur votre première commande et accès aux éditions exclusives
            </p>
          </div>
          <form
            style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '440px' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="votre@email.com"
              id="newsletter-email"
              className="input-field"
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ flexShrink: 0, padding: '12px 20px' }}
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '60px 24px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
        }}
      >
        {/* Brand */}
        <div>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={18} color="white" />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
              Nest<span style={{ color: '#818cf8' }}>Case</span>
            </span>
          </Link>
          <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '24px' }}>
            Coques premium pour smartphone. Design exclusif, protection maximale, style inégalé.
          </p>

          {/* Social */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { icon: Globe, href: '#', label: 'Instagram' },
              { icon: MessageCircle, href: '#', label: 'Twitter' },
              { icon: PlayCircle, href: '#', label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="btn-icon"
                style={{ textDecoration: 'none' }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Boutique links */}
        <div>
          <h4 style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Boutique
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {links.boutique.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#818cf8')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#64748b')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Aide */}
        <div>
          <h4 style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Aide
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {links.aide.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#818cf8')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#64748b')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { icon: Mail, text: 'contact@nestcase.com' },
              { icon: Phone, text: '+33 7 61 82 24 63' },
              { icon: MapPin, text: 'Paris, France' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={16} color="#6366f1" />
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '20px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <p style={{ color: '#475569', fontSize: '0.8rem', margin: 0 }}>
          &copy; {currentYear} NestCase. Tous droits réservés.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Confidentialité', 'CGV', 'Mentions légales'].map((text) => (
            <a
              key={text}
              href="#"
              style={{ color: '#475569', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#818cf8')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#475569')}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
