
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ConvexClientProvider from "./ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nestcase.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nestcase | Accessoires technologiques modernes',
  description: "Chargeurs, câbles et supports de téléphone premium pensés pour votre quotidien. Fiables, élégants et accessibles.",
  keywords: "chargeur rapide, câble usb-c, support téléphone, accessoires smartphone, nestcase",
  authors: [{ name: "Nestcase" }],
  openGraph: {
    title: 'Nestcase | Accessoires technologiques premium',
    description: "Chargeurs, câbles et supports pensés pour votre quotidien.",
    url: siteUrl,
    siteName: 'Nestcase',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestcase | Accessoires technologiques premium",
    description: "Chargeurs, câbles et supports pensés pour votre quotidien.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased scroll-smooth`} data-scroll-behavior="smooth">
      <body suppressHydrationWarning className="min-h-screen bg-brand-white text-brand-black flex flex-col font-sans">
        <ConvexAuthNextjsServerProvider>
          <ConvexClientProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Analytics />
          </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
      </body>
    </html>
  );
}