import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicRelated from '@/components/TopicRelated';

const baseUrl = 'https://parcduthabor.com';

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Horaires du Parc du Thabor à Rennes (2026) | Ouvert toute l’année',
  description:
    "Horaires d'ouverture officiels du Parc du Thabor à Rennes par période de l'année, accès libre et gratuit, horaires des serres tropicales et conseils pour planifier votre visite.",
  alternates: {
    canonical: `${baseUrl}/fr/horaires`,
    languages: {
      fr: `${baseUrl}/fr/horaires`,
      'x-default': `${baseUrl}/fr/horaires`,
    },
  },
  robots: { index: true, follow: true },
};

function currentPeriodIndex(date: Date): number {
  const m = date.getMonth();
  if (m === 8) return 3;
  if (m >= 2 && m <= 3) return 1;
  if (m >= 4 && m <= 7) return 2;
  return 0;
}

export default async function HorairesPage() {
  const t = await getTranslations({ locale: 'fr', namespace: 'hours' });
  const seasonal = t.raw('seasonal') as { period: string; time: string }[];
  const active = currentPeriodIndex(new Date());

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
              Horaires d’ouverture du Parc du Thabor
            </h1>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              {t('intro')}
            </p>

            <div
              className="rounded-xl p-5 mb-8 flex items-center gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 14" />
              </svg>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('hoursLabel')} : {seasonal[active]?.time}
                </span>{' '}
                — {t('tip')}
              </p>
            </div>

            <h2 className="font-medium text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('tableTitle')}
            </h2>
            <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)' }}>
                    <th className="px-5 py-3 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {t('periodLabel')}
                    </th>
                    <th className="px-5 py-3 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {t('hoursLabel')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {seasonal.map((row, i) => (
                    <tr
                      key={row.period}
                      style={{
                        background: i === active ? 'var(--accent-soft)' : 'transparent',
                        borderTop: '1px solid var(--border-color)',
                      }}
                    >
                      <td className="px-5 py-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                        {row.period}
                        {i === active && (
                          <span
                            className="ml-2 text-xs px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
                          >
                            Actuel
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="rounded-xl p-5 mt-6 flex items-start gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                <path d="M3 12h18M12 3v18" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {t('greenhouseTitle')}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t('greenhouseTime')}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              Source : Office de Tourisme de Rennes (tourisme-rennes.com).
            </p>
          </div>
        </section>

        <TopicRelated current="horaires" />
      </main>
      <Footer />
    </>
  );
}


