import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import ProductCard, { discountPct } from "@/components/ProductCard";
import { BASE_PATH } from "@/lib/basePath";
import { business, euroToNumber, formatEuro, products, SHIPPING, team } from "@/lib/data";
import BuyBox from "./BuyBox";
import ProductGallery from "./ProductGallery";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: `${product.name} - ${product.brand}`, description: `${product.story.title}. ${product.description}` };
}

// Our own result photos next to the product shot (Dore & Rose: product + detail side by side).
const GALLERY_PHOTOS = ["/work/03.jpg", "/work/09.jpg", "/work/06.jpg"];

const ICON = {
  details: "M4 4h12l4 4v12H4zM8 10h8M8 14h8M8 18h5",
  care: "M5 3h14v18H5zM9 3v4h6V3M12 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  ship: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01",
};
const Ico = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const pct = discountPct(product);
  const others = [
    ...products.filter((p) => p.slug !== product.slug && p.brand === product.brand),
    ...products.filter((p) => p.slug !== product.slug && p.brand !== product.brand),
  ];
  const specs = [
    ["Merk", product.brand],
    ["Inhoud", product.volume],
    ["Geschikt voor", product.hairType],
    ...(product.ingredients ? [["Belangrijkste ingrediënten", product.ingredients]] : []),
    ...(product.freeOf.length ? [["Vrij van", product.freeOf.join(", ")]] : []),
  ];
  const wa = (q: string) => `${business.whatsappHref}?text=${encodeURIComponent(`Hoi! Vraag over ${product.name}: ${q}`)}`;

  return (
    <>
      {/* ABOVE THE FOLD: photos flush left, buy box right */}
      <section className="pb-16 pt-24 md:pt-28">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-7">
          <div className="px-4 lg:px-0">
            <ProductGallery
              alt={product.name}
              images={[{ src: product.image }, ...GALLERY_PHOTOS.map((src) => ({ src: `${BASE_PATH}${src}`, label: "Resultaat uit de salon" }))]}
            />
          </div>

          <div className="px-4 lg:pr-8">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs text-black/60">{product.brand}</p>
              <h1 className="mt-1 flex flex-wrap items-center gap-3 text-4xl font-semibold tracking-tight">
                {product.name}
                {pct > 0 && <span className="rounded bg-black px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-gold">Salonaanbieding</span>}
              </h1>

              {/* Social proof: our own stylists, no invented numbers */}
              <div className="mt-3 flex items-center gap-2.5">
                <span className="flex -space-x-2">
                  {team.map((m) => (
                    <span key={m.name} className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white">
                      <Image src={m.image} alt="" fill sizes="28px" className="object-cover" />
                    </span>
                  ))}
                </span>
                <p className="text-xs text-black/70">
                  <span className="font-semibold text-black">{team.map((m) => m.name).join(" & ")}</span> gebruiken dit dagelijks in de salon
                </p>
              </div>

              <p className="mt-4 flex items-center gap-2.5">
                {product.oldPrice && <span className="text-sm text-red-700 line-through">{product.oldPrice}</span>}
                <span className="text-xl font-semibold">{product.price}</span>
                {pct > 0 && <span className="rounded bg-black px-1.5 py-0.5 text-[10px] font-bold text-gold">{pct}% KORTING</span>}
              </p>
              {product.oldPrice && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-xs font-semibold text-offwhite">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-gold" aria-hidden>
                    <path d="M3 12V4h8l10 10-8 8L3 12Zm5-5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                  </svg>
                  Salonaanbieding
                  <span className="text-offwhite/30">|</span>
                  <span className="font-normal">
                    Je bespaart <span className="font-semibold text-gold">{formatEuro(euroToNumber(product.oldPrice) - euroToNumber(product.price))}</span>
                  </span>
                </p>
              )}

              <p className="mt-6 text-xs">
                <span className="font-semibold uppercase">Geschikt voor</span>
                <span className="mx-2 text-black/25">|</span>
                <span className="text-black/60">{product.hairType}</span>
              </p>

              <div className="mt-6">
                <BuyBox product={product} />
              </div>

              {/* Checklist box */}
              <div className="mt-8 space-y-1.5 bg-ivory px-5 py-4 text-sm">
                <p className="mb-2 font-medium">{product.story.title}</p>
                {product.highlights.map((h) => (
                  <p key={h} className="font-medium">
                    ✓ {h}
                  </p>
                ))}
              </div>

              {/* Ask the salon (D&R "Ask me anything"): opens WhatsApp with the question prefilled */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["Past dit bij mijn haar?", "Hoe vaak gebruik ik het?"].map((q) => (
                  <a
                    key={q}
                    href={wa(q)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded border border-black/15 px-3 py-2 text-xs transition-colors hover:border-black"
                  >
                    <span className="text-gold-muted">✦</span> {q}
                  </a>
                ))}
              </div>
              <form action={business.whatsappHref} target="_blank" className="mt-2 flex items-center gap-2 rounded border border-black/15 p-1.5 pl-4">
                <input
                  name="text"
                  required
                  aria-label="Stel je vraag aan de salon"
                  placeholder="STEL JE VRAAG AAN DE SALON..."
                  className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-black/50"
                />
                <button type="submit" aria-label="Verstuur via WhatsApp" className="flex h-9 w-9 shrink-0 items-center justify-center bg-black text-gold">
                  ↑
                </button>
              </form>

              <div className="mt-6 [&_button]:uppercase [&_button]:text-xs">
                <Accordion
                  items={[
                    {
                      title: "Details",
                      icon: <Ico d={ICON.details} />,
                      content: (
                        <dl className="divide-y divide-black/5">
                          {specs.map(([k, v]) => (
                            <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-2">
                              <dt className="font-medium text-black">{k}</dt>
                              <dd>{v}</dd>
                            </div>
                          ))}
                        </dl>
                      ),
                    },
                    {
                      title: "Gebruik",
                      icon: <Ico d={ICON.care} />,
                      content: (
                        <>
                          <ol className="list-decimal space-y-1 pl-5">
                            {product.steps.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ol>
                          <p className="mt-3">
                            <span className="font-medium text-black">Tip van onze stylisten:</span> {product.tip}
                          </p>
                        </>
                      ),
                    },
                    {
                      title: "Verzending en afhalen",
                      icon: <Ico d={ICON.ship} />,
                      content: `Gratis afhalen in de salon (${business.address}). Thuisbezorgd binnen 2-4 werkdagen voor ${formatEuro(
                        SHIPPING.cost,
                      )}, gratis vanaf ${formatEuro(SHIPPING.freeFrom)}.`,
                    },
                  ]}
                />
              </div>

              {/* You'll also love: compact scroll row */}
              <p className="mt-8 text-lg font-semibold">Dit vind je ook mooi</p>
              <ul className="mt-4 flex gap-4 overflow-x-auto pb-3 [scrollbar-color:#000_#e5e5e5] [scrollbar-width:thin]">
                {others.slice(0, 6).map((p) => (
                  <li key={p.slug} className="w-40 shrink-0">
                    <Link href={`/producten/${p.slug}`} className="group block">
                      <span className="relative block aspect-[4/5] overflow-hidden bg-ivory">
                        <Image src={p.image} alt={p.name} fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </span>
                      <span className="mt-2 block truncate text-sm font-semibold">{p.name}</span>
                      <span className="block text-sm">
                        {p.oldPrice && <span className="mr-2 text-red-700 line-through">{p.oldPrice}</span>}
                        {p.price}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MORE IN THIS COLLECTION */}
      <section className="pb-20 pt-8">
        <div className="flex items-end justify-between px-4 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">Meer van {product.brand}</h2>
          <Link href="/producten" className="text-xs uppercase tracking-[0.15em] hover:underline">
            Alles bekijken
          </Link>
        </div>
        <ul className="mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:px-8">
          {others.map((p) => (
            <li key={p.slug} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[calc((100vw-4rem-5rem)/6)]">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-28 md:px-8">
        <h2 className="text-center text-3xl font-semibold tracking-tight">Van twijfel naar zeker</h2>
        <div className="mt-8">
          <Accordion
            items={[
              ...product.faqs.map((f) => ({ title: f.q, content: f.a })),
              {
                title: "Twijfel je of dit bij jouw haar past?",
                content: "Stuur ons een berichtje of vraag het tijdens je volgende afspraak. We kijken graag met je mee welk product het beste bij jouw haar past.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
