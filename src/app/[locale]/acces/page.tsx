import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicRelated from '@/components/TopicRelated';
import { SITE } from '@/lib/site';

const baseUrl = 'https://parcduthabor.com';

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Accès au Parc du Thabor à Rennes | Transport, parking et itinéraire',
  description:
    "Comment venir au Parc du Thabor à Rennes : à pied depuis le centre-ville et la gare, en bus et métro STAR, en voiture et stationnement à proximité. Itinéraire et conseils pratiques.",
  alternates: {
    canonical: `${baseUrl}/fr/acces`,
    languages: {
      fr: `${baseUrl}/fr/acces`,
      'x-default': `${baseUrl}/fr/acces`,
    },
  },
  robots: { index: true, follow: true },
};

export default async function AccesPage() {
  const t = await getTranslations({ locale: 'fr', namespace: 'transport' });
  const tk = await getTranslations({ locale: 'fr', namespace: 'tickets' });

  const rows = [
    { title: t('fromCenter'), desc: t('fromCenterDesc') },
    { title: t('fromStation'), desc: t('fromStationDesc') },
    { title: t('fromAirport'), desc: t('fromAirportDesc') },
    { title: t('publicTransport'), desc: t('publicTransportDesc') },
    { title: t('walking'), desc: t('walkingDesc') },
    { title: t('driving'), desc: t('drivingDesc') },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="section-padding pt-28">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent)' }}>
              Parc du Thabor · Rennes
            </p>
            <h1
              className="font-display text-3xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Comment venir au Parc du Thabor
            </h1>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              Le parc est au cœur de Rennes, à deux pas du centre historique. Voici les meilleures
              façons de le rejoindre.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rows.map((r) => (
                <div
                  key={r.title}
                  className="rounded-xl p-6"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <h2 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {r.title}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-6 mt-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
            >
              <h2 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                {tk('parking')}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {tk('parkingPrice')}
              </p>
              <p className="text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Adresse :</strong> {SITE.streetAddress},{' '}
                {SITE.postalCode} {SITE.city}, {SITE.country}
                <br />
                <strong style={{ color: 'var(--text-primary)' }}>Téléphone :</strong> {SITE.phone}
              </p>
              <p className="mt-4">
                <a
                  href={SITE.mapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  Voir l’itinéraire sur Google Maps →
                </a>
              </p>
            </div>
          </div>
        </section>

        <TopicRelated current="acces" />
      </main>
      <Footer />
    </>
  );
}
