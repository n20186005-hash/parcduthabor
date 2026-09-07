import { useTranslations, useMessages } from 'next-intl';

type FaqItem = {
  q: string;
  a: string;
};

export default function FaqSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: FaqItem[] = messages?.faq?.items || [];

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
          {t('intro')}
        </p>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl overflow-hidden"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 font-medium text-base list-none"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.q}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div
                className="px-5 pb-5 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
