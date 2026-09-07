import { useTranslations, useMessages } from 'next-intl';

const categoryKeys = ['inside', 'parking', 'food', 'stay', 'shop', 'drive'] as const;

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const groups = categoryKeys
    .map((key) => ({
      key,
      items: messages?.facilities?.[key] as string[] | undefined,
    }))
    .filter((g) => Array.isArray(g.items) && g.items.length > 0);

  return (
    <section id="facilities" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {groups.map((group) => (
            <div
              key={group.key}
              className="rounded-xl p-6"
              style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-base sm:text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {t(`${group.key}Title`)}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {(group.items || []).map((item, j) => (
                  <li
                    key={j}
                    className="text-sm px-3 py-1.5 rounded-lg leading-relaxed"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {group.key === 'drive' && (
                <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {t('driveNote')}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
