import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacybeleid" };

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-28 pt-40 md:pt-52">
      <h1 className="font-display text-4xl">Privacybeleid</h1>
      <p className="mt-6 text-black/60">
        Hair by Cill respecteert jouw privacy. Deze pagina wordt binnenkort aangevuld met het
        volledige privacybeleid conform de AVG/GDPR.
      </p>
    </section>
  );
}
