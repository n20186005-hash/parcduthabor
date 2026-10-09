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
  title: 'Plan du Parc du Thabor à Rennes | Carte et organisation du parc',
  description:
    'Plan et organisation du Parc du Thabor à Rennes : jardin à la française, roseraie, jardin botanique, serres tropicales, volière et promenades. Boucle de visite suggérée.',
  alternates: {
    canonical: `${baseUrl}/fr/plan`,
    languages: {
      fr: `${baseUrl}/fr/plan`,
      'x-default': `${baseUrl}/fr/plan`,
    },
  },
  robots: { index: true, follow: true },
};

const zones = [
  {
    title: 'Jardin à la française',
    body: 'Parterres symétriques, grand bassin, kiosque à musique et statues : le cœur classique du parc, idéal pour une première promenade au soleil.',
  },
  {
    title: 'La roseraie',
    body: 'Plus de 2 000 rosiers et une centaine de variétés. La floraison s’étend de mai à octobre, avec un pic au printemps. L’un des plus beaux rosiers de l’Ouest de la France.',
  },
  {
    title: 'Jardin des plantes (botanique)',
    body: 'Collections botaniques étiquetées, pelouses et l’orangerie : un espace calme et ombragé, parfait pour une pause.',
  },
  {
    title: 'Serres tropicales',
    body: 'Palmiers et plantes exotiques sous verre. Ouvertes pendant les heures du parc ; fermeture des serres à 17h en hiver et 19h en été.',
  },
  {
    title: 'La volière',
    body: 'Oiseaux et canards dans un cadre familial, très appréciée des enfants.',
  },
  {
    title: 'Promenades et belvédères',
    body: 'Allées panoramiques offrant de beaux points de vue sur les toits de Rennes.',
  },
];

export default function PlanPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section-padding pt-28">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent)' }}>
              Parc du Thabor · Rennes
            </p>
            <h1
              className="font-display text-3xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Plan du Parc du Thabor
            </h1>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              Sur près de 10 hectares, le Parc du Thabor réunit plusieurs espaces distincts. Voici
              comment le parc est organisé pour préparer votre visite.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {zones.map((z) => (
                <div
                  key={z.title}
                  className="rounded-xl p-6"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <h2 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {z.title}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {z.body}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-6 mt-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
            >
              <h2 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Boucle de visite suggérée (environ 1 h 30)
              </h2>
              <ol className="list-decimal pl-5 text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <li>Entrée Place Saint-Mélaine</li>
                <li>Jardin à la française et grand bassin</li>
                <li>Roseraie</li>
                <li>Serres tropicales et orangerie</li>
                <li>Jardin botanique</li>
                <li>Promenade haute et belvédères</li>
                <li>Sortie vers le centre historique</li>
              </ol>
            </div>
          </div>
        </section>

        <TopicRelated current="plan" />
      </main>
      <Footer />
    </>
  );
}
