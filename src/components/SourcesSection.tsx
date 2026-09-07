import { useTranslations, useMessages } from 'next-intl';
import RichText from './RichText';

type SourceItem = {
  name: string;
  desc: string;
  url: string;
};

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items: SourceItem[] = messages?.sources?.items || [];

  return (
    <section id="sources" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          <RichText text={t('intro')} />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 font-semibold text-base hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                <span>{item.name}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-1 flex-shrink-0"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
