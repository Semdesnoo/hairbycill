// Centraal data-bestand: pas hier prijzen, behandelingen, producten en
// contactgegevens aan. Alle pagina's lezen hieruit — nergens anders hardcoded.

export const business = {
  name: "Hair by Cill",
  tagline: "Hair that feels like you.",
  phone: "+31 6 12 34 56 78",
  phoneHref: "tel:+316****5678",
  whatsappHref: "https://wa.me/31612345678",
  email: "info@hairbycill.nl",
  address: "Kerkstraat 12, 1234 AB Voorbeeldstad",
  instagram: "https://instagram.com/hairbycill",
  facebook: "https://facebook.com/hairbycill",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Kerkstraat+12+Voorbeeldstad&output=embed",
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
      "https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "any",
    name: "Geen voorkeur",
    role: "Eerste beschikbare stylist",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
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
  description: string;
  image: string;
};

export const treatments: Treatment[] = [
  {
    slug: "knippen",
    name: "Knippen",
    description: "Een precisiecoupe afgestemd op jouw gezicht en haarstructuur.",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "kleuren",
    name: "Kleuren",
    description: "Diepe, egale kleur of een subtiele verfrissing van je uitgroei.",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "balayage",
    name: "Balayage",
    description: "Handgeschilderde highlights voor een natuurlijk, zonnig effect.",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "highlights",
    name: "Highlights",
    description: "Dimensie en glans met precisie geplaatste highlights.",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "styling",
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
  volume: string;
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

export type Review = { name: string; treatment: string; text: string };

export const reviews: Review[] = [
  {
    name: "Sanne V.",
    treatment: "Balayage",
    text: "Ik ben iedere keer weer ontzettend blij met mijn haar. Er wordt echt naar je geluisterd en er wordt uitgebreid de tijd genomen.",
  },
  {
    name: "Fleur D.",
    treatment: "Knippen & kleuren",
    text: "Eindelijk een salon die precies begrijpt wat ik bedoel. Het resultaat overtreft elke keer mijn verwachting.",
  },
  {
    name: "Mila K.",
    treatment: "Highlights",
    text: "Professioneel, warm en oprecht persoonlijk advies. Ik kom voor geen enkele andere kapper meer.",
  },
];

// aspect: gebruikt door de editorial portfolio-grid voor variatie in beeldverhouding.
export const galleryImages: { src: string; aspect: "portrait" | "square" | "landscape" }[] = [
  { src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000&auto=format&fit=crop", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1554519515-242161756769?q=80&w=1200&auto=format&fit=crop", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=1000&auto=format&fit=crop", aspect: "portrait" },
];
