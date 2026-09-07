import { SITE } from '@/lib/site';
import type { LandingContent } from '@/lib/landing-content';

function mapEmbedSrc(locale: string): string {
  const base = SITE.mapsEmbedSrc;
  return `${base}${base.includes('?') ? '&' : '?'}hl=${locale}`;
}

export default function LandingPageView({ content }: { content: LandingContent }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-6 py-4"
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <a
            href="/fr"
            className="font-display font-semibold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Parc du Thabor
          </a>
          <a
            href="/fr"
            className="text-sm font-medium"
            style={{ color: 'var(--accent)' }}
          >
            {content.topLinkLabel}
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="px-4 sm:px-6 pt-12 pb-10" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto text-center">
            <h1
              className="font-display text-3xl sm:text-5xl font-semibold leading-tight max-w-4xl mx-auto"
              style={{ color: 'var(--text-primary)' }}
            >
              {content.heading}
            </h1>
            <p
              className="mt-5 text-base sm:text-lg max-w-3xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              {content.lede}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {content.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl px-4 py-3 text-left min-w-32"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {fact.label}
                  </div>
                  <div className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="px-4 sm:px-6 py-14">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-display text-2xl sm:text-3xl font-semibold mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              {content.introTitle}
            </h2>
            {content.intro.map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="px-4 sm:px-6 py-14" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-5xl mx-auto">
            <h2
              className="font-display text-2xl sm:text-3xl font-semibold mb-8 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              {content.highlightsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-5"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practical info */}
        <section className="px-4 sm:px-6 py-14">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-display text-2xl sm:text-3xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {content.practicalTitle}
            </h2>
            <ul className="space-y-3">
              {content.practical.map((line, i) => (
                <li
                  key={i}
                  className="pl-5 relative text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Map */}
        <section className="px-4 sm:px-6 pb-14">
          <div className="max-w-5xl mx-auto">
            <h2
              className="font-display text-2xl sm:text-3xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {content.mapTitle}
            </h2>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              {content.mapBody}
            </p>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)' }}>
              <iframe
                src={mapEmbedSrc(content.locale)}
                title={content.mapTitle}
                loading="lazy"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* CTA to full guide */}
        <section className="px-4 sm:px-6 pb-20">
          <div
            className="max-w-3xl mx-auto rounded-2xl p-8 sm:p-10 text-center"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <h2
              className="font-display text-2xl sm:text-3xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {content.guideTitle}
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {content.guideBody}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {content.guideLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: 'var(--accent)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 sm:px-6 py-8" style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-5xl mx-auto text-center text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          <p>
            <a href="/fr" style={{ color: 'var(--text-secondary)' }} className="hover:underline">Parc du Thabor – Guide FR</a>
            {' · '}
            <a href="/en" style={{ color: 'var(--text-secondary)' }} className="hover:underline">EN</a>
            {' · '}
            <a href="/zh" style={{ color: 'var(--text-secondary)' }} className="hover:underline">中文</a>
            {' · '}
            <a href="/fr/cookie-settings" style={{ color: 'var(--text-secondary)' }} className="hover:underline">Cookies</a>
          </p>
          <p className="mt-3">{content.footerNote}</p>
        </div>
      </footer>
    </div>
  );
}
