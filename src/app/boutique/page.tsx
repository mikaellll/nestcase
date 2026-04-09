import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BoutiquePage } from '@/components/BoutiquePage';

export const metadata: Metadata = {
  title: 'Boutique — Toutes nos coques premium',
  description: 'Parcourez notre collection complète de coques premium pour iPhone, Samsung Galaxy et Google Pixel. Filtrez par modèle, style et prix.',
};

export default function Boutique() {
  return (
    <Suspense fallback={<div style={{ paddingTop: '72px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>Chargement...</div>}>
      <BoutiquePage />
    </Suspense>
  );
}
