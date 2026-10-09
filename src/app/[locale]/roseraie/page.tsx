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
  title: 'La roseraie du Parc du Thabor à Rennes | 2 000 rosiers, meilleure période',
  description:
    "Découvrez la roseraie du Parc du Thabor à Rennes : plus de 2 000 rosiers et 150 variétés, la floraison de mai à octobre, et des conseils pour profiter du plus beau rosier de l'Ouest de la France.",
  alternates: {
    canonical: `${baseUrl}/fr/roseraie`,
    languages: {
      fr: `${baseUrl}/fr/roseraie`,
      'x-default': `${baseUrl}/fr/roseraie`,
    },
  },
  robots: { index: true, follow: true },
};

export default function RoseraiePage() {
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
              La roseraie du Parc du Thabor
            </h1>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
              Créée dans les années 1960, la roseraie du Parc du Thabor est l'une des plus belles
              de l'Ouest de la France : plus de 2 000 rosiers et environ 150 variétés s'y épanouissent
              chaque année au cœur de Rennes.
            </p>

            <div className="rounded-xl overflow-hidden mb-10 border" style={{ borderColor: 'var(--border-color)' }}>
              <img
                src="/gallery/parc-du-thabor-3.jpg"
                alt="Roseraie du Parc du Thabor en fleurs à Rennes"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>

            <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Quand la voir en fleur ?
            </h2>
            <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
              La roseraie est la plus belle de mai à octobre, avec un pic de floraison en mai et juin.
              Le printemps et le début de l'été offrent aussi la lumière la plus douce pour la
              photographie. En dehors de cette période, les rosiers sont taillés et au repos, mais
              les allées du parc restent un cadre agréable en toute saison.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-xl p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Ce qu'on y découvre
                </h3>
                <ul className="text-sm list-disc pl-5" style={{ color: 'var(--text-secondary)' }}>
                  <li>Plus de 2 000 rosiers et 150 variétés</li>
                  <li>Massifs parfaitement entretenus et parterres colorés</li>
                  <li>Allées planes, idéales pour une pause au calme</li>
                  <li>Points de vue photogéniques sur les jardins</li>
                </ul>
              </div>
              <div className="rounded-xl p-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Conseils de visite
                </h3>
                <ul className="text-sm list-disc pl-5" style={{ color: 'var(--text-secondary)' }}>
                  <li>Venez tôt le matin pour une lumière douce et peu de monde</li>
                  <li>Combinez avec le jardin à la française voisin</li>
                  <li>Prévoyez un appareil photo au printemps</li>
                  <li>L'entrée du parc et de la roseraie est libre et gratuite</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <TopicRelated current="roseraie" />
      </main>
      <Footer />
    </>
  );
}
