'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

// Returns the index of the currently active seasonal period (0-3) for a date.
function currentPeriodIndex(date: Date): number {
  const m = date.getMonth(); // 0 = Jan
  if (m === 8) return 3; // September
  if (m >= 2 && m <= 3) return 1; // March–April
  if (m >= 4 && m <= 7) return 2; // May–August
  return 0; // October–February
}

export default function HoursSection() {
  const t = useTranslations('hours');
  const locale = useLocale();
  const seasonal = t.raw('seasonal') as { period: string; time: string }[];
  const active = currentPeriodIndex(new Date());
  const activeTime = seasonal[active]?.time;

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {t('intro') && (
          <p className="mb-6 text-base" style={{ color: 'var(--text-secondary)' }}>
            {t('intro')}
          </p>
        )}

        {/* Current period callout */}
        {activeTime && (
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
                {t('hoursLabel')} : {activeTime}
              </span>
              {' — '}
              {t('tip')}
            </p>
          </div>
        )}

        {/* Seasonal table */}
        <h3 className="font-medium text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('tableTitle')}
        </h3>
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
              {seasonal.map((row, i) => {
                const isActive = i === active;
                return (
                  <tr
                    key={row.period}
                    style={{
                      background: isActive ? 'var(--accent-soft)' : 'transparent',
                      borderTop: '1px solid var(--border-color)',
                    }}
                  >
                    <td className="px-5 py-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                      {row.period}
                      {isActive && (
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
                );
              })}
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

        {locale === 'fr' && (
          <p className="mt-6">
            <a
              href="/fr/horaires"
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              Voir le détail des horaires et périodes →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
