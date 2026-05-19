'use client';

import { useTranslations } from 'next-intl';

export default function TicketsSection() {
  const t = useTranslations('tickets');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Park Free */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)', border: '2px solid var(--accent)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L4 12h3v4h10v-4h3L12 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('park')}
                </h3>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{t('parkPrice')}</p>
              </div>
            </div>
          </div>

          {/* Parking */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('parking')}
                </h3>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{t('parkingPrice')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
