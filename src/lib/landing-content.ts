export type LandingFact = { label: string; value: string };
export type LandingHighlight = { title: string; body: string };

export type LandingContent = {
  locale: 'de' | 'it' | 'es';
  htmlLang: string;
  title: string;
  description: string;
  heading: string;
  lede: string;
  facts: LandingFact[];
  introTitle: string;
  intro: string[];
  highlightsTitle: string;
  highlights: LandingHighlight[];
  practicalTitle: string;
  practical: string[];
  mapTitle: string;
  mapBody: string;
  guideTitle: string;
  guideBody: string;
  guideLinks: { href: string; label: string }[];
  topLinkLabel: string;
  footerNote: string;
};

export const deContent: LandingContent = {
  locale: 'de',
  htmlLang: 'de',
  title: 'Parc du Thabor Rennes | Top Sehenswürdigkeit in Rennes (Kostenlos)',
  description:
    'Was in Rennes sehen? Der Parc du Thabor ist einer der schönsten Parks Frankreichs: französischer, englischer und botanischer Garten, Rosengarten, Volière – kostenlos im Zentrum von Rennes.',
  heading: 'Parc du Thabor in Rennes: Rennes\u2019 schönster Park & Top-Sehenswürdigkeit',
  lede: 'Wer nach Rennes-Sehenswürdigkeiten sucht, kommt am Parc du Thabor nicht vorbei: 10 Hektar Gartenkunst, kostenlos mitten in der Innenstadt.',
  facts: [
    { label: 'Eintritt', value: 'Kostenlos' },
    { label: 'Fläche', value: '10 Hektar' },
    { label: 'Google-Bewertung', value: 'ca. 4,7 / 5' },
    { label: 'Lage', value: 'Zentrum von Rennes' },
  ],
  introTitle: 'Warum der Thabor-Garten zu den Top-Sehenswürdigkeiten von Rennes zählt',
  intro: [
    'Der Parc du Thabor gilt als einer der schönsten Parks Frankreichs und gehört für viele Reisende zu den Rennes-Sehenswürdigkeiten, die man nicht auslassen sollte. Der Garten vereint eine französische Anlage, einen englischen Landschaftsgarten und einen botanischen Garten – alles an einem Ort, ganzjährig geöffnet und ohne Eintritt.',
    'Direkt am historischen Zentrum gelegen, lässt sich der Park ideal mit den wichtigsten Aktivitäten in Rennes verbinden: Die Kathedrale Saint-Pierre, das Parlement de Bretagne und die charmanten Gassen der Altstadt liegen nur wenige Gehminuten entfernt. Auch bei wechselhaftem Wetter lohnt sich der Besuch – die Wege sind gut gepflegt und es gibt zahlreiche schattige Bereiche.',
  ],
  highlightsTitle: 'Das erwartet dich im Thabor-Garten',
  highlights: [
    {
      title: 'Rosengarten (Roseraie)',
      body: 'Eine der schönsten Rosensammlungen der Region mit unzähligen Sorten. In der Blütezeit verwandelt sich die Anlage in ein duftendes Farbenmeer – ein Paradies für Fotografen.',
    },
    {
      title: 'Kostenlose Volière & Teiche',
      body: 'Die Voliere mit ihren Vögeln und die ruhigen Teichbereiche sind besonders bei Familien beliebt. Vögel, Enten und das Grün laden zum Verweilen ein.',
    },
    {
      title: 'Französischer & englischer Garten',
      body: 'Formale Beete und Rasenflächen wechseln sich mit naturnahen Wegen, Wasserläufen und Hügeln ab. Schöne Aussichtspunkte über die Stadt sind inklusive.',
    },
    {
      title: 'Botanischer Garten & Gewächshäuser',
      body: 'Eine große Pflanzensammlung mit botanischen Beschriftungen – interessant für alle, die Rennes mit neugierigen Augen entdecken wollen.',
    },
  ],
  practicalTitle: 'Anreise, Öffnungszeiten & praktische Tipps',
  practical: [
    'Eintritt frei und ganzjährig geöffnet; die Öffnungszeiten wechseln mit den Jahreszeiten.',
    'Der Park liegt an der Place Saint-Mélaine im Stadtzentrum, gut erreichbar zu Fuß von den Metrostationen République (Linie a) und Sainte-Anne (Linie b).',
    'Direkt angrenzend befindet sich die Église Saint-Mélaine; die Cathédrale Saint-Pierre ist nur wenige Gehminuten entfernt.',
    'Ein Besuch des Thabor-Gartens passt perfekt zu einem Stadtspaziergang durch die Altstadt von Rennes – am Vormittag oder späten Nachmittag ist es am schönsten.',
  ],
  mapTitle: 'Lageplan: Parc du Thabor in Rennes',
  mapBody: 'Interaktive Karte des Parks und seiner Umgebung im Zentrum von Rennes.',
  guideTitle: 'Plane deinen Rennes-Besuch',
  guideBody:
    'Im vollständigen Guide findest du die Öffnungszeiten nach Saison, ausführliche Wegbeschreibungen, Rundwege durch den Park, Tipps für Regentage sowie viele Fotos.',
  guideLinks: [
    { href: '/fr', label: 'Zum vollständigen Guide (Französisch)' },
    { href: '/en', label: 'English guide' },
  ],
  topLinkLabel: 'Zum vollständigen Guide',
  footerNote:
    'Parc du Thabor, Place Saint-Mélaine, 35000 Rennes, France. Unabhängiger Reise-Guide – kein offizielles Angebot der Stadt Rennes.',
};

export const itContent: LandingContent = {
  locale: 'it',
  htmlLang: 'it',
  title: 'Cosa vedere a Rennes: visita al Parc du Thabor (Ingresso Gratuito)',
  description:
    'Cosa vedere a Rennes? Il Parc du Thabor è uno dei giardini più belli di Francia: giardino alla francese, all\u2019inglese, orto botanico, roseto e voliera, gratis nel cuore di Rennes.',
  heading: 'Cosa vedere a Rennes: il Parc du Thabor, il giardino da non perdere',
  lede: 'Se cerchi cosa vedere a Rennes, il Parc du Thabor è la risposta: 10 ettari di giardini magnifici, gratis nel centro città.',
  facts: [
    { label: 'Ingresso', value: 'Gratuito' },
    { label: 'Superficie', value: '10 ettari' },
    { label: 'Recensioni Google', value: 'ca. 4,7 / 5' },
    { label: 'Posizione', value: 'Centro di Rennes' },
  ],
  introTitle: 'Perché il Thabor è uno dei luoghi da visitare assolutamente a Rennes',
  intro: [
    'Considerato uno dei parchi più belli di Francia, il Parc du Thabor unisce un giardino alla francese, un giardino all\u2019inglese e un orto botanico. È tra le cose da vedere a Rennes più amate dai visitatori: aperto tutto l\u2019anno e completamente gratuito.',
    'Si trova proprio ai margini del centro storico: da qui raggiungi a piedi la Cathédrale Saint-Pierre e il Parlamento di Bretagna. Se stai organizzando un itinerario su cosa vedere a Rennes, inserisci il Thabor come tappa naturale di una passeggiata nel cuore della città.',
  ],
  highlightsTitle: 'Cosa trovi dentro il Thabor',
  highlights: [
    {
      title: 'Roseto (Roseraie)',
      body: 'Una delle collezioni di rose più ricche della regione. Nel periodo di fioritura è uno spettacolo di colori e profumi, perfetto per le foto.',
    },
    {
      title: 'Voliera gratuita & stagni',
      body: 'La voliera con i suoi uccelli e i laghetti tranquilli piacciono molto alle famiglie con bambini.',
    },
    {
      title: 'Giardino alla francese e all\u2019inglese',
      body: 'Aiuole formali e grandi prati si alternano a vialetti ombreggiati, corsi d\u2019acqua e piccoli rilievi con belle viste sulla città.',
    },
    {
      title: 'Orto botanico & serre',
      body: 'Una vasta collezione botanica segnalata con cartellini – un motivo in più per visitare questo angolo verde di Rennes.',
    },
  ],
  practicalTitle: 'Come arrivare, orari e consigli pratici',
  practical: [
    'Ingresso gratuito e apertura tutto l\u2019anno; gli orari variano con le stagioni.',
    'Il parco si trova in Place Saint-Mélaine, raggiungibile a piedi dalle fermate della metropolitana République (linea a) e Sainte-Anne (linea b).',
    'Accanto al parco sorge la chiesa di Saint-Mélaine; la Cathédrale Saint-Pierre è a pochi minuti a piedi.',
    'Ideale come tappa di una passeggiata nel centro storico: la luce del mattino o del tardo pomeriggio è la più bella per le foto.',
  ],
  mapTitle: 'Mappa: Parc du Thabor a Rennes',
  mapBody: 'Mappa interattiva del parco e dei dintorni nel centro di Rennes.',
  guideTitle: 'Organizza la tua visita a Rennes',
  guideBody:
    'Nella guida completa trovi orari per stagione, indicazioni dettagliate, itinerari a piedi dentro il parco, consigli per i giorni di pioggia e molte foto.',
  guideLinks: [
    { href: '/fr', label: 'Vai alla guida completa (in francese)' },
    { href: '/en', label: 'English guide' },
  ],
  topLinkLabel: 'Vai alla guida completa',
  footerNote:
    'Parc du Thabor, Place Saint-Mélaine, 35000 Rennes, France. Guida indipendente – non è un sito ufficiale del comune di Rennes.',
};

export const esContent: LandingContent = {
  locale: 'es',
  htmlLang: 'es',
  title: 'Qué ver en Rennes: Parc du Thabor, el jardín imprescindible',
  description:
    'Qué ver en Rennes, Francia: visita el Parc du Thabor, uno de los jardines más bonitos del país – rosedal, voladero y jardín botánico gratis en pleno centro de Rennes.',
  heading: 'Qué ver en Rennes: el Parc du Thabor, el jardín imprescindible',
  lede: 'Si buscas qué ver en Rennes, el Parc du Thabor es la parada obligada: 10 hectáreas de jardines magníficos y entrada gratuita en el centro.',
  facts: [
    { label: 'Entrada', value: 'Gratuita' },
    { label: 'Superficie', value: '10 hectáreas' },
    { label: 'Valoración Google', value: '≈ 4,7 / 5' },
    { label: 'Ubicación', value: 'Centro de Rennes' },
  ],
  introTitle: 'Por qué el Thabor es imprescindible para tu visita a Rennes',
  intro: [
    'Considerado uno de los parques más bellos de Francia, el Parc du Thabor combina un jardín francés, un jardín inglés y un jardín botánico. Está abierto todo el año y la entrada es gratuita, lo que lo convierte en una de las mejores actividades en Rennes, también con poco presupuesto.',
    'Se encuentra junto al centro histórico: la Catedral de San Pedro y el Parlamento de Bretaña quedan a pocos minutos a pie. Si estás preparando tu lista de qué ver en Rennes, reserva al menos una hora para pasear por sus avenidas, el rosedal y los invernaderos.',
  ],
  highlightsTitle: 'Qué hay dentro del Parc du Thabor',
  highlights: [
    {
      title: 'Rosedal (Roseraie)',
      body: 'Una de las colecciones de rosas más ricas de la región. En floración es un espectáculo de color y aroma, ideal para fotografiar.',
    },
    {
      title: 'Voladero gratuito & estanques',
      body: 'El aviario con sus aves y los estanques tranquilos encantan a las familias y a quien busca relax.',
    },
    {
      title: 'Jardín francés e inglés',
      body: 'Parterres formales y grandes praderas se combinan con senderos sombreados, riachuelos y miradores sobre la ciudad.',
    },
    {
      title: 'Jardín botánico & invernaderos',
      body: 'Una amplia colección botánica etiquetada, perfecta para curiosear mientras descubres qué ver en Rennes más allá de los monumentos.',
    },
  ],
  practicalTitle: 'Cómo llegar, horarios y consejos',
  practical: [
    'Entrada gratuita y apertura todo el año; el horario cambia según la estación.',
    'El parque está en la Place Saint-Mélaine, accesible a pie desde las estaciones de metro République (línea a) y Sainte-Anne (línea b).',
    'Junto al parque se encuentra la iglesia de Saint-Mélaine; la Catedral de San Pedro está a pocos minutos andando.',
    'Encaja perfectamente con un paseo por el casco antiguo de Rennes: la luz de la mañana o del atardecer es la mejor para las fotos.',
  ],
  mapTitle: 'Mapa: Parc du Thabor en Rennes',
  mapBody: 'Mapa interactivo del parque y sus alrededores en el centro de Rennes.',
  guideTitle: 'Planifica tu visita a Rennes',
  guideBody:
    'En la guía completa encontrarás horarios por temporada, indicaciones detalladas, recorridos a pie por el parque, ideas para días de lluvia y muchas fotos.',
  guideLinks: [
    { href: '/fr', label: 'Ir a la guía completa (en francés)' },
    { href: '/en', label: 'English guide' },
  ],
  topLinkLabel: 'Ir a la guía completa',
  footerNote:
    'Parc du Thabor, Place Saint-Mélaine, 35000 Rennes, France. Guía independiente – no es un sitio oficial del Ayuntamiento de Rennes.',
};
