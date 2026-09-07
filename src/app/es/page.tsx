import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { touristAttractionSchema, heroImageUrl } from '@/lib/site';
import { esContent } from '@/lib/landing-content';
import LandingPageView from '@/components/landing/LandingPageView';

const baseUrl = 'https://parcduthabor.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: esContent.title,
  description: esContent.description,
  alternates: {
    canonical: '/es',
    languages: {
      fr: '/fr',
      en: '/en',
      zh: '/zh',
      de: '/de',
      it: '/it',
      es: '/es',
      'x-default': '/fr',
    },
  },
  openGraph: {
    title: esContent.title,
    description: esContent.description,
    url: `${baseUrl}/es`,
    siteName: 'Parc du Thabor',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: heroImageUrl() }],
  },
  twitter: {
    card: 'summary_large_image',
    title: esContent.title,
    description: esContent.description,
    images: [heroImageUrl()],
  },
  robots: { index: true, follow: true },
};

export default function EsLandingPage() {
  return (
    <>
      <JsonLd data={touristAttractionSchema(esContent.description)} />
      <LandingPageView content={esContent} />
    </>
  );
}
