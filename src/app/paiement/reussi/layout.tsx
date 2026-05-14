import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commande confirmée',
  description: 'Votre paiement NestCase a été enregistré.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
