const TOPIC_PAGES = [
  { slug: 'horaires', href: '/fr/horaires', label: 'Horaires d’ouverture' },
  { slug: 'acces', href: '/fr/acces', label: 'Comment venir' },
  { slug: 'roseraie', href: '/fr/roseraie', label: 'La roseraie' },
  { slug: 'plan', href: '/fr/plan', label: 'Plan du parc' },
  { slug: 'que-faire-a-rennes', href: '/fr/que-faire-a-rennes', label: 'Que faire à Rennes' },
  { slug: 'visiter-rennes-1-jour', href: '/fr/visiter-rennes-1-jour', label: 'Rennes en 1 jour' },
];

export default function TopicRelated({ current }: { current: string }) {
  const links = TOPIC_PAGES.filter((p) => p.slug !== current);
  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          Pages utiles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl p-5 block hover:opacity-90 transition-opacity"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                {l.label} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
