"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import AnimatedHeading from "@/components/AnimatedHeading";
import ImageReveal from "@/components/ImageReveal";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import CTA from "@/components/CTA";
import {
  business,
  openingHours,
  reviews,
  team,
  treatments,
} from "@/lib/data";

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

export default function Home() {
  return (
    <>
      {/* HERO — full-width dark photo, right-aligned copy */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-black md:min-h-[640px]">
        <ImageReveal
          src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1920&auto=format&fit=crop"
          alt="Hair by Cill kapsel"
          className="absolute inset-0 h-full w-full opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] px-6 py-24 md:grid-cols-2">
          <div className="md:col-start-2">
            <AnimatedHeading
              as="h1"
              lines={["JOUW HAAR VERDIENT", "ECHTE AANDACHT."]}
              className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] text-offwhite [&>span:nth-child(2)]:text-gold"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-6 max-w-md text-offwhite/80"
            >
              Persoonlijke aandacht, professioneel vakmanschap en een resultaat dat bij jou past.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
              className="mt-10"
            >
              <Button href="/afspraak" className="!rounded-none !bg-gold !text-black hover:!bg-gold-muted">
                AFSPRAAK MAKEN
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NIEUWE LOOK — staggered collage with vertical labels (reference layout) */}
      <section className="bg-ivory px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2 md:gap-8">
          {/* Left column: two staggered images */}
          <div className="flex flex-col gap-6 md:gap-8">
            <Reveal className="md:mr-12">
              <Link href="/prijslijst" className="group relative block aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200&auto=format&fit=crop"
                  alt="Knippen en styling bij Hair by Cill"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 [writing-mode:vertical-rl] rotate-180 text-sm font-semibold tracking-wide text-white drop-shadow-md">
                  Knippen &amp; Styling
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="md:ml-16">
              <Link href="/prijslijst" className="group relative block aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop"
                  alt="Haarkleuren bij Hair by Cill"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 [writing-mode:vertical-rl] rotate-180 text-sm font-semibold tracking-wide text-white drop-shadow-md">
                  Kleuren
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Right column: heading + CTA, then image */}
          <div className="flex flex-col gap-10 md:gap-12 md:pt-10">
            <Reveal delay={0.05}>
              <h2 className="font-serif normal-case tracking-normal text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.15]">
                <span className="block text-warm-grey">Voor jou een</span>
                <span className="block">nieuwe look.</span>
              </h2>
              <Link
                href="/afspraak"
                className="mt-8 inline-block rounded-md border border-black/25 px-6 py-2.5 text-sm text-black/70 transition-colors hover:border-gold hover:text-gold-muted"
              >
                Afspraak maken
              </Link>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/prijslijst" className="group relative block aspect-[4/5] overflow-hidden rounded-xl md:aspect-[5/6]">
                <Image
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop"
                  alt="Alle behandelingen van Hair by Cill"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 [writing-mode:vertical-rl] rotate-180 text-sm font-semibold tracking-wide text-white drop-shadow-md">
                  Alle behandelingen ontdekken
                </span>
              </Link>
            </Reveal>
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

      {/* SERVICES ACCORDION + OUR STORY — two columns */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display border-b border-black/15 pb-3 text-2xl">
              Onze services
            </h2>
            <div className="mt-6">
              <Accordion
                items={treatments.map((t) => ({ title: t.name, content: t.description }))}
              />
            </div>
          </div>

          <div>
            <h2 className="font-display border-b border-black/15 pb-3 text-2xl">
              Ons verhaal
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-black/70">
              Bij {business.name} draait een behandeling niet alleen om knippen of kleuren. We
              kijken naar jouw haar, gezicht, wensen en persoonlijke stijl om een resultaat te
              creëren dat echt bij jou past.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=800&auto=format&fit=crop"
                  alt="Hair by Cill salon"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop"
                  alt="Hair by Cill behandeling"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-black/70">
              Vragen over onze behandelingen? Mail naar{" "}
              <a href={`mailto:${business.email}`} className="bg-gold px-1.5 py-0.5 text-black">
                {business.email}
              </a>{" "}
              of bel <strong>{business.phone}</strong>. We denken graag met je mee.
            </p>
          </div>
        </div>
      </section>

      {/* COUPON BAND */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:pb-28">
        <Reveal>
          <div className="border-2 border-dashed border-gold bg-black px-6 py-10 text-center md:py-14">
            <p className="font-display text-[clamp(1.5rem,4vw,2.75rem)] text-offwhite">
              NIEUWE KLANT? <span className="text-gold">10% KORTING</span> OP JE EERSTE AFSPRAAK
            </p>
            <p className="mt-3 text-sm text-offwhite/60">
              Vermeld code <strong className="text-gold">CILL10</strong> bij het boeken.
            </p>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS — 2x2 grid with avatars */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:pb-28">
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="flex gap-5 border border-black/10 bg-white p-6">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image src={r.image} alt={r.name} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-black/70">{r.text}</p>
                  <p className="font-display mt-3 text-sm text-gold-muted">
                    {r.name}, {r.treatment}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-ivory px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl">Onze stylisten</h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-gold" />
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="border border-black/10 bg-white px-6 py-10 text-center">
                  <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full">
                    <Image src={m.image} alt={m.name} fill sizes="144px" className="object-cover" />
                  </div>
                  <h3 className="font-display mt-6 text-lg">{m.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-muted">
                    {m.role}
                  </p>
                  <p className="mt-4 text-sm text-black/60">{m.bio}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="mt-4 inline-block text-xs text-black/50 hover:text-gold-muted"
                  >
                    {m.email}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        lines={["READY FOR", "YOUR NEXT LOOK?"]}
        image="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1920&auto=format&fit=crop"
      />
    </>
  );
}
