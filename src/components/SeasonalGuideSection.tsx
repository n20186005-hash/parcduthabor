import { useTranslations, useMessages } from 'next-intl';

type SeasonRow = {
  season: string;
  climate: string;
  garden: string;
  wildlife: string;
  crowd: string;
};

const seasonKeys = ['spring', 'summer', 'autumn', 'winter'] as const;

export default function SeasonalGuideSection() {
  const t = useTranslations('seasonGuide');
  const messages = useMessages() as any;
  const seasons = seasonKeys
    .map((k) => messages?.seasonGuide?.[k])
    .filter(Boolean) as SeasonRow[];

  return (
    <section id="seasons" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-base leading-relaxed mb-8 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        {seasons.length > 0 && (
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border-color)' }}>
            <table className="w-full text-left border-collapse" style={{ minWidth: 780 }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)' }}>
                  <th className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t('colSeason')}</th>
                  <th className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t('colClimate')}</th>
                  <th className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t('colGarden')}</th>
                  <th className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t('colWildlife')}</th>
                  <th className="px-4 py-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t('colCrowd')}</th>
                </tr>
              </thead>
              <tbody>
                {seasons.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? 'var(--card-bg)' : 'var(--bg-tertiary)',
                      borderTop: '1px solid var(--border-color)',
                    }}
                  >
                    <td className="px-4 py-4 align-top font-semibold whitespace-nowrap" style={{ color: 'var(--accent)' }}>
                      {row.season}
                    </td>
                    <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{row.climate}</td>
                    <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{row.garden}</td>
                    <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{row.wildlife}</td>
                    <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{row.crowd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
