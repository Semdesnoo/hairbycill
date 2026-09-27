import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import AddToCart from "./AddToCart";
import { products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.brand}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-16 md:grid-cols-2">
        <Reveal className="relative aspect-square overflow-hidden rounded-[10px] bg-charcoal/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="text-xs uppercase tracking-[0.25em] text-champagne">{product.brand}</p>
          <h1 className="mt-2 font-display text-4xl">{product.name}</h1>
          <p className="mt-2 text-champagne tracking-widest">★★★★★ reviews</p>
          <p className="mt-4 text-2xl">{product.price}</p>
          <p className="mt-2 text-sm text-ink/50">{product.volume}</p>
          <p className="mt-6 font-display text-xl text-ink/80">“{product.benefit}”</p>
          <p className="mt-4 text-ink/70">{product.description}</p>

          <div className="mt-8">
            <AddToCart />
          </div>

          <ul className="mt-8 space-y-2 text-sm text-ink/70">
            <li>✓ Professionele salonkwaliteit</li>
            <li>✓ Geselecteerd door Hair by Cill</li>
            <li>✓ Geschikt voor thuisgebruik</li>
          </ul>
        </Reveal>
      </div>

      <div className="mx-auto mt-24 max-w-3xl divide-y divide-ink/10">
        <div className="py-8">
          <h2 className="font-display text-2xl">Over dit product</h2>
          <p className="mt-3 text-ink/70">{product.description}</p>
        </div>
        <div className="py-8">
          <h2 className="font-display text-2xl">Gebruik</h2>
          <p className="mt-3 text-ink/70">{product.usage}</p>
        </div>
        <div className="py-8">
          <h2 className="font-display text-2xl">Voor welk haartype?</h2>
          <p className="mt-3 text-ink/70">{product.hairType}</p>
        </div>
        <div className="py-8">
          <h2 className="font-display text-2xl">Ingrediënten</h2>
          <p className="mt-3 text-ink/70">{product.ingredients}</p>
        </div>
        <div className="py-8">
          <h2 className="font-display text-2xl">Veelgestelde vragen</h2>
          <div className="mt-3 space-y-4">
            {product.faqs.map((f) => (
              <div key={f.q}>
                <p className="font-medium text-ink">{f.q}</p>
                <p className="mt-1 text-ink/70">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="mb-10 text-center font-display text-3xl">Gerelateerde producten</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
