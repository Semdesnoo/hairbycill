"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import { BASE_PATH } from "@/lib/basePath";
import Reveal from "@/components/Reveal";
import { business, openingHours, products, team, treatments } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

const dayAbbr: Record<string, string> = {
  Maandag: "MA",
  Dinsdag: "DI",
  Woensdag: "WO",
  Donderdag: "DO",
  Vrijdag: "VR",
  Zaterdag: "ZA",
  Zondag: "ZO",
};

const MONTHS = [
  "Januari", "Februari", "Maart", "April", "Mei", "Juni",
  "Juli", "Augustus", "September", "Oktober", "November", "December",
];

/** Static month calendar linking through to the booking wizard. Client-only to avoid hydration drift. */
function MiniCalendar() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  if (!now) return <div className="h-64" />;

  const year = now.getFullYear();
  const month = now.getMonth();
  const first = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
  const days = new Date(year, month + 1, 0).getDate();

  return (
    <div>
      <p className="rounded-lg bg-ivory py-2 text-center text-sm font-semibold">
        {MONTHS[month]} {year}
      </p>
      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center text-xs">
        {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((d) => (
          <span key={d} className="font-semibold text-black/50">{d}</span>
        ))}
        {Array.from({ length: first }).map((_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const today = i + 1 === now.getDate();
          return (
            <span
              key={i}
              className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
                today ? "bg-gold font-semibold text-black" : "text-black/70"
              }`}
            >
              {i + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO — video bg, copy left, promo cards bottom (Minerva layout) */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-black md:min-h-[680px]">
        <video
          src={`${BASE_PATH}/hero.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-40 pt-32 md:pb-48">
          <div className="max-w-xl">
            <AnimatedHeading
              as="h1"
              lines={["JOUW HAAR,", "JOUW UITSTRALING."]}
              className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] text-offwhite [&>span:nth-child(2)]:text-gold"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-6 max-w-md text-sm leading-relaxed text-offwhite/80 md:text-base"
            >
              Bij {business.name} draait alles om haar dat écht bij jou past. Van een frisse
              coupe en prachtige kleur tot een complete nieuwe look: met persoonlijke aandacht,
              professioneel advies en oog voor detail.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="mt-8"
            >
              <Link
                href="/afspraak"
                className="inline-block rounded-full bg-gold px-7 py-3 text-sm tracking-wide text-black transition-colors hover:bg-gold-muted"
              >
                Plan je afspraak
              </Link>
              <p className="mt-6 text-sm text-offwhite/70">
                Liever eerst overleggen?{" "}
                <Link
                  href="/prijslijst"
                  className="border-b border-offwhite/40 pb-0.5 text-offwhite hover:border-gold hover:text-gold"
                >
                  Bekijk onze behandelingen
                </Link>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Promo mini-cards */}
        <div className="absolute bottom-8 left-6 right-6 z-10 mx-auto flex max-w-[1400px] flex-wrap gap-4">
          <Link
            href="/producten"
            className="group flex items-center gap-4 rounded-xl bg-offwhite px-5 py-4 shadow-lg"
          >
            <div>
              <p className="font-display text-lg leading-tight">Nieuwe producten</p>
              <p className="text-xs text-black/60">+{products.length} in de shop</p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-offwhite transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/afspraak"
            className="group flex items-center gap-4 rounded-xl bg-gold px-5 py-4 shadow-lg"
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-black/60">Nieuwe klant?</p>
              <p className="font-display text-lg leading-tight">10% korting</p>
              <p className="text-xs text-black/60">met code CILL10</p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-offwhite transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* SERVICES — heading left, three offset photo cards right */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-serif normal-case tracking-normal text-4xl md:text-5xl">
              Onze services
            </h2>
            <p className="mt-5 max-w-xs text-sm text-black/60">
              Meer dan alleen knippen: een compleet aanbod van kleuren tot styling.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {treatments.slice(0, 3).map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.08} className={i === 1 ? "sm:mt-12" : ""}>
                <Link href="/prijslijst" className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/70 px-4 py-1.5 text-xs tracking-wide text-offwhite backdrop-blur-sm">
                    {t.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPENING HOURS BAND — dark photo strip with day circles */}
      <section className="relative overflow-hidden bg-black py-16 md:py-20">
        <Image
          src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1920&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-4 px-6 md:gap-6">
          {openingHours.map((o, i) => {
            const closed = o.hours === "Gesloten";
            return (
              <Reveal key={o.day} delay={i * 0.05}>
                <div
                  className={`flex h-24 w-24 flex-col items-center justify-center rounded-full md:h-28 md:w-28 ${
                    closed ? "bg-soft-black text-offwhite/60" : "bg-gold text-black"
                  }`}
                >
                  <span className="font-display text-xl md:text-2xl">{dayAbbr[o.day]}</span>
                  <span className="mt-1 text-[10px] tracking-wide md:text-xs">
                    {closed ? "GESLOTEN" : o.hours}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* BENEFITS — heading left, intro right, three cards with CTA's */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <h2 className="font-display max-w-md text-3xl leading-tight md:text-4xl">
            Een salonervaring zoals geen ander
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-black/60 md:justify-self-end">
            Bij {business.name} gaan we verder dan alleen knippen. Onze stylisten werken vanuit
            jouw inspiratie en hun vakmanschap aan een persoonlijke ervaring die je zelfvertrouwen
            en stijl versterkt.
          </p>
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-6">
          {[
            {
              title: "Onze salon",
              text: "Een warme, persoonlijke plek waar je op je gemak bent en je haar de aandacht krijgt die het verdient.",
              cta: "Afspraak maken",
              href: "/afspraak",
              icon: (
                <path d="M9.5 14.5 5 19m4.5-4.5L19 5M9.5 9.5 5 5m4.5 4.5L19 19M7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              ),
            },
            {
              title: "Met liefde voor het vak",
              text: "Van wassen tot finishing touch: iedere behandeling voeren we uit met passie en precisie.",
              cta: "Bekijk behandelingen",
              href: "/prijslijst",
              icon: (
                <path d="M12 21C7 16.5 3 13.2 3 9.5A4.5 4.5 0 0 1 7.5 5c1.8 0 3.4 1 4.5 2.5C13.1 6 14.7 5 16.5 5A4.5 4.5 0 0 1 21 9.5c0 3.7-4 7-9 11.5Z" />
              ),
            },
            {
              title: "Cadeaubonnen",
              text: "Verras iemand met een verzorgmoment: een cadeaubon van Hair by Cill is altijd goed.",
              cta: "Vraag ernaar",
              href: "/contact",
              icon: (
                <path d="M20 12v9H4v-9m16-5H4v5h16V7Zm-8 0v14m0-14H8.5a2.5 2.5 0 1 1 0-5C11 2 12 4.5 12 7Zm0 0h3.5a2.5 2.5 0 1 0 0-5C13 2 12 4.5 12 7Z" />
              ),
            },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center border border-black/10 bg-white px-8 pb-10 pt-14 text-center">
                <div className="-mt-24 flex h-20 w-20 items-center justify-center rounded-2xl bg-warm-grey/90">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-9 w-9"
                    aria-hidden
                  >
                    {b.icon}
                  </svg>
                </div>
                <h3 className="font-display mt-8 text-lg">{b.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/60">{b.text}</p>
                <Link
                  href={b.href}
                  className="mt-auto pt-8 text-sm tracking-wide"
                >
                  <span className="inline-block rounded-full border border-black/25 px-6 py-2.5 transition-colors hover:border-gold hover:text-gold-muted">
                    {b.cta}
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCTS — heading + open store, four cards */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:pb-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-serif normal-case tracking-normal text-4xl md:text-5xl">
              Onze producten
            </h2>
            <p className="mt-5 max-w-sm text-sm text-black/60">
              Verleng je salonresultaat thuis met professionele producten die je haar verzorgen
              en beschermen.
            </p>
          </div>
          <Link
            href="/producten"
            className="rounded-full bg-gold px-6 py-2.5 text-sm tracking-wide text-black transition-colors hover:bg-gold-muted"
          >
            Bekijk de shop
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={`/producten/${p.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-ivory">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white/90 transition-colors group-hover:border-gold">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path d="M3 3h2l2.4 12.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L20 7H6M10 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                    </svg>
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold">{p.name}</p>
                <p className="mt-1 text-sm text-black/60">{p.price}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BOOKING — intro+photo | calendar+hours | dark callback card */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:pb-28">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-serif normal-case tracking-normal text-4xl md:text-5xl">Boeken</h2>
            <p className="mt-5 max-w-xs text-sm text-black/60">
              Klaar voor een nieuwe look? Boek je afspraak en wij zorgen voor een stijl die bij
              jou past.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop"
                alt="Hair by Cill behandeling"
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <MiniCalendar />
              <h3 className="font-display mt-8 text-lg">Openingstijden</h3>
              <ul className="mt-3 text-sm">
                {openingHours.map((o) => (
                  <li
                    key={o.day}
                    className="flex justify-between border-b border-dashed border-black/15 py-2 last:border-0"
                  >
                    <span className="text-black/70">{o.day}</span>
                    <span className={o.hours === "Gesloten" ? "text-black/40" : "text-gold-muted"}>
                      {o.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex h-full flex-col rounded-2xl bg-soft-black p-8 text-offwhite">
              <h3 className="font-serif normal-case tracking-normal text-3xl">Wij bellen jou</h3>
              <p className="mt-4 text-sm text-offwhite/60">
                Liever persoonlijk overleggen? Laat je gegevens achter via ons contactformulier en
                we bellen je terug voor advies of een afspraak.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-offwhite/80">
                <li className="border-b border-offwhite/15 pb-3">{business.phone}</li>
                <li className="border-b border-offwhite/15 pb-3">{business.email}</li>
                <li className="border-b border-offwhite/15 pb-3">{business.address}</li>
              </ul>
              <div className="mt-auto pt-10">
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-gold px-7 py-3 text-sm tracking-wide text-black transition-colors hover:bg-gold-muted"
                >
                  Bel mij terug
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US — dark band, stats left, feature blocks right */}
      <section className="bg-black px-6 py-20 text-offwhite md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-serif normal-case tracking-normal text-4xl md:text-5xl">
              Waarom Hair by Cill
            </h2>
            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="font-display text-4xl text-gold">10+</p>
                <p className="mt-1 text-sm text-offwhite/60">Jaar ervaring</p>
              </div>
              <div className="h-12 w-px bg-offwhite/20" />
              <div>
                <p className="font-display text-4xl text-gold">4</p>
                <p className="mt-1 text-sm text-offwhite/60">Specialisten</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              "Persoonlijke aandacht: we nemen de tijd om te luisteren naar jouw wensen en stijl.",
              "Professionele producten: we werken uitsluitend met merken die je haar echt verzorgen.",
              "Passie voor het vak: iedere behandeling is vakmanschap, van wassen tot finishing touch.",
              "Een resultaat dat bij jou past: je loopt de deur uit met haar waarin je jezelf herkent.",
            ].map((text, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-offwhite/10 bg-soft-black p-6">
                  <span className="font-display text-2xl text-gold">0{i + 1}</span>
                  <p className="mt-4 text-sm leading-relaxed text-offwhite/75">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM — heading left, cards right */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_3fr]">
          <div>
            <h2 className="font-serif normal-case tracking-normal text-4xl md:text-5xl">
              Ons team
            </h2>
            <p className="mt-5 max-w-xs text-sm text-black/60">
              Vertrouw je haar toe aan ons team van ervaren stylisten.
            </p>
            <Link
              href="/afspraak"
              className="mt-8 inline-block rounded-full bg-gold px-6 py-2.5 text-sm tracking-wide text-black transition-colors hover:bg-gold-muted"
            >
              Afspraak maken
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ivory">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display mt-4 text-lg">{m.name}</h3>
                  <p className="mt-0.5 text-sm text-black/50">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
