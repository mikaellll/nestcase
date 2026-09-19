import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nestcase.vercel.app';

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

  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/shop' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/shop' ? 0.9 : 0.5,
  })) as MetadataRoute.Sitemap;

  // In a real-world scenario, you would fetch all products from Convex here using ConvexHttpClient
  // and append them to the sitemapEntries array.
  // Example: 
  // const products = await fetchProducts();
  // products.forEach(p => sitemapEntries.push({ url: `${baseUrl}/shop/${p.slug}`, ... }))

  return sitemapEntries;
}
