import type { Metadata } from 'next';
import { CheckoutClient } from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Paiement',
  description: 'Finalisez votre commande NestCase — carte, Apple Pay, Google Pay ou PayPal.',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
