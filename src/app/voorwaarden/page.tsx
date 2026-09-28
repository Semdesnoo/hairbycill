import type { Metadata } from "next";

export const metadata: Metadata = { title: "Algemene voorwaarden" };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-28 pt-40 md:pt-48">
      <h1 className="text-4xl md:text-5xl">
        Algemene <span className="accent text-gold-muted">voorwaarden</span>
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-black/60">
        De algemene voorwaarden van Hair by Cill worden hier binnenkort gepubliceerd.
      </p>
    </section>
  );
}
