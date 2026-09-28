import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ImageReveal from "@/components/ImageReveal";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import ProductGrid from "@/components/ProductGrid";
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
  return { title: `${product.name} - ${product.brand}`, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-28 pt-32 md:pb-32 md:pt-40">
      <div className="grid gap-12 lg:grid-cols-[60%_40%] lg:gap-16">
        <ImageReveal
          src={product.image}
          alt={product.name}
          className="aspect-square w-full rounded-2xl bg-ivory"
          sizes="(min-width: 1024px) 55vw, 100vw"
          priority
        />

        <Reveal delay={0.15}>
          <p className="text-xs text-gold-muted">{product.brand}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl">{product.price}</p>
          <p className="mt-1 text-sm text-black/50">{product.volume}</p>
          <p className="mt-6 text-black/70">{product.description}</p>

          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="text-black/50">Geschikt voor</dt>
              <dd>{product.hairType}</dd>
            </div>
            <div>
              <dt className="text-black/50">Resultaat</dt>
              <dd>{product.benefit}</dd>
            </div>
          </dl>

          <div className="mt-10">
            <AddToCart />
          </div>

          <div className="mt-14">
            <Accordion
              items={[
                { title: "Productdetails", content: product.description },
                { title: "Gebruik", content: product.usage },
                { title: "Ingrediënten", content: product.ingredients },
                { title: "Haartype", content: product.hairType },
              ]}
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-28 md:mt-40">
        <h2 className="mb-12 text-3xl md:text-4xl">Misschien ook <span className="accent text-gold-muted">iets voor jou</span></h2>
        <ProductGrid products={related} />
      </div>
    </section>
  );
}
