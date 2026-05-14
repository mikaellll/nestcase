import type { Metadata } from 'next';
import { RegisterForm } from './RegisterForm';

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Inscrivez-vous pour suivre vos commandes NestCase.',
};

export default function InscriptionPage() {
  return <RegisterForm />;
}
