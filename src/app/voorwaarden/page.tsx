import type { Metadata } from "next";

export const metadata: Metadata = { title: "Algemene voorwaarden" };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-28">
      <h1 className="font-display text-4xl">Algemene voorwaarden</h1>
      <p className="mt-6 text-ink/70">
        De algemene voorwaarden van Hair by Cill worden hier binnenkort gepubliceerd.
      </p>
    </section>
  );
}
