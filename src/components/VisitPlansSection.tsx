import { useTranslations, useMessages } from 'next-intl';

type GeneralRoute = {
  name: string;
  duration: string;
  steps: string[];
};

type GroupRoute = {
  title: string;
  desc: string;
  steps: string[];
  tips: string;
};

export default function VisitPlansSection() {
  const t = useTranslations('visitPlans');
  const messages = useMessages() as any;
  const general: GeneralRoute[] = messages?.visitPlans?.general || [];
  const groups: GroupRoute[] = messages?.visitPlans?.groups || [];

  return (
    <section id="itineraries" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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

        {/* General half-day / full-day */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('generalTitle')}
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{t('routeNote')}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
          {general.map((route, i) => (
            <div
              key={i}
              className="rounded-xl p-6"
              style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h4 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {route.name}
                </h4>
                <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)' }}>
                  {route.duration}
                </span>
              </div>
              <ol className="space-y-2.5">
                {route.steps.map((step, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                      style={{ background: 'var(--accent)', color: '#fff' }}
                    >
                      {j + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Group-tailored routes */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('groupsTitle')}
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{t('groupNote')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {groups.map((group, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col"
              style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}
            >
              <h4 className="font-display text-lg font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                {group.title}
              </h4>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{group.desc}</p>
              <ul className="space-y-2 mb-4">
                {group.steps.map((step, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    {step}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-3 border-t text-xs leading-relaxed" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                <span className="font-medium" style={{ color: 'var(--accent)' }}>Tip · </span>
                {group.tips}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
