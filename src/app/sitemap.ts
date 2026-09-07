import type { MetadataRoute } from 'next';

const base = 'https://parcduthabor.com';
const locales = ['fr', 'en', 'zh'];

const legalPages = ['privacy-policy', 'terms-of-service', 'cookie-settings'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Main locale homepages
  for (const locale of locales) {
    const url = `${base}/${locale}`;
    entries.push({
      url,
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1.0 : 0.9,
    });
    // Legal / secondary pages per locale
    for (const page of legalPages) {
      entries.push({
        url: `${url}/${page}`,
        changeFrequency: 'monthly',
        priority: 0.2,
      });
    }
  }

  // Target-language SEO landing pages
  for (const [locale, priority] of [
    ['de', 0.8],
    ['it', 0.8],
    ['es', 0.8],
  ] as const) {
    entries.push({
      url: `${base}/${locale}`,
      changeFrequency: 'monthly',
      priority,
    });
  }

  return entries;
}
