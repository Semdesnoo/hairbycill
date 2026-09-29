import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Accordion from "@/components/Accordion";
import AnimatedHeading from "@/components/AnimatedHeading";
import Button from "@/components/Button";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { discountPct } from "@/components/ProductCard";
import { BASE_PATH } from "@/lib/basePath";
import { business, formatEuro, products, SHIPPING } from "@/lib/data";
import BuyBox from "./BuyBox";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: `${product.name} - ${product.brand}`, description: `${product.story.title}. ${product.description}` };
}

// Our own result photos illustrate the feature blocks (alternating left/right).
const FEATURE_PHOTOS = ["/work/03.jpg", "/work/09.jpg"];

const TRUST = [
  { icon: "M3 7h13l5 5v5h-3M3 7v10h2M3 7l2-3h9l2 3M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01", label: `Gratis bezorging vanaf ${formatEuro(SHIPPING.freeFrom)}` },
  { icon: "M4 10h16l-1 10H5L4 10ZM8 10V7a4 4 0 0 1 8 0v3", label: "Gratis afhalen in Rhoon" },
  { icon: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z", label: "Gebruikt in onze salon" },
  { icon: "M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11Z", label: "Persoonlijk advies van onze stylisten" },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const pct = discountPct(product);
  const related = [
    ...products.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...products.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ].slice(0, 4);
  const specs = [
    ["Merk", product.brand],
    ["Inhoud", product.volume],
    ["Geschikt voor", product.hairType],
    ["Belangrijkste ingrediënten", product.ingredients],
    ...(product.freeOf.length ? [["Vrij van", product.freeOf.join(", ")]] : []),
    ["Gebruik", product.usage],
  ];

  return (
    <>
      {/* ABOVE THE FOLD: photo + buy box */}
      <section className="px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(420px,0.95fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {/* Above the fold: CSS fade on load, NOT whileInView (the observer never fired here and left it at opacity 0) */}
            <div className="relative aspect-square w-full animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_both] overflow-hidden rounded-2xl bg-ivory lg:aspect-[4/3.4]">
              <Image src={product.image} alt={product.name} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
            </div>
          </div>

          <Reveal delay={0.1}>
            <p className="text-xs text-black/50">{product.brand}</p>
            <h1 className="mt-1 text-4xl font-medium tracking-tight md:text-5xl">{product.name}</h1>
            <p className="mt-2 text-sm text-black/60">
              {product.benefit} · {product.volume}
            </p>

            <ul className="mt-6 space-y-2.5">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black text-[9px] text-gold">✓</span>
                  {h}
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-center gap-3">
              {product.oldPrice && <span className="text-sm text-red-700 line-through">{product.oldPrice}</span>}
              <span className="text-2xl">{product.price}</span>
              {pct > 0 && (
                <span className="rounded-md bg-black px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-gold">{pct}% korting</span>
              )}
            </p>

            <p className="mt-6 text-xs">
              <span className="font-medium uppercase tracking-wider">Geschikt voor</span>
              <span className="mx-2 text-black/25">|</span>
              <span className="text-black/60">{product.hairType}</span>
            </p>

            <div className="mt-6">
              <BuyBox product={product} />
            </div>

            {/* Story: why this product (Dore & Rose style intro box) */}
            <div className="mt-10 rounded-2xl bg-ivory/70 p-6">
              <p className="font-medium">{product.story.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/65">{product.story.text}</p>
            </div>

            <div className="mt-6">
              <Accordion
                items={[
                  { title: "Details", content: specs.map(([k, v]) => `${k}: ${v}`).join(" · ") },
                  { title: "Gebruik", content: product.usage },
                  {
                    title: "Verzending en afhalen",
                    content: `Gratis afhalen in de salon (${business.address}). Thuisbezorgd binnen 2-4 werkdagen voor ${formatEuro(
                      SHIPPING.cost,
                    )}, gratis vanaf ${formatEuro(SHIPPING.freeFrom)}.`,
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-gold/25 bg-white px-4 py-6 md:px-8">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-4">
          {TRUST.map((t) => (
            <li key={t.label} className="flex items-center gap-3 text-sm text-black/70">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gold-muted" aria-hidden>
                <path d={t.icon} />
              </svg>
              {t.label}
            </li>
          ))}
        </ul>
      </section>

      {/* FEATURE BLOCKS: alternating photo / text */}
      <section className="mx-auto max-w-6xl space-y-20 px-6 py-24 md:space-y-28 md:py-32">
        {product.features.map((f, i) => (
          <div key={f.title} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ivory">
                <Image src={`${BASE_PATH}${FEATURE_PHOTOS[i % FEATURE_PHOTOS.length]}`} alt="Resultaat uit onze salon" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.25em] text-gold-muted">0{i + 1}</p>
              <h2 className="mt-3 text-3xl leading-tight md:text-4xl">{f.title}</h2>
              <p className="mt-5 leading-relaxed text-black/65">{f.text}</p>
              <ul className="mt-6 space-y-3">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </section>

      {/* HOW TO USE */}
      <section className="bg-black px-6 py-24 text-offwhite md:py-28">
        <div className="mx-auto max-w-6xl">
          <AnimatedHeading lines={["Zo gebruik"]} accent="je het" className="text-center text-4xl leading-[1.05] md:text-5xl" />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {product.steps.map((s, i) => (
              <Reveal key={s} as="li" delay={i * 0.1} className="rounded-2xl border border-gold/25 bg-offwhite/[0.03] p-7">
                <span className="gold-foil text-4xl font-light">0{i + 1}</span>
                <p className="mt-4 leading-relaxed text-offwhite/80">{s}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-2xl bg-gold/10 p-6">
            <span className="accent text-2xl text-gold">Tip</span>
            <p className="text-sm leading-relaxed text-offwhite/80">
              <span className="text-offwhite">Van onze stylisten:</span> {product.tip}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-24 md:py-28">
        <Reveal>
          <h2 className="text-center text-3xl md:text-4xl">
            Veelgestelde <span className="accent text-gold-muted">vragen</span>
          </h2>
          <div className="mt-8">
            <Accordion
              items={[
                ...product.faqs.map((f) => ({ title: f.q, content: f.a })),
                {
                  title: "Kan ik het product ook in de salon ophalen?",
                  content: `Ja. Kies bij het afrekenen voor afhalen, dan leggen we het voor je klaar aan de ${business.address}. Afhalen is gratis en je betaalt in de salon.`,
                },
                {
                  title: "Twijfel je of dit bij jouw haar past?",
                  content: "Stuur ons een berichtje of vraag het tijdens je volgende afspraak. We kijken graag met je mee welk product het beste bij jouw haar past.",
                },
              ]}
            />
          </div>
        </Reveal>
      </section>

      {/* ADVICE CTA */}
      <section className="px-6 pb-8">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border border-gold/35 bg-white p-10 text-center md:flex-row md:justify-between md:p-12 md:text-left">
          <div>
            <p className="text-2xl md:text-3xl">
              Twijfel je? <span className="accent text-gold-muted">Vraag het onze stylisten</span>
            </p>
            <p className="mt-2 text-sm text-black/60">Persoonlijk advies over welk product bij jouw haar past.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/afspraak">Afspraak maken</Button>
            <a
              href={`${business.whatsappHref}?text=${encodeURIComponent(`Hoi! Ik heb een vraag over ${product.name}: `)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-black/20 px-6 py-2.5 text-sm transition-colors hover:border-black"
            >
              Stel een vraag
            </a>
          </div>
        </Reveal>
      </section>

      {/* RELATED */}
      <section className="px-4 pb-28 pt-20 md:px-8 md:pb-32">
        <h2 className="mb-10 text-3xl md:text-4xl">
          Dit vind je <span className="accent text-gold-muted">ook mooi</span>
        </h2>
        <ProductGrid products={related} />
      </section>
    </>
  );
}
