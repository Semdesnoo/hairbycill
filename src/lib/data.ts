// Centraal data-bestand: pas hier prijzen, behandelingen, producten en
// contactgegevens aan. Alle pagina's lezen hieruit — nergens anders hardcoded.

export const business = {
  name: "Hair by Cill",
  tagline: "Hair that feels like you.",
  phone: "+31 6 83 02 45 90",
  phoneHref: "tel:+31683024590",
  whatsappHref: "https://wa.me/31683024590",
  email: "info@hairbycill.nl",
  address: "Dorpsdijk 114, 3161 CD Rhoon",
  instagram: "https://instagram.com/hairbycill",
  facebook: "https://facebook.com/hairbycill",
  tiktok: "https://www.tiktok.com/@hairbycill",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Dorpsdijk+114,+3161+CD+Rhoon&output=embed",
} as const;

// A day may have several blocks, joined with " & " (bookingApi + JSON-LD parse every HH:MM-HH:MM).
export const openingHours = [
  { day: "Maandag", hours: "Gesloten" },
  { day: "Dinsdag", hours: "09:30-17:00" },
  { day: "Woensdag", hours: "09:30-17:00 & 18:30-21:00" },
  { day: "Donderdag", hours: "Gesloten" },
  { day: "Vrijdag", hours: "09:30-17:00" },
  { day: "Zaterdag", hours: "09:00-17:00" },
  { day: "Zondag", hours: "Gesloten" },
];

/** Every open block of a day as [openMinutes, closeMinutes]; empty when closed. */
export const hourBlocks = (hours: string): [number, number][] =>
  [...hours.matchAll(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/g)].map((m) => [+m[1] * 60 + +m[2], +m[3] * 60 + +m[4]]);

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/afspraak", label: "Afspraak" },
  { href: "/prijslijst", label: "Prijslijst" },
  { href: "/producten", label: "Producten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export type PriceItem = { name: string; price: string };
export type PriceIcon = "scissors" | "dryer" | "bowl" | "lotus" | "hair";
export type PriceCategory = { title: string; icon: PriceIcon; items: PriceItem[] };

export type Stylist = { slug: string; name: string; role: string; image: string };

export const stylists: Stylist[] = [
  {
    slug: "priscilla",
    name: "Priscilla",
    role: "Eigenaar & stylist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "mellissa",
    name: "Mellissa",
    role: "Stylist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "any",
    name: "Geen voorkeur",
    role: "Eerste beschikbare stylist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
  },
];

// Prices copied 1:1 from the salon's printed price list (Keune).
export const priceList: PriceCategory[] = [
  {
    title: "Knippen",
    icon: "scissors",
    items: [
      { name: "Knippen heren", price: "€ 29,50" },
      { name: "Knippen dames", price: "€ 29,50" },
      { name: "Wassen knippen", price: "€ 33,50" },
      { name: "Wassen knippen drogen kort haar", price: "€ 37,50" },
      { name: "Wassen knippen drogen lang haar", price: "€ 39,50" },
      { name: "Wassen knippen föhnen kort haar", price: "€ 47,50" },
      { name: "Wassen knippen föhnen lang haar", price: "€ 52,50" },
    ],
  },
  {
    title: "Stylen",
    icon: "dryer",
    items: [
      { name: "Wassen föhnen kort haar", price: "€ 32,50" },
      { name: "Wassen föhnen lang haar", price: "€ 37,50" },
      { name: "Wassen drogen na kleuring", price: "€ 17,50" },
    ],
  },
  {
    title: "Kleuren",
    icon: "bowl",
    items: [
      { name: "Uitgroei binnen 6 weken", price: "€ 52,50" },
      { name: "Kleuren kort haar", price: "€ 59,50" },
      { name: "Kleuren lang haar", price: "€ 72,50" },
      { name: "Folies scalp", price: "€ 69,50" },
      { name: "Folies half", price: "€ 82,50" },
      { name: "Folies geheel", price: "€ 92,50" },
      { name: "Toner na folies", price: "€ 39,50" },
      { name: "Toeslag extra lang/dik haar", price: "€ 10" },
    ],
  },
  {
    title: "Extra's",
    icon: "lotus",
    items: [
      { name: "Hoofdhuidmassage 5 min", price: "€ 9,50" },
      { name: "Hoofdhuidmassage 10 min", price: "€ 17,50" },
      { name: "Wenkbrauwen verven", price: "€ 12,50" },
      { name: "Bescherming tijdens kleuring", price: "€ 19,50" },
    ],
  },
  {
    title: "Haar verdikking / verlenging",
    icon: "hair",
    items: [
      { name: "1 baan", price: "€ 35" },
      { name: "2 banen", price: "€ 55" },
      { name: "3 banen", price: "€ 75" },
      { name: "4 banen", price: "€ 90" },
      { name: "Verwijderen per baan", price: "€ 10" },
    ],
  },
];

export type Treatment = {
  slug: string;
  name: string;
  /** Italic serif word shown after the name. */
  accent: string;
  description: string;
  duration: string;
  price: string;
  image: string;
};

/** "€ 24,95" -> 24.95 */
export const euroToNumber = (p: string) => parseFloat(p.replace(/[^\d,]/g, "").replace(",", "."));

/** "vanaf € X": lowest price in a price-list category (optionally filtered), so cards never drift from the list. */
function priceFrom(category: string, keep: (name: string) => boolean = () => true): string {
  const items = priceList.find((c) => c.title === category)?.items.filter((i) => keep(i.name)) ?? [];
  if (!items.length) throw new Error(`priceFrom: no prices for ${category}`);
  const min = items.reduce((m, i) => (euroToNumber(i.price) < euroToNumber(m.price) ? i : m));
  return `vanaf ${min.price}`;
}

// The bookable treatments = the categories of the printed price list.
export const treatments: Treatment[] = [
  {
    slug: "knippen",
    accent: "Precisie",
    duration: "30-60 min",
    price: priceFrom("Knippen"),
    name: "Knippen",
    description: "Dames en heren, met of zonder wassen, drogen of föhnen.",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "styling",
    accent: "Moment",
    duration: "30-45 min",
    price: priceFrom("Stylen", (n) => n.includes("föhnen")),
    name: "Stylen",
    description: "Wassen en föhnen, voor kort en lang haar.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "kleuren",
    accent: "Glans",
    duration: "90 min",
    price: priceFrom("Kleuren", (n) => n.startsWith("Uitgroei") || n.startsWith("Kleuren")),
    name: "Kleuren",
    description: "Uitgroei bijwerken of volledig kleuren, voor kort en lang haar.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "folies",
    accent: "Licht",
    duration: "120-150 min",
    price: priceFrom("Kleuren", (n) => n.startsWith("Folies")),
    name: "Folies",
    description: "Highlights met folies: scalp, half of geheel, met toner als finishing touch.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "verlenging",
    accent: "Volume",
    duration: "60-120 min",
    price: priceFrom("Haar verdikking / verlenging", (n) => n.includes("baan") && !n.startsWith("Verwijderen")),
    name: "Verlenging",
    description: "Haar verdikking of verlenging met banen, van 1 tot 4 banen.",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1400&auto=format&fit=crop",
  },
];

export type Product = {
  slug: string;
  brand: string;
  name: string;
  price: string;
  /** Optional "was" price: shows struck through + a -x% badge. */
  oldPrice?: string;
  volume: string;
  /** Three short check-marked selling points on the product page. */
  highlights: string[];
  category: "Shampoo" | "Conditioner" | "Treatment" | "Styling";
  description: string;
  benefit: string;
  usage: string;
  hairType: string;
  ingredients: string;
  faqs: { q: string; a: string }[];
  image: string;
  /** Product-page storytelling (Dore & Rose style): headline + intro under the buy box. */
  story: { title: string; text: string };
  /** Alternating image/text blocks further down the page. */
  features: { title: string; text: string; bullets: string[] }[];
  /** "Zo gebruik je het" in 3 steps. */
  steps: string[];
  /** Short practical tip from the salon. */
  tip: string;
  /** What the formula is free of (shown in the specs), empty when unknown. */
  freeOf: string[];
};

export const products: Product[] = [
  {
    slug: "silk-repair-shampoo",
    brand: "Kevin Murphy",
    name: "Silk Repair Shampoo",
    price: "€24,95",
    volume: "250 ml",
    oldPrice: "€29,95",
    highlights: ["Sulfaatvrij en kleurbeschermend", "Herstelt droog en beschadigd haar", "Zachte glans zonder te verzwaren"],
    category: "Shampoo",
    description: "Reinigt zacht terwijl het de haarvezel herstelt en beschermt.",
    benefit: "Voor zacht, glanzend en verzorgd haar.",
    usage: "Aanbrengen op nat haar, masseren, uitspoelen en herhalen indien nodig.",
    hairType: "Droog en beschadigd haar",
    ingredients: "Keratine, arganolie, vitamine E. Vrij van sulfaten.",
    faqs: [
      { q: "Geschikt voor gekleurd haar?", a: "Ja, sulfaatvrij en kleurbeschermend." },
      { q: "Dagelijks te gebruiken?", a: "Ja, mild genoeg voor dagelijks gebruik." },
    ],
    story: { title: "Zacht reinigen, zichtbaar herstel", text: "Een milde, sulfaatvrije shampoo die je haar reinigt zonder het uit te drogen. Keratine en arganolie verzorgen de haarvezel bij elke wasbeurt, zodat droog en beschadigd haar weer zacht en glanzend wordt. Wij gebruiken hem zelf dagelijks in de salon." },
    features: [
      { title: "Herstel bij elke wasbeurt", text: "Keratine vult de zwakke plekken in de haarvezel op, terwijl arganolie en vitamine E je haar voeden. Zo bouw je wasbeurt na wasbeurt aan sterker haar.", bullets: ["Minder breuk en gespleten punten", "Zachter en makkelijker te kammen", "Mild genoeg voor dagelijks gebruik"] },
      { title: "Je kleur blijft langer mooi", text: "Omdat de formule vrij is van sulfaten, spoelt je kleur minder snel uit. Ideaal na een kleurbehandeling of folies in de salon.", bullets: ["Kleurbeschermend en sulfaatvrij", "Zachte glans zonder te verzwaren", "Geschikt voor gekleurd en gelicht haar"] },
    ],
    steps: ["Maak je haar goed nat met lauw water.", "Masseer een kleine hoeveelheid in je hoofdhuid en laat het schuim door de lengtes lopen.", "Spoel goed uit en herhaal bij veel stylingproducten. Volg met een conditioner."],
    tip: "Was met lauw in plaats van heet water. Zo blijft de schubbenlaag gesloten en blijft je kleur langer mooi.",
    freeOf: ["Sulfaten"],
    image:
      "https://images.unsplash.com/photo-1585232351009-aa87416fca90?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "hydrate-conditioner",
    brand: "Kevin Murphy",
    name: "Hydrate-Me Conditioner",
    price: "€27,95",
    volume: "250 ml",
    highlights: ["Diepe hydratatie in 2 minuten", "Makkelijker doorkammen, minder klitten", "Voor zacht en soepel haar"],
    category: "Conditioner",
    description: "Intense hydratatie voor droog en dof haar.",
    benefit: "Voor diep gevoed en soepel haar.",
    usage: "Na het shampooën aanbrengen, 2-3 minuten laten intrekken.",
    hairType: "Droog, dof haar",
    ingredients: "Kokosolie, aloë vera, panthenol.",
    faqs: [{ q: "Maakt het plat haar?", a: "Nee, lichte formule zonder verzwaring." }],
    story: { title: "Diepe hydratatie in twee minuten", text: "Een lichte conditioner die droog en dof haar direct vocht geeft. Kokosolie, aloë vera en panthenol maken je haar zacht en soepel, zonder het plat te maken." },
    features: [
      { title: "Vocht dat je voelt", text: "Aloë vera en panthenol trekken vocht de haarvezel in, kokosolie houdt het vast. Het resultaat: soepel haar dat zacht aanvoelt, ook de dagen erna.", bullets: ["Direct zachter haar", "Makkelijker doorkammen, minder klitten", "Minder pluis bij droog weer"] },
      { title: "Licht, dus geen plat haar", text: "De formule is licht genoeg voor dagelijks gebruik, zodat je haar volume en beweging houdt.", bullets: ["Verzwaart niet", "Snel uitgespoeld", "Fijne basis voor iedere styling"] },
    ],
    steps: ["Knijp na het shampooën het overtollige water uit je haar.", "Verdeel de conditioner over de lengtes en punten, niet op de hoofdhuid.", "Laat 2 tot 3 minuten intrekken en spoel goed uit met koel water."],
    tip: "Kam de conditioner met een grove kam door je haar terwijl hij intrekt. Zo ontwar je zonder breuk.",
    freeOf: [],
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "repair-mask",
    brand: "Olaplex",
    name: "No.8 Bond Intense Mask",
    price: "€34,95",
    volume: "100 ml",
    oldPrice: "€42,95",
    highlights: ["Herstelt verbindingen in de haarvezel", "Ideaal na kleuren of blonderen", "Zichtbaar sterker haar na 1 gebruik"],
    category: "Treatment",
    description: "Intensief herstellend masker dat glans en veerkracht teruggeeft.",
    benefit: "Voor direct zichtbaar herstel en glans.",
    usage: "1x per week aanbrengen op handdoekdroog haar, 10 minuten laten intrekken.",
    hairType: "Beschadigd, gekleurd haar",
    ingredients: "Bond-building complex, zonnebloemzaadolie.",
    faqs: [{ q: "Kan het samen met kleurbehandeling?", a: "Ja, juist aanbevolen na kleuren." }],
    story: { title: "Herstel tot diep in de haarvezel", text: "Een intensief masker dat de verbindingen in je haar herstelt die breken door kleuren, blonderen en hitte. Je haar voelt direct sterker aan en krijgt zijn glans en veerkracht terug." },
    features: [
      { title: "Gemaakt voor gekleurd haar", text: "Kleuren en blonderen verzwakken de verbindingen in de haarvezel. Het bond-building complex herstelt die, zodat je haar sterker en gezonder wordt.", bullets: ["Ideaal na kleuren, folies of blonderen", "Zichtbaar sterker haar", "Meer glans en veerkracht"] },
      { title: "Eén keer per week is genoeg", text: "Gebruik het masker wekelijks als intensieve kuur. Je merkt het verschil na de eerste keer, en na een paar weken is je haar echt steviger.", bullets: ["Intensieve weekkuur", "Rijke maar lichte textuur", "Ook fijn na een zonvakantie"] },
    ],
    steps: ["Was je haar en dep het handdoekdroog.", "Breng het masker royaal aan van midden tot punten.", "Laat 10 minuten intrekken en spoel goed uit."],
    tip: "Zet er een warme handdoek omheen tijdens het intrekken. De warmte helpt het masker dieper door te dringen.",
    freeOf: [],
    image:
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "heat-protect-spray",
    brand: "ghd",
    name: "Heat Protect Spray",
    price: "€19,95",
    volume: "120 ml",
    highlights: ["Beschermt tot 230 graden", "Geen plakkerig gevoel", "Langer houdbare styling"],
    category: "Styling",
    description: "Beschermt tegen hitteschade tot 230°C, zonder verzwaring.",
    benefit: "Voor bescherming en extra glans bij stylen.",
    usage: "Sprayen op handdoekdroog haar voor het föhnen of stylen.",
    hairType: "Alle haartypes",
    ingredients: "Siliconen-complex, UV-filters.",
    faqs: [{ q: "Laat het haar vet aanvoelen?", a: "Nee, lichte spray-formule." }],
    story: { title: "Styling zonder hitteschade", text: "Deze spray legt een beschermend laagje om je haar voordat je gaat föhnen, stijlen of krullen. Je haar blijft sterk en glanzend, en je styling blijft langer mooi zitten." },
    features: [
      { title: "Bescherming tot 230 graden", text: "Of je nu föhnt, stijlt of krult: de spray verdeelt de warmte en beschermt de haarvezel tegen uitdroging en breuk.", bullets: ["Voor föhn, stijltang en krultang", "Minder droge en gespleten punten", "Beschermt ook tegen UV"] },
      { title: "Licht en onzichtbaar", text: "Geen plakkerig of vet gevoel: de spray trekt direct in en voegt alleen een zachte glans toe.", bullets: ["Verzwaart niet", "Geschikt voor alle haartypes", "Langer houdbare styling"] },
    ],
    steps: ["Sprayen op handdoekdroog haar, op zo'n 20 centimeter afstand.", "Kam de spray door zodat elk plukje bedekt is.", "Föhn of style zoals je gewend bent."],
    tip: "Zet je stijltang niet hoger dan 180 graden. Met deze spray is dat genoeg voor een gladde, glanzende look.",
    freeOf: [],
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
];

export type Review = { name: string; treatment: string; text: string; image: string };

export const reviews: Review[] = [
  {
    name: "Sanne V.",
    treatment: "Balayage",
    text: "Ik ben iedere keer weer ontzettend blij met mijn haar. Er wordt echt naar je geluisterd en er wordt uitgebreid de tijd genomen.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Fleur D.",
    treatment: "Knippen & kleuren",
    text: "Eindelijk een salon die precies begrijpt wat ik bedoel. Het resultaat overtreft elke keer mijn verwachting.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Mila K.",
    treatment: "Highlights",
    text: "Professioneel, warm en oprecht persoonlijk advies. Ik kom voor geen enkele andere kapper meer.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Lotte B.",
    treatment: "Styling",
    text: "Een verademing voor de branche. Stijlvol, modern en een omgeving waarin je je meteen thuis voelt.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
];

// Team-weergave op de homepage. Los van `stylists` zodat de boekingswizard
// alleen echte boekbare stylisten toont.
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  email: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Priscilla",
    role: "Eigenaar & stylist",
    bio: "Oprichter van Hair by Cill. Bij haar ben je in vertrouwde handen.",
    email: "priscilla@hairbycill.nl",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mellissa",
    role: "Stylist",
    bio: "Knippen, kleuren en stylen met oog voor detail. Bij haar ben je in vertrouwde handen.",
    email: "mellissa@hairbycill.nl",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
];

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
/** Bundle offer on product pages: discount on the 2nd item. Set to 0 to hide the 2-pack option. */
export const SECOND_ITEM_DISCOUNT = 0.2;
/** Home delivery (NL only). Placeholder rates: salon to confirm. */
export const SHIPPING = { cost: 4.95, freeFrom: 50 };
export const shippingCost = (subtotal: number) => (subtotal >= SHIPPING.freeFrom ? 0 : SHIPPING.cost);
