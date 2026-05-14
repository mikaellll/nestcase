import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/paiement/annule', '/paiement/reussi'],
    },
    sitemap: 'https://nestcase.com/sitemap.xml',
  };
}
