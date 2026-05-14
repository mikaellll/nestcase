import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthHydrator } from "@/components/AuthHydrator";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nestcase.com'),
  title: {
    default: "NestCase — Coques Premium pour Smartphone",
    template: "%s | NestCase",
  },
  description:
    "Découvrez NestCase, la boutique de coques premium pour iPhone, Samsung et Google Pixel. Design exclusif, protection maximale, livraison rapide.",
  keywords: [
    "coque téléphone",
    "coque iPhone",
    "coque Samsung",
    "coque premium",
    "protection téléphone",
    "NestCase",
  ],
  openGraph: {
    title: "NestCase — Coques Premium pour Smartphone",
    description:
      "Découvrez notre collection exclusive de coques premium pour smartphone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthHydrator />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
