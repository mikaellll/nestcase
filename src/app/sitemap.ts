import { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  // Hardcoded to prevent staging environments from indexing
  const baseUrl = 'https://nestcase.com';

  // Routes statiques
  const staticRoutes = [
    '',
    '/a-propos',
    '/boutique',
    '/contact',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Routes des produits
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/produit/${product.id}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
