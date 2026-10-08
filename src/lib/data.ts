import productsJson from "./products.json" with { type: "json" };

// Centraal data-bestand: pas hier prijzen, behandelingen, producten en
// contactgegevens aan. Alle pagina's lezen hieruit — nergens anders hardcoded.

export const business = {
  name: "Hair by Cill",
  tagline: "Hair that feels like you.",
  phone: "+31 (0)85 782 6818",
  phoneHref: "tel:+31857826818",
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

// Managed in the dashboard (Supabase); scripts/fetch-products.mjs refreshes this file before each build.
export const products: Product[] = productsJson as Product[];

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
