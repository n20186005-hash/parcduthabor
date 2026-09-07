// ============================================================
// Single-attraction SEO entity binding configuration
// Domain: parcduthabor.com — Attraction: Parc du Thabor (Rennes)
// Keep this file in sync with src/messages/*.json content.
// ============================================================

export const SITE = {
  domain: 'parcduthabor.com',
  baseUrl: 'https://parcduthabor.com',
  /** {{ATTRACTION_FULL_NAME}} */
  fullName: 'Parc du Thabor',
  /** {{ATTRACTION_SHORT_NAME}} — used as semantic alias of the domain */
  shortName: 'Parc du Thabor',
  /** {{CITY_NAME}} */
  city: 'Rennes',
  /** {{STATE_PROVINCE}} */
  region: 'Brittany',
  /** {{COUNTRY_NAME}} */
  country: 'France',
  /** {{COUNTRY_CODE_2LETTER}} */
  countryCode: 'FR',
  /** {{POSTAL_CODE}} */
  postalCode: '35000',
  streetAddress: 'Place Saint-Mélaine',
  /** {{LATITUDE}} */
  latitude: 48.1143843,
  /** {{LONGITUDE}} */
  longitude: -1.6694938,
  /** {{MAPS_SHARE_URL}} */
  mapsShareUrl: 'https://maps.app.goo.gl/2MbuacMsJCxoNKVH8',
  /** {{MAPS_EMBED_SRC}} */
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4557.569538222694!2d-1.6694938000000001!3d48.114384300000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ede494eaa6dc9%3A0x9b7489c7719b7e6e!2sParc%20du%20Thabor!5e1!3m2!1sen!2s!4v1788735227895!5m2!1sen!2s',
  /** {{NEARBY_LANDMARK_1}} */
  nearbyLandmark1: 'Rennes Cathedral (Cathédrale Saint-Pierre de Rennes)',
  /** {{NEARBY_LANDMARK_2}} */
  nearbyLandmark2: 'Parliament of Brittany (Palais du Parlement de Bretagne)',
  /** {{GOVT_TOURISM_URL}} */
  tourismUrl: 'https://www.tourisme-rennes.com/',
  /** Canonical hero image (also used as og:image / schema image) */
  heroImagePath: '/gallery/parcduthabor%20(6).jpg',
  phone: '+33 2 23 62 19 40',
  plusCode: '487J+Q6 Rennes, France',
  phoneRaw: '+33223621940',
};

export function heroImageUrl(): string {
  return `${SITE.baseUrl}${SITE.heroImagePath}`;
}

/**
 * TouristAttraction structured data (JSON-LD) placed in <head>.
 * Geo-entity definition used by Google Knowledge Graph.
 */
export function touristAttractionSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${SITE.baseUrl}/#attraction`,
    name: SITE.fullName,
    alternateName: [
      SITE.shortName,
      `${SITE.city} ${SITE.fullName}`,
      'Jardin du Thabor',
    ],
    description,
    url: SITE.baseUrl,
    image: [heroImageUrl()],
    isAccessibleForFree: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    hasMap: SITE.mapsShareUrl,
    sameAs: [SITE.mapsShareUrl, SITE.tourismUrl],
  };
}

/**
 * FAQPage structured data (JSON-LD) generated from the visible FAQ
 * items so that markup and on-page text always stay in sync.
 */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/** Safely serialise a JSON-LD object (escapes `</script>`). */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
