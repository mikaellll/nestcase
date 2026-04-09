import type { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'NestCase — L\'Écosystème d\'Accessoires Premium',
  description: 'Découvrez NestCase, la référence en accessoires mobiles haut de gamme. Coques blindées, supports ergonomiques, câbles Kevlar et chargeurs haute performance.',
};

export default function Home() {
  return <HomePage />;
}
