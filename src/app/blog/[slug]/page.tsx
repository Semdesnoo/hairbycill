import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import { findPost, posts } from "@/lib/blog";
import { business } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = findPost((await params).slug);
  if (!post) return {};
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.metaTitle, description: post.metaDescription, images: [post.image], publishedTime: post.date },
  };
}

const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = findPost((await params).slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  // Article + FAQPage rich results. JSON.stringify of our own static data only, safe to inline.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.h1,
      description: post.metaDescription,
      image: post.image,
      datePublished: post.date,
      inLanguage: "nl-NL",
      author: { "@type": "Organization", name: business.name },
      publisher: { "@type": "HairSalon", name: business.name, address: business.address },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <article className="px-6 pb-28 pt-32 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mx-auto max-w-3xl">
        <nav aria-label="Kruimelpad" className="text-xs text-black/45">
          <Link href="/" className="hover:text-black">Home</Link> <span className="mx-1.5">/</span>
          <Link href="/blog" className="hover:text-black">Haartips</Link>
        </nav>
        <h1 className="mt-5 text-4xl leading-[1.08] md:text-5xl">{post.h1}</h1>
        <p className="mt-4 text-xs text-black/45">
          <time dateTime={post.date}>{longDate(post.date)}</time> · {post.read} · door de stylisten van {business.name}
        </p>
      </header>

      <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-ivory">
        <Image src={post.image} alt={post.h1} fill priority sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <p className="text-lg leading-relaxed text-black/75">{post.intro}</p>

        {post.sections.map((s) => (
          <section key={s.h2} className="mt-10">
            <h2 className="text-2xl md:text-3xl">{s.h2}</h2>
            {s.p.map((t) => (
              <p key={t.slice(0, 24)} className="mt-4 leading-relaxed text-black/70">{t}</p>
            ))}
            {s.list && (
              <ul className="mt-4 space-y-2 text-black/70">
                {s.list.map((li) => (
                  <li key={li} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-muted" />
                    {li}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-14">
          <h2 className="mb-4 text-2xl md:text-3xl">Veelgestelde vragen</h2>
          <Accordion items={post.faqs.map((f) => ({ title: f.q, content: f.a }))} />
        </section>

        <aside className="mt-14 rounded-3xl bg-black p-8 text-offwhite md:p-10">
          <p className="text-2xl font-light">
            Liever advies <span className="accent text-gold">in de salon?</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-offwhite/65">
            Onze stylisten in Rhoon kijken graag met je mee. Je vindt ons aan de {business.address}.
          </p>
          <Button href={post.treatment ? `/afspraak?treatment=${post.treatment}` : "/afspraak"} variant="light" className="mt-6">
            Plan je afspraak
          </Button>
        </aside>
      </div>

      <section className="mx-auto mt-24 max-w-6xl">
        <h2 className="mb-8 text-3xl">
          Meer <span className="accent text-gold-muted">haartips</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {more.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-2xl bg-ivory/70 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={p.image} alt={p.h1} fill sizes="(min-width:640px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-4 px-1 pb-2 text-base leading-tight">
                {p.title} <span className="accent text-gold-muted">{p.accent}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
