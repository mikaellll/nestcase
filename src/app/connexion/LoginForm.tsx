'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string; user?: { email: string; name: string } };
      if (!res.ok) {
        if (data.error === 'AUTH_MISCONFIGURED') setError('Serveur mal configuré : ajoutez AUTH_SECRET dans .env.local');
        else setError('E-mail ou mot de passe incorrect.');
        return;
      }
      if (data.user) setUser(data.user);
      router.push('/boutique');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '120px 24px 80px',
        maxWidth: '440px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>Connexion</h1>
      <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '0.95rem' }}>
        Pas encore de compte ?{' '}
        <Link href="/inscription" style={{ color: '#818cf8', fontWeight: 600 }}>
          S&apos;inscrire
        </Link>
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '28px',
          borderRadius: '20px',
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>E-mail</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={inputStyle}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>Mot de passe</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={inputStyle}
          />
        </label>

        {error && (
          <p style={{ color: '#f87171', fontSize: '0.875rem', margin: 0 }} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '14px', borderRadius: '14px', marginTop: '8px' }}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      <p style={{ marginTop: '24px', fontSize: '0.9rem' }}>
        <Link href="/checkout" style={{ color: '#818cf8' }}>
          Continuer en tant qu&apos;invité →
        </Link>
      </p>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: '#0d0d0d',
  color: '#f8fafc',
  fontSize: '0.95rem',
  outline: 'none',
};
