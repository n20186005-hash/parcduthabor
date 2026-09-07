import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { touristAttractionSchema, heroImageUrl } from '@/lib/site';
import { itContent } from '@/lib/landing-content';
import LandingPageView from '@/components/landing/LandingPageView';

const baseUrl = 'https://parcduthabor.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: itContent.title,
  description: itContent.description,
  alternates: {
    canonical: '/it',
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
    title: itContent.title,
    description: itContent.description,
    url: `${baseUrl}/it`,
    siteName: 'Parc du Thabor',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: heroImageUrl() }],
  },
  twitter: {
    card: 'summary_large_image',
    title: itContent.title,
    description: itContent.description,
    images: [heroImageUrl()],
  },
  robots: { index: true, follow: true },
};

export default function ItLandingPage() {
  return (
    <>
      <JsonLd data={touristAttractionSchema(itContent.description)} />
      <LandingPageView content={itContent} />
    </>
  );
}
