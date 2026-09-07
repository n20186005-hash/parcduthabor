import { useTranslations, useMessages } from 'next-intl';

export default function ResponsibilitySection() {
  const t = useTranslations('responsibility');
  const messages = useMessages() as any;
  const principles: string[] = messages?.responsibility?.principles || [];
  const rules: string[] = messages?.responsibility?.rules || [];

  return (
    <section id="responsibility" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-base leading-relaxed mb-3 max-w-3xl" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-primary)' }}>
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}
          >
            <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              {t('principlesTitle')}
            </h3>
            <ul className="space-y-4">
              {principles.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}
          >
            <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              {t('rulesTitle')}
            </h3>
            <ul className="space-y-4">
              {rules.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] font-bold" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
