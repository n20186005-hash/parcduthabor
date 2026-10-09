import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicRelated from '@/components/TopicRelated';

const baseUrl = 'https://parcduthabor.com';

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Que faire à Rennes : les incontournables à voir et à faire',
  description:
    'Que faire à Rennes ? Le Parc du Thabor bien sûr, mais aussi le Parlement de Bretagne, la Cathédrale Saint-Pierre, le Marché des Lices, Les Champs Libres, le Musée des Beaux-Arts et les balades dans le centre historique.',
  alternates: {
    canonical: `${baseUrl}/fr/que-faire-a-rennes`,
    languages: {
      fr: `${baseUrl}/fr/que-faire-a-rennes`,
      'x-default': `${baseUrl}/fr/que-faire-a-rennes`,
    },
  },
  robots: { index: true, follow: true },
};

const groups = [
  {
    title: 'Nature & parcs',
    items: [
      {
        name: 'Parc du Thabor',
        desc: 'Notre coup de cœur et point de départ idéal : 10 hectares de jardins, roseraie, serres et volière, entrée libre et gratuite, à deux pas du centre.',
      },
      {
        name: 'Parc des Gayeulles',
        desc: 'Grand parc au nord de la ville, autour d’un étang, avec activités de loisirs en famille (mini-golf, accrobranche…).',
      },
    ],
  },
  {
    title: 'Patrimoine & histoire',
    items: [
      {
        name: 'Parlement de Bretagne',
        desc: 'Joyau de l’architecture classique du XVIIᵉ siècle, sur la place du même nom. Sa façade illuminée le soir est un spectacle à ne pas manquer.',
      },
      {
        name: 'Cathédrale Saint-Pierre',
        desc: 'Cathédrale gothique reconstruite après l’incendie de 1754, au cœur de la ville.',
      },
      {
        name: 'Centre historique',
        desc: 'Ruelles à colombages (rue du Chêne, rue de la Psalette) et Tour Duchesne, témoins des fortifications anciennes.',
      },
    ],
  },
  {
    title: 'Culture',
    items: [
      {
        name: 'Les Champs Libres',
        desc: 'Pôle culturel regroupant le Musée de Bretagne, l’Espace des Sciences et un planétarium.',
      },
      {
        name: 'Musée des Beaux-Arts',
        desc: 'L’un des plus anciens musées de France, à deux pas de la Mairie.',
      },
      {
        name: 'Couvent des Jacobins',
        desc: 'Ancien couvent devenu lieu d’événements, remarquable par son extension contemporaine.',
      },
      {
        name: 'Opéra de Rennes',
        desc: 'Programmation lyrique et musicale au cœur de la ville.',
      },
    ],
  },
  {
    title: 'Marchés & balades',
    items: [
      {
        name: 'Marché des Lices',
        desc: 'L’un des plus grands marchés de France, chaque samedi matin, place des Lices.',
      },
      {
        name: 'Canal d’Ille-et-Rance',
        desc: 'Promenades et cyclisme le long du canal Saint-Martin, au calme en ville.',
      },
    ],
  },
];

export default function QueFairePage() {
  return (
    <>
      <Header />
      <main>
        <section className="section-padding pt-28">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent)' }}>
              Rennes · Tourisme
            </p>
            <h1
              className="font-display text-3xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Que faire à Rennes
            </h1>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              Rennes mérite bien plus qu’une halte. Voici les incontournables pour compléter une
              visite du Parc du Thabor, du patrimoine breton aux balades au bord de l’eau. Pour les
              horaires et tarifs précis, renseignez-vous sur le site de l’Office de Tourisme de Rennes.
            </p>

            <div className="space-y-10">
              {groups.map((g) => (
                <div key={g.title}>
                  <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {g.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {g.items.map((it) => (
                      <div
                        key={it.name}
                        className="rounded-xl p-6"
                        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                      >
                        <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                          {it.name}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {it.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-6 mt-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
            >
              <h2 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Se déplacer à Rennes
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Le centre historique se visite à pied. Le métro STAR (lignes a et b), les bus et le
                vélo en libre-service (LE vélo STAR) complètent le réseau. La gare de Rennes relie
                Paris en environ 1 h 25 en TGV. Le Parc du Thabor, gratuit et central, s’intègre
                facilement à n’importe quel parcours.
              </p>
            </div>
          </div>
        </section>

        <TopicRelated current="que-faire-a-rennes" />
      </main>
      <Footer />
    </>
  );
}
