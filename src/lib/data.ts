import { BASE_PATH } from "./basePath";

// Centraal data-bestand: pas hier prijzen, behandelingen, producten en
// contactgegevens aan. Alle pagina's lezen hieruit — nergens anders hardcoded.

/** Appointments go through WhatsApp only: opens a chat with a ready-made message (optionally for one treatment). */
export const whatsappBooking = (treatment?: string) =>
  `${business.whatsappHref}?text=${encodeURIComponent(
    `Hoi Hair by Cill! Ik wil graag een afspraak maken${treatment ? ` voor ${treatment.toLowerCase()}` : ""}. Wanneer is er plek?`,
  )}`;

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
  { href: "/prijslijst", label: "Prijslijst" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export type PriceItem = { name: string; price: string };
export type PriceIcon = "scissors" | "dryer" | "bowl" | "lotus" | "hair";
export type PriceCategory = { title: string; icon: PriceIcon; items: PriceItem[] };

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
    image: `${BASE_PATH}/img/knippen.jpg`,
  },
  {
    slug: "styling",
    accent: "Moment",
    duration: "30-45 min",
    price: priceFrom("Stylen", (n) => n.includes("föhnen")),
    name: "Stylen",
    description: "Wassen en föhnen, voor kort en lang haar.",
    image: `${BASE_PATH}/img/spiegel.jpg`,
  },
  {
    slug: "kleuren",
    accent: "Glans",
    duration: "90 min",
    price: priceFrom("Kleuren", (n) => n.startsWith("Uitgroei") || n.startsWith("Kleuren")),
    name: "Kleuren",
    description: "Uitgroei bijwerken of volledig kleuren, voor kort en lang haar.",
    image: `${BASE_PATH}/img/kleuren.jpg`,
  },
  {
    slug: "folies",
    accent: "Licht",
    duration: "120-150 min",
    price: priceFrom("Kleuren", (n) => n.startsWith("Folies")),
    name: "Folies",
    description: "Highlights met folies: scalp, half of geheel, met toner als finishing touch.",
    image: `${BASE_PATH}/img/folies.jpg`,
  },
  {
    slug: "verlenging",
    accent: "Volume",
    duration: "60-120 min",
    price: priceFrom("Haar verdikking / verlenging", (n) => n.includes("baan") && !n.startsWith("Verwijderen")),
    name: "Verlenging",
    description: "Haar verdikking of verlenging met banen, van 1 tot 4 banen.",
    image: `${BASE_PATH}/img/lang-haar.jpg`,
  },
];

// Team-weergave op de homepage. Los van `stylists` zodat de boekingswizard
// alleen echte boekbare stylisten toont.
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Priscilla",
    role: "Eigenaar & stylist",
    bio: "Oprichter van Hair by Cill. Bij haar ben je in vertrouwde handen.",
    image:
      `${BASE_PATH}/team/priscilla.jpg`,
  },
  {
    name: "Cecilia",
    role: "Stylist",
    bio: "Knippen, kleuren en stylen met oog voor detail. Bij haar ben je in vertrouwde handen.",
        image:
      `${BASE_PATH}/team/cecilia.jpg`,
  },
];
