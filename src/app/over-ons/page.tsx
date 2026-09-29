import type { Metadata } from "next";
import Image from "next/image";
import AnimatedHeading from "@/components/AnimatedHeading";
import CTA from "@/components/CTA";
import ImageReveal from "@/components/ImageReveal";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Maak kennis met Hair by Cill: passie voor haar, persoonlijke aandacht en professionele technieken.",
};

const values = [
  { title: "Persoonlijk", accent: "advies", text: "Elke afspraak begint met luisteren. Pas daarna pakken we de schaar." },
  { title: "Rust en", accent: "aandacht", text: "Geen lopende band. We nemen de tijd, zodat jij even helemaal tot rust komt." },
  { title: "Eerlijk", accent: "vakmanschap", text: "We zeggen wat wél en niet kan met jouw haar, en werken alleen met topproducten." },
];

const VISIT = [
  { title: "Persoonlijk", accent: "advies", text: "We beginnen met een gesprek over wat je wilt, je haarstructuur en hoeveel tijd je er thuis aan kwijt wilt zijn." },
  { title: "Wassen &", accent: "ontspannen", text: "Je haar wordt gewassen met producten die bij jouw haartype passen, met een rustige hoofdhuidmassage." },
  { title: "De", accent: "behandeling", text: "Knippen, kleuren of stylen. We vertellen onderweg wat we doen en waarom, zodat je weet wat je krijgt." },
  { title: "Tips voor", accent: "thuis", text: "We stylen je haar af en geven je mee welke producten en gewoontes je look thuis mooi houden." },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        title="Dit is"
        accent="Hair by Cill"
        intro="Een warme salon waar jouw haar en jouw verhaal centraal staan."
        image="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1920&auto=format&fit=crop"
      />

      {/* STORY */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <div>
          <AnimatedHeading
            lines={["Passie voor"]}
            accent="mooi haar"
            className="text-4xl leading-[1.05] md:text-5xl"
          />
          <Reveal delay={0.15} className="mt-6 max-w-md space-y-4 text-sm leading-relaxed text-black/60">
            <p>
              Hair by Cill is ontstaan vanuit een passie voor haar, schoonheid en persoonlijke
              aandacht.
            </p>
            <p>
              Iedere klant is anders. Daarom nemen we de tijd om samen te kijken naar jouw wensen,
              haartype en persoonlijke stijl. Zo loop je de deur uit met haar waarin je jezelf
              herkent.
            </p>
          </Reveal>
        </div>
        <ImageReveal
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop"
          alt="Hair by Cill styling"
          className="aspect-[4/4.5] w-full rounded-2xl"
          sizes="(min-width: 768px) 45vw, 100vw"
        />
      </section>

      {/* VALUES */}
      <section className="bg-ivory/60 px-6 py-24 md:py-28">
        <AnimatedHeading
          lines={["Waar wij"]}
          accent="voor staan"
          className="text-center text-4xl leading-[1.05] md:text-5xl"
        />
        <div className="mx-auto mt-14 grid max-w-5xl divide-black/10 border-t border-black/10 md:grid-cols-3 md:divide-x">
          {values.map((v) => (
            <div key={v.title} className="px-8 py-10 text-center">
              <p className="text-xl">
                {v.title} <span className="accent text-gold-muted">{v.accent}</span>
              </p>
              <p className="mx-auto mt-3 max-w-[240px] text-xs leading-relaxed text-black/55">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="border-t border-black/5 px-6 py-24 md:px-14 md:py-28">
        <AnimatedHeading
          lines={["Ons"]}
          accent="team"
          className="text-center text-4xl leading-[1.05] md:text-5xl"
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ivory">
                <Image src={m.image} alt={m.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                <span className="absolute bottom-3 left-3 rounded-full bg-offwhite/90 px-3 py-1 text-[10px]">{m.role}</span>
              </div>
              <p className="mt-4 text-lg">{m.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-black/55">{m.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* YOUR VISIT: black band, 4 steps (same flow as the "eerste afspraak" blog post) */}
      <section className="bg-black px-6 py-24 text-offwhite md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <AnimatedHeading
              lines={["Zo verloopt"]}
              accent="jouw bezoek"
              className="text-4xl leading-[1.05] text-offwhite md:text-5xl"
            />
            <p className="max-w-sm text-sm leading-relaxed text-offwhite/70">
              Of je nu voor het eerst komt of al jaren klant bent: we nemen altijd de tijd voor jou en je haar.
            </p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-gold/25 bg-gold/25 sm:grid-cols-2 lg:grid-cols-4">
            {VISIT.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="bg-black p-8">
                <span className="gold-foil text-4xl font-light">0{i + 1}</span>
                <p className="mt-6 text-xl">
                  {v.title} <span className="accent text-gold">{v.accent}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-offwhite/65">{v.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTA
        title="Klaar voor"
        accent="een nieuwe look?"
        image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1920&auto=format&fit=crop"
      />
    </>
  );
}
