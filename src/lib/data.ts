// Centraal data-bestand: pas hier prijzen, behandelingen, producten en
// contactgegevens aan. Alle pagina's lezen hieruit — nergens anders hardcoded.

export const business = {
  name: "Hair by Cill",
  tagline: "Hair that feels like you.",
  phone: "+31 6 12 34 56 78",
  phoneHref: "tel:+316****5678",
  whatsappHref: "https://wa.me/31612345678",
  email: "info@hairbycill.nl",
  address: "Dorpsdijk 114, 3161 CD Rhoon",
  instagram: "https://instagram.com/hairbycill",
  facebook: "https://facebook.com/hairbycill",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Dorpsdijk+114,+3161+CD+Rhoon&output=embed",
} as const;

export const openingHours = [
  { day: "Maandag", hours: "Gesloten" },
  { day: "Dinsdag", hours: "09:00-18:00" },
  { day: "Woensdag", hours: "09:00-18:00" },
  { day: "Donderdag", hours: "09:00-20:00" },
  { day: "Vrijdag", hours: "09:00-18:00" },
  { day: "Zaterdag", hours: "09:00-16:00" },
  { day: "Zondag", hours: "Gesloten" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/afspraak", label: "Afspraak" },
  { href: "/prijslijst", label: "Prijslijst" },
  { href: "/producten", label: "Producten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export type PriceItem = { name: string; price: string };
export type PriceCategory = { title: string; items: PriceItem[] };

export type Stylist = { slug: string; name: string; role: string; image: string };

export const stylists: Stylist[] = [
  {
    slug: "cill",
    name: "Cill",
    role: "Eigenaar & senior stylist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "noor",
    name: "Noor",
    role: "Colorist",
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

export const priceList: PriceCategory[] = [
  {
    title: "Knippen",
    items: [
      { name: "Dames knippen", price: "€ 45,00" },
      { name: "Wassen, knippen & föhnen", price: "€ 55,00" },
      { name: "Pony knippen", price: "€ 12,50" },
    ],
  },
  {
    title: "Kleuren",
    items: [
      { name: "Uitgroei kleuren", price: "vanaf € 55,00" },
      { name: "Volledig kleuren", price: "vanaf € 75,00" },
      { name: "Toner", price: "vanaf € 30,00" },
    ],
  },
  {
    title: "Balayage & Highlights",
    items: [
      { name: "Balayage", price: "vanaf € 120,00" },
      { name: "Highlights gedeeltelijk", price: "vanaf € 65,00" },
      { name: "Highlights volledig", price: "vanaf € 95,00" },
    ],
  },
  {
    title: "Styling",
    items: [
      { name: "Föhnen", price: "€ 30,00" },
      { name: "Krullen / styling", price: "vanaf € 35,00" },
    ],
  },
  {
    title: "Extra",
    items: [{ name: "Hair treatment", price: "€ 25,00" }],
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

export const treatments: Treatment[] = [
  {
    slug: "knippen",
    accent: "Precisie",
    duration: "45 min",
    price: "€ 45",
    name: "Knippen",
    description: "Een precisiecoupe afgestemd op jouw gezicht en haarstructuur.",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "kleuren",
    accent: "Glans",
    duration: "90 min",
    price: "€ 75",
    name: "Kleuren",
    description: "Diepe, egale kleur of een subtiele verfrissing van je uitgroei.",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "balayage",
    accent: "Zon",
    duration: "150 min",
    price: "€ 120",
    name: "Balayage",
    description: "Handgeschilderde highlights voor een natuurlijk, zonnig effect.",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "highlights",
    accent: "Licht",
    duration: "120 min",
    price: "€ 95",
    name: "Highlights",
    description: "Dimensie en glans met precisie geplaatste highlights.",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "styling",
    accent: "Moment",
    duration: "45 min",
    price: "€ 35",
    name: "Styling",
    description: "Föhnen, krullen of een look voor die speciale gelegenheid.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1400&auto=format&fit=crop",
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
    name: "Cill",
    role: "Eigenaar & senior stylist",
    bio: "10 jaar ervaring in knippen en stylen. Bij haar ben je in vertrouwde handen.",
    email: "cill@hairbycill.nl",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Noor",
    role: "Colorist",
    bio: "7 jaar ervaring in kleuren en balayage. Bij haar ben je in vertrouwde handen.",
    email: "noor@hairbycill.nl",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Lisa",
    role: "Stylist",
    bio: "5 jaar ervaring in knippen en föhnen. Bij haar ben je in vertrouwde handen.",
    email: "lisa@hairbycill.nl",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Emma",
    role: "Haarspecialist",
    bio: "12 jaar ervaring in verzorging en advies. Bij haar ben je in vertrouwde handen.",
    email: "emma@hairbycill.nl",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  },
];

// aspect: gebruikt door de editorial portfolio-grid voor variatie in beeldverhouding.
export const galleryImages: { src: string; aspect: "portrait" | "square" | "landscape" }[] = [
  { src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1000&auto=format&fit=crop", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1554519515-242161756769?q=80&w=1200&auto=format&fit=crop", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1200&auto=format&fit=crop", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1000&auto=format&fit=crop", aspect: "portrait" },
];

// Salon-tips op de homepage ("Tips uit de salon").
export const tips: { title: string; accent: string; text: string; read: string; image: string }[] = [
  {
    title: "Zo houd je balayage",
    accent: "langer mooi",
    text: "Met een paar kleine aanpassingen in je routine blijft je kleur weken frisser en warmer.",
    read: "4 min lezen",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Föhnen zonder",
    accent: "hitteschade",
    text: "De juiste volgorde van producten en temperatuur maakt het verschil voor glans.",
    read: "3 min lezen",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Welk masker past",
    accent: "bij jouw haar",
    text: "Droog, fijn of gekleurd: zo kies je een verzorging die echt iets doet.",
    read: "5 min lezen",
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Je eerste afspraak",
    accent: "bij ons",
    text: "Wat je kunt verwachten, van het adviesgesprek tot de laatste finishing touch.",
    read: "2 min lezen",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Krullen verzorgen",
    accent: "met rust",
    text: "Minder wassen, meer vocht: de basis voor definitie zonder pluis.",
    read: "4 min lezen",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
  },
];

/** "€24,95" -> 24.95 */
export const euroToNumber = (p: string) => parseFloat(p.replace(/[^\d,]/g, "").replace(",", "."));
export const formatEuro = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
/** Bundle offer on product pages: discount on the 2nd item. Set to 0 to hide the 2-pack option. */
export const SECOND_ITEM_DISCOUNT = 0.2;
