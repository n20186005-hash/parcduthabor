import { useTranslations, useMessages } from 'next-intl';
import RichText from './RichText';

export default function Intro() {
  const t = useTranslations('intro');
  const tOff = useTranslations('officialManagement');
  const tBc = useTranslations('breadcrumb');
  const messages = useMessages() as any;
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];
  const crumbs: string[] = messages?.breadcrumb?.items || [];
  const lead: string = messages?.intro?.lead || '';

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Geographic hierarchy / breadcrumb (SEO entity binding) */}
        {crumbs.length > 0 && (
          <nav aria-label={tBc('ariaLabel')} className="mb-6">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              {crumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-x-2">
                  {i > 0 && (
                    <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                      →
                    </span>
                  )}
                  <span
                    className={i < crumbs.length - 1 ? 'font-medium' : ''}
                    style={{
                      color: i < crumbs.length - 1 ? 'var(--accent)' : 'var(--text-muted)',
                    }}
                  >
                    {crumb}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {lead && (
          <p
            className="text-xl leading-relaxed mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            <RichText text={lead} />
          </p>
        )}

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}
