import { useTranslations, useMessages } from 'next-intl';
import { SITE } from '@/lib/site';
import RichText from './RichText';

type LandmarkItem = {
  name: string;
  desc: string;
  mapsUrl: string;
};

export default function LandmarksSection() {
  const t = useTranslations('landmarks');
  const messages = useMessages() as any;
  const items: LandmarkItem[] = messages?.landmarks?.items || [];

  return (
    <section id="landmarks" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* Surrounding semantic cluster */}
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          <RichText text={t('intro')} />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 sm:p-6 transition-shadow hover:shadow-md"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
              <a
                href={item.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {t('getDirections')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('mapNote') + ' '}
          <a
            href={SITE.mapsShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-medium"
            style={{ color: 'var(--accent)' }}
          >
            Google Maps
          </a>
        </p>
      </div>
    </section>
  );
}
