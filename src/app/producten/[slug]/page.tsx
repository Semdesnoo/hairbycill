import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { discountPct } from "@/components/ProductCard";
import { business, products } from "@/lib/data";
import BuyBox from "./BuyBox";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: `${product.name} - ${product.brand}`, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const pct = discountPct(product);
  const related = [
    ...products.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...products.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ].slice(0, 4);

  return (
    <section className="px-4 pb-28 pt-28 md:px-8 md:pb-32 md:pt-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(420px,0.95fr)] lg:gap-14">
        {/* Photo: sticky while the details scroll by */}
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
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black text-[9px] text-offwhite">
                  ✓
                </span>
                {h}
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center gap-3">
            {product.oldPrice && <span className="text-sm text-red-700 line-through">{product.oldPrice}</span>}
            <span className="text-2xl">{product.price}</span>
            {pct > 0 && (
              <span className="rounded-md bg-black px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-offwhite">
                {pct}% korting
              </span>
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

          <div className="mt-10 rounded-2xl bg-ivory/70 p-6">
            <p className="font-medium">{product.benefit}</p>
            <p className="mt-2 text-sm leading-relaxed text-black/65">{product.description}</p>
          </div>

          <a
            href={`${business.whatsappHref}?text=${encodeURIComponent(`Hoi! Ik heb een vraag over ${product.name}: `)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex items-center justify-between rounded-full border border-black px-6 py-3.5 text-sm font-medium transition-colors hover:bg-black hover:text-offwhite"
          >
            Twijfel je? Vraag onze stylisten om advies
            <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
          </a>

          <div className="mt-8">
            <Accordion
              items={[
                { title: "Details", content: `${product.description} Inhoud: ${product.volume}.` },
                { title: "Gebruik", content: product.usage },
                { title: "Ingrediënten", content: product.ingredients },
                ...product.faqs.map((f) => ({ title: f.q, content: f.a })),
              ]}
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-28 md:mt-36">
        <h2 className="mb-10 text-3xl md:text-4xl">
          Dit vind je <span className="accent text-gold-muted">ook mooi</span>
        </h2>
        <ProductGrid products={related} />
      </div>
    </section>
  );
}
