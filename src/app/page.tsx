"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import Reveal from "@/components/Reveal";
import BookButton from "@/components/BookButton";
import InstagramRow from "@/components/InstagramRow";
import HomeHero from "@/components/HomeHero";
import TreatmentList from "@/components/TreatmentList";
import { BASE_PATH } from "@/lib/basePath";
import { business, openingHours } from "@/lib/data";

/** Our work: 13 result photos in two rows that glide endlessly in opposite directions. */
const WORK = Array.from({ length: 13 }, (_, i) => `${BASE_PATH}/work/${String(i + 1).padStart(2, "0")}.jpg`);
const ROWS = [WORK.slice(0, 7), WORK.slice(7)];

const STEPS = [
  { n: "01", title: "Stuur een appje", text: "Tik op de knop. Je bericht staat al klaar, je hoeft alleen nog op verzenden te drukken." },
  { n: "02", title: "We plannen samen", text: "We stellen een moment voor dat bij jou past en denken mee over de behandeling." },
  { n: "03", title: "Tijd voor jou", text: "Koffie erbij, even niks. Je loopt de deur uit met haar dat écht bij je past." },
];

function WorkMarquee() {
  return (
    <section className="overflow-hidden bg-white py-24 md:py-32">
      <AnimatedHeading lines={["Resultaten van"]} accent="ons werk" className="px-6 text-center text-4xl leading-[1.05] md:text-6xl" />
      <p className="mx-auto mt-4 max-w-sm px-6 text-center text-sm text-black/60">Echte klanten, echte transformaties uit onze salon.</p>
      <div className="mt-14 flex flex-col gap-4 md:gap-5">
        {ROWS.map((row, r) => (
          <div
            key={r}
            // Endless CSS marquee: margins, not gap, so -50% loops exactly.
            style={{ animationDuration: "70s", animationDirection: r === 0 ? "reverse" : "normal" }}
            className="flex w-max animate-marquee will-change-transform"
          >
            {[...row, ...row, ...row, ...row].map((src, i) => (
              <div key={i} className="relative mr-4 aspect-[4/3.6] w-[200px] shrink-0 overflow-hidden rounded-2xl md:mr-5 md:w-[260px]">
                <Image
                  src={src}
                  alt={i < row.length ? "Resultaat van Hair by Cill" : ""}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* STORY TEASER: big statement + photo, links to the full story */}
      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-24 md:grid-cols-[1.15fr_1fr] md:gap-20 md:px-14 md:py-36">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-muted">Van zolder naar Rhoon</p>
          <p className="mt-6 text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            Een eigen salon, een eigen visie. En vooral: een plek waar jij <span className="accent text-gold-muted">mooi, blij en zelfverzekerd</span> de deur uit gaat.
          </p>
          <Link
            href="/over-ons"
            className="group mt-10 inline-flex items-center gap-3 text-sm font-medium after:block after:h-px after:w-10 after:bg-black after:transition-all after:duration-300 hover:after:w-16 hover:after:bg-gold-muted"
          >
            Lees ons verhaal
          </Link>
        </Reveal>
        <Reveal curtain delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={`${BASE_PATH}/img/spiegel.jpg`} alt="In de salon van Hair by Cill in Rhoon" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-4 rounded-full bg-black px-6 py-4 text-sm text-offwhite shadow-xl md:-left-10">
            <span className="text-gold">✦</span> Kapsalon in Rhoon
          </div>
        </Reveal>
      </section>

      {/* TREATMENTS: black editorial list, photo follows the cursor, each row books via WhatsApp */}
      <section id="behandelingen" className="scroll-mt-20 bg-black px-6 py-24 text-offwhite md:px-14 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
            <AnimatedHeading lines={["Onze"]} accent="behandelingen" className="text-5xl leading-[1] text-offwhite md:text-7xl" />
            <p className="max-w-xs text-sm leading-relaxed text-offwhite/60">
              Tik op een behandeling en je WhatsApp-bericht staat klaar. Alle prijzen vind je in de{" "}
              <Link href="/prijslijst" className="text-gold underline-offset-4 hover:underline">prijslijst</Link>.
            </p>
          </div>
          <TreatmentList />
        </div>
      </section>

      <WorkMarquee />

      {/* HOW BOOKING WORKS: three steps + the button + opening hours */}
      <section className="px-3 md:px-6">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-soft-black px-6 py-20 text-offwhite md:px-14 md:py-28">
          <div aria-hidden className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-3xl" />
          <div className="relative grid gap-16 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <AnimatedHeading lines={["Afspraak maken?"]} accent="Gewoon even appen." className="text-4xl leading-[1.02] text-offwhite md:text-6xl" />
              <ol className="mt-12 space-y-8">
                {STEPS.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.1}>
                    <li className="flex gap-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-sm text-gold">{s.n}</span>
                      <span>
                        <span className="block text-xl font-medium">{s.title}</span>
                        <span className="mt-1 block max-w-sm text-sm leading-relaxed text-offwhite/60">{s.text}</span>
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <BookButton className="mt-12 py-2 pl-7 text-base" />
            </div>

            <Reveal delay={0.15} className="self-end rounded-2xl border border-offwhite/10 bg-black/40 p-7 backdrop-blur md:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Openingstijden</p>
              <ul className="mt-6 divide-y divide-offwhite/10 text-sm">
                {openingHours.map((o) => (
                  <li key={o.day} className="flex justify-between gap-4 py-3">
                    <span className="text-offwhite/70">{o.day}</span>
                    <span className={o.hours === "Gesloten" ? "text-offwhite/35" : "text-offwhite"}>{o.hours.replace(" & ", " · ")}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-offwhite/60">{business.address}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <InstagramRow />
    </>
  );
}
