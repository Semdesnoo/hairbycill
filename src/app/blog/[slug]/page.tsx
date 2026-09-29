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
      mainEntity: [{ q: post.h1, a: post.answer }, ...post.faqs].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const toc = post.sections.map((sec, i) => ({ id: `stap-${i + 1}`, h2: sec.h2 }));

  return (
    <article className="pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO: question + direct answer left, arch photo right (dark header bar comes from Header). */}
      <header className="px-6 pb-16 pt-32 md:px-14 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <div className="animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
            <nav aria-label="Kruimelpad" className="text-xs text-black/45">
              <Link href="/" className="hover:text-black">Home</Link> <span className="mx-1.5">/</span>
              <Link href="/blog" className="hover:text-black">Haartips</Link>
            </nav>
            <h1 className="mt-5 text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05]">{post.h1}</h1>
            <p className="mt-5 text-xs text-black/45">
              <time dateTime={post.date}>{longDate(post.date)}</time> · {post.read} · door de stylisten van {business.name}
            </p>

            <div className="mt-8 rounded-2xl border border-gold/40 bg-white p-6 shadow-sm md:p-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-muted">Kort antwoord</p>
              <p className="mt-3 leading-relaxed text-black/80">{post.answer}</p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md animate-[fade-up_0.9s_0.1s_cubic-bezier(0.16,1,0.3,1)_both] overflow-hidden rounded-t-full rounded-b-3xl bg-ivory">
            <Image src={post.image} alt={post.h1} fill priority sizes="(min-width:768px) 448px, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      <div className="border-t border-black/10 px-6 pt-16 md:px-14 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
          {/* Table of contents: sticky on desktop, jump straight to the part you need. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">In dit artikel</p>
            <ol className="mt-4 space-y-3 text-sm">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="flex gap-3 text-black/60 transition-colors hover:text-black">
                    <span className="text-gold-muted">{String(i + 1).padStart(2, "0")}</span>
                    {t.h2}
                  </a>
                </li>
              ))}
              <li>
                <a href="#vragen" className="flex gap-3 text-black/60 transition-colors hover:text-black">
                  <span className="text-gold-muted">?</span>
                  Veelgestelde vragen
                </a>
              </li>
            </ol>
          </aside>

          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-black/75">{post.intro}</p>

            {post.sections.map((sec, i) => (
              <section key={sec.h2} id={toc[i].id} className="mt-12 scroll-mt-28">
                <p className="text-sm text-gold-muted">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-1 text-2xl md:text-3xl">{sec.h2}</h2>
                {sec.p.map((t) => (
                  <p key={t.slice(0, 24)} className="mt-4 leading-relaxed text-black/70">{t}</p>
                ))}
                {sec.list && (
                  <ul className="mt-5 space-y-3 rounded-2xl bg-ivory/70 p-6 text-black/75">
                    {sec.list.map((li) => (
                      <li key={li} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-muted" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section id="vragen" className="mt-16 scroll-mt-28">
              <h2 className="mb-4 text-2xl md:text-3xl">
                Veelgestelde <span className="accent text-gold-muted">vragen</span>
              </h2>
              <Accordion items={post.faqs.map((f) => ({ title: f.q, content: f.a }))} />
            </section>

            <aside className="mt-16 rounded-3xl bg-black p-8 text-offwhite md:p-10">
              <p className="text-2xl font-light">
                Liever advies <span className="accent text-gold">in de salon?</span>
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-offwhite/75">
                Onze stylisten in Rhoon kijken graag met je mee. Je vindt ons aan de {business.address}.
              </p>
              <Button href={post.treatment ? `/afspraak?treatment=${post.treatment}` : "/afspraak"} variant="light" className="mt-6">
                Plan je afspraak
              </Button>
            </aside>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-24 max-w-6xl px-6">
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
