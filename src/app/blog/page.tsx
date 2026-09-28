import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Haartips & blog van onze kapsalon in Rhoon",
  description:
    "Haartips van de stylisten van Hair by Cill in Rhoon: balayage onderhouden, föhnen zonder hitteschade, het juiste haarmasker kiezen en krullen verzorgen.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <PageHero
        title="Haartips uit"
        accent="de salon"
        intro="Praktisch advies van onze stylisten in Rhoon, zodat je haar ook thuis op zijn mooist blijft."
        image="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1920&auto=format&fit=crop"
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 sm:grid-cols-2 md:py-28 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08}>
            <Link href={`/blog/${p.slug}`} className="group block h-full rounded-2xl bg-ivory/70 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={p.image} alt={p.h1} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h2 className="mt-4 px-1 text-lg leading-tight">
                {p.title} <span className="accent text-gold-muted">{p.accent}</span>
              </h2>
              <p className="mt-2 px-1 text-sm leading-relaxed text-black/55">{p.text}</p>
              <p className="mt-3 px-1 pb-2 text-[11px] text-black/45">{p.read}</p>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
