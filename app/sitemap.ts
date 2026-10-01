import { MetadataRoute } from 'next';
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nestcase.com';

  // Base routes for e-commerce
  const routes = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/warranty',
    '/privacy',
    '/terms',
    '/cookies',
    '/legal',
    '/accessibility',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/shop' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/shop' ? 0.9 : 0.5,
  }));

  try {
    const products = await fetchQuery(api.products.getProducts);
    
    if (products && products.length > 0) {
      products.forEach(p => {
        sitemapEntries.push({
          url: `${baseUrl}/shop/${p.slug}`,
          lastModified: new Date(p._creationTime),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  return sitemapEntries;
}
