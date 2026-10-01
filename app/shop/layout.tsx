import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nestcase.com";

export const metadata: Metadata = {
  title: 'Boutique | Nestcase',
  description: "Découvrez notre gamme complète d'accessoires technologiques. Conçus pour la performance et la durabilité.",
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  openGraph: {
    title: 'Boutique | Nestcase',
    description: "Découvrez notre gamme complète d'accessoires technologiques.",
    url: `${siteUrl}/shop`,
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
