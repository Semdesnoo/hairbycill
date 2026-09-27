import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { galleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Maak kennis met Hair by Cill: passie voor haar, persoonlijke aandacht en professionele technieken.",
};

const usps = [
  "Persoonlijke aandacht",
  "Professionele technieken",
  "Premium producten",
  "Passie voor het vak",
];

export default function OverOnsPage() {
  return (
    <>
      <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=1920&auto=format&fit=crop"
          alt="Hair by Cill salon interieur"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <Reveal className="relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-6xl text-bone">
            Passion for beautiful hair.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-champagne">
            Over Hair by Cill
          </p>
          <p className="text-lg text-ink/70">
            Hair by Cill is ontstaan vanuit een passie voor haar, schoonheid en persoonlijke
            aandacht.
          </p>
          <p className="mt-4 text-lg text-ink/70">
            Iedere klant is anders. Daarom nemen we de tijd om samen te kijken naar jouw wensen,
            haartype en persoonlijke stijl.
          </p>
          <p className="mt-4 text-lg text-ink/70">
            Ons doel is simpel: dat jij de salon verlaat met haar waar je iedere dag opnieuw blij
            van wordt.
          </p>
        </Reveal>
      </section>

      <section className="bg-charcoal/[0.03] px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop"
              alt="Cill, eigenaresse Hair by Cill"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={150}>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-champagne">Meet Cill</p>
            <h2 className="font-display text-4xl">Het verhaal achter Hair by Cill.</h2>
            <p className="mt-6 text-ink/70">
              Al jaren draait mijn werk om meer dan alleen haar knippen of kleuren — het gaat om
              vertrouwen, luisteren en het beste resultaat neerzetten voor iedere klant die bij mij
              in de stoel zit.
            </p>
            <p className="mt-4 text-ink/70">
              Elke dag opnieuw zet ik mijn vakmanschap en passie in om jou met een goed gevoel de
              salon uit te laten lopen.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {usps.map((usp, i) => (
            <Reveal key={usp} delay={i * 80} className="text-center">
              <p className="font-display text-3xl text-champagne">0{i + 1}</p>
              <p className="mt-3 text-sm text-ink/70">{usp}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-bone px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-3xl">De salon</h2>
          </Reveal>
          <Gallery images={galleryImages} />
        </div>
      </section>
    </>
  );
}
