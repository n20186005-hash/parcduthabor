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
  title: 'Visiter Rennes en 1 jour : itinéraire et conseils',
  description:
    'Visiter Rennes en 1 jour : itinéraire centre historique, Parlement de Bretagne, Cathédrale Saint-Pierre, Marché des Lices, et le clou de la visite — le Parc du Thabor — l’après-midi.',
  alternates: {
    canonical: `${baseUrl}/fr/visiter-rennes-1-jour`,
    languages: {
      fr: `${baseUrl}/fr/visiter-rennes-1-jour`,
      'x-default': `${baseUrl}/fr/visiter-rennes-1-jour`,
    },
  },
  robots: { index: true, follow: true },
};

const steps = [
  {
    time: 'Matin · 9 h – 12 h',
    title: 'Le centre historique',
    body: 'Commencez par la Cathédrale Saint-Pierre, puis descendez vers la Place du Parlement de Bretagne pour admirer sa façade classique. Flânez dans les ruelles à colombages (rue du Chêne, rue de la Psalette) jusqu’à la Place des Lices.',
  },
  {
    time: 'Midi · 12 h – 14 h',
    title: 'Déjeuner et marché',
    body: 'Le samedi, ne manquez pas le Marché des Lices, l’un des plus grands de France. En semaine, profitez d’une terrasse place de la Mairie ou dans les alentours.',
  },
  {
    time: 'Après-midi · 14 h – 17 h',
    title: 'Parc du Thabor (le clou de la visite)',
    body: 'Rejoignez le Parc du Thabor, à deux pas du centre. Comptez 2 à 3 h pour le jardin à la française, la roseraie, les serres tropicales et la volière. Entrée libre et gratuite — l’étape la plus reposante et la plus photogénique de la journée.',
  },
  {
    time: 'Fin d’après-midi · 17 h – 19 h',
    title: 'Culture au choix',
    body: 'Selon vos envies, poursuivez vers Les Champs Libres (Musée de Bretagne, Espace des Sciences, planétarium) ou le Musée des Beaux-Arts, tous proches du centre.',
  },
  {
    time: 'Soir · 19 h +',
    title: 'Dîner et balade',
    body: 'Dînez dans le centre historique, puis faites une balade au bord du canal Saint-Martin pour finir la journée au calme.',
  },
];

export default function VisiterPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section-padding pt-28">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent)' }}>
              Rennes · Itinéraire
            </p>
            <h1
              className="font-display text-3xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Visiter Rennes en 1 jour
            </h1>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              Une journée bien remplie pour découvrir l’essentiel de Rennes, du patrimoine breton au
              Parc du Thabor. Les horaires sont indicatifs : adaptez-les à la saison et à l’ouverture
              des sites (renseignez-vous auprès de l’Office de Tourisme).
            </p>

            <ol className="space-y-5">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="rounded-xl p-6 flex gap-5"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--accent)' }}>
                      {s.time}
                    </p>
                    <h2 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                      {s.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div
              className="rounded-xl p-6 mt-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
            >
              <h2 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Conseils pratiques
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <li>Le centre se visite à pied ; prévoyez des chaussures confortables.</li>
                <li>Métro STAR (lignes a et b), bus et vélo en libre-service pour les plus longs trajets.</li>
                <li>Le Parc du Thabor est gratuit : une pause idéale sans contrainte de budget.</li>
              </ul>
            </div>
          </div>
        </section>

        <TopicRelated current="visiter-rennes-1-jour" />
      </main>
      <Footer />
    </>
  );
}
