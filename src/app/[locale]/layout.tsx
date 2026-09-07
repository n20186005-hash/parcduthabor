import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import JsonLd from '@/components/JsonLd';
import ConsentManager from '@/components/ConsentManager';
import {
  SITE,
  heroImageUrl,
  touristAttractionSchema,
  faqSchema,
} from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#234830',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = SITE.baseUrl;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const frUrl = `${baseUrl}/fr`;
  const deUrl = `${baseUrl}/de`;
  const itUrl = `${baseUrl}/it`;
  const esUrl = `${baseUrl}/es`;
  const urlMap: Record<string, string> = {
    fr: frUrl,
    zh: zhUrl,
    en: enUrl,
    de: deUrl,
    it: itUrl,
    es: esUrl,
  };
  const selfUrl = urlMap[locale] || frUrl;
  const ogImage = heroImageUrl();
  const ogImageAlt = `${SITE.fullName} in ${SITE.city}, ${SITE.country}`;

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'fr': frUrl,
        'en': enUrl,
        'zh': zhUrl,
        'de': deUrl,
        'it': itUrl,
        'es': esUrl,
        'x-default': frUrl,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: SITE.fullName,
      locale: locale === 'zh' ? 'zh_CN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/icons/icon-192.png',
      apple: '/icons/apple-touch-icon.png',
    },
    manifest: '/manifest.webmanifest',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Structured-data inputs (FAQ mirrors the visible FAQ section copy)
  const msg = messages as any;
  const faqItems: { q: string; a: string }[] = Array.isArray(msg?.faq?.items)
    ? msg.faq.items.map((item: any) => ({
        q: String(item?.q ?? ''),
        a: String(item?.a ?? ''),
      }))
    : [];
  const jsonLdDescription = String(msg?.seo?.jsonLdDescription ?? '');

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr' : 'en'} suppressHydrationWarning>
      <head>
        {/* GA4 + AdSense are loaded by <ConsentManager /> after consent */}

        {/* PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE.fullName} />
        <meta name="application-name" content={SITE.fullName} />

        {/* Schema.org structured data: TouristAttraction geo-entity binding */}
        <JsonLd data={touristAttractionSchema(jsonLdDescription)} />
        {/* Schema.org structured data: FAQPage (Featured Snippet) */}
        {faqItems.length > 0 && <JsonLd data={faqSchema(faqItems)} />}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* Service worker registration (PWA) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}})();`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <ConsentManager />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
