import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { touristAttractionSchema, heroImageUrl } from '@/lib/site';
import { deContent } from '@/lib/landing-content';
import LandingPageView from '@/components/landing/LandingPageView';

const baseUrl = 'https://parcduthabor.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: deContent.title,
  description: deContent.description,
  alternates: {
    canonical: '/de',
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
    title: deContent.title,
    description: deContent.description,
    url: `${baseUrl}/de`,
    siteName: 'Parc du Thabor',
    locale: 'de_DE',
    type: 'website',
    images: [{ url: heroImageUrl() }],
  },
  twitter: {
    card: 'summary_large_image',
    title: deContent.title,
    description: deContent.description,
    images: [heroImageUrl()],
  },
  robots: { index: true, follow: true },
};

export default function DeLandingPage() {
  return (
    <>
      <JsonLd data={touristAttractionSchema(deContent.description)} />
      <LandingPageView content={deContent} />
    </>
  );
}
