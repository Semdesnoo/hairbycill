"use client";

import HeroVideo from "@/components/HeroVideo";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { BASE_PATH } from "@/lib/basePath";
import { openingHours, products, team, treatments } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import ScrollScissors from "@/components/ScrollScissors";
import { posts as tips } from "@/lib/blog";

const ease = [0.16, 1, 0.3, 1] as const;
const u = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/** Our work: 13 result photos in two rows that glide in opposite directions as you scroll. */
const WORK = Array.from({ length: 13 }, (_, i) => `${BASE_PATH}/work/${String(i + 1).padStart(2, "0")}.jpg`);
const ROWS = [WORK.slice(0, 7), WORK.slice(7)];

function WorkMarquee() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Spring on top of scroll progress = buttery, momentum-like glide instead of 1:1 jitter.
  const p = useSpring(scrollYProgress, { stiffness: 40, damping: 30, mass: 0.8 });
  const toRight = useTransform(p, [0, 1], ["-12%", "0%"]);
  const toLeft = useTransform(p, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={ref} className="overflow-hidden bg-ivory/60 py-24 md:py-28">
      <AnimatedHeading
        lines={["Resultaten van"]}
        accent="ons werk"
        className="px-6 text-center text-4xl leading-[1.05] md:text-5xl"
      />
      <p className="mx-auto mt-4 max-w-sm px-6 text-center text-sm text-black/60">
        Echte klanten, echte transformaties uit onze salon.
      </p>
      <div className="mt-14 flex flex-col gap-4 md:gap-5">
        {ROWS.map((row, r) => (
          <motion.div
            key={r}
            style={{ x: r === 0 ? toRight : toLeft }}
            className="flex w-max gap-4 will-change-transform md:gap-5"
          >
            {/* Row repeated 3x so it always overfills the widest screens while moving */}
            {[...row, ...row, ...row].map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3.6] w-[200px] shrink-0 overflow-hidden rounded-2xl md:w-[260px]"
              >
                <Image
                  src={src}
                  alt={i < row.length ? "Resultaat van Hair by Cill" : ""}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const openDays = openingHours.filter((o) => o.hours !== "Gesloten");
  const [day, setDay] = useState(openDays[0].day);

  return (
    <>
        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black">
          <HeroVideo className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

          <div className="on-photo relative z-10 px-6 py-32 md:px-14">
            <AnimatedHeading
              as="h1"
              lines={["Jouw haar,"]}
              accent="jouw uitstraling"
              className="max-w-2xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.95] text-offwhite"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-5 max-w-sm text-sm leading-relaxed text-offwhite/90"
            >
              Een rustige plek voor haar dat écht bij jou past. Persoonlijk advies, vakmanschap en
              aandacht tot in de puntjes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="mt-7"
            >
              <Button href="/afspraak" variant="light">Plan je afspraak</Button>
            </motion.div>
          </div>

          {/* Scroll cue: mouse outline with a dot gliding down */}
          <motion.a
            href="#behandelingen"
            aria-label="Scroll naar beneden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-offwhite/70 transition-colors hover:text-offwhite"
          >
            <span className="flex h-10 w-6 justify-center rounded-full border border-current pt-2">
              <motion.span
                animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="block h-1.5 w-1 rounded-full bg-current"
              />
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          </motion.a>
        </section>

        {/* TREATMENTS: Dore & Rose editorial tiles (one wide, then pairs) with a white button bottom-left */}
        <section id="behandelingen" className="scroll-mt-20 px-3 py-24 md:px-6 md:py-32">
          <AnimatedHeading
            lines={["Onze"]}
            accent="behandelingen"
            className="px-6 text-center text-4xl leading-[1.05] md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-sm px-6 text-center text-sm text-black/60">
            Van een frisse coupe tot een complete kleurmetamorfose.
          </p>
          <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2 md:gap-4">
            {treatments.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 2) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <Link
                  href={`/afspraak?treatment=${t.slug}`}
                  className={`group relative block overflow-hidden rounded-2xl bg-ivory ${
                    i === 0 ? "h-[420px] md:h-[min(68vh,560px)]" : "h-[340px] md:h-[440px]"
                  }`}
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/15 to-transparent" />
                  <div className="on-photo absolute inset-x-6 bottom-6 text-offwhite md:inset-x-9 md:bottom-9">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-offwhite/80">
                      0{i + 1} · {t.duration}
                    </p>
                    <h3 className={`mt-2 leading-none ${i === 0 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>
                      {t.name} <span className="accent text-offwhite/90">{t.accent}</span>
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-offwhite/85">{t.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-md bg-offwhite px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black transition-colors duration-300 [text-shadow:none] group-hover:bg-gold">
                      Boek {t.name.toLowerCase()}
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SERVICES: dark band with day picker + treatment menu card */}
        <section className="relative overflow-hidden bg-black px-3 py-24 text-offwhite md:px-14 md:py-32">
          <Image src={u("1633681926022-84c23e8cb2d6", 1800)} alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="on-photo relative z-10">
            <AnimatedHeading
              lines={["Vind een behandeling"]}
              accent="die bij je past"
              className="mx-auto max-w-lg px-3 text-center text-4xl leading-[1.05] md:text-5xl"
            />
            <p className="mx-auto mt-4 max-w-sm px-3 text-center text-sm text-offwhite/85">
              Kies je dag, kies je behandeling. Wij zorgen voor de rest.
            </p>

            <div
              role="tablist"
              aria-label="Kies een dag"
              className="mx-auto mt-9 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-offwhite/15 bg-black/40 p-1 backdrop-blur-md [scrollbar-width:none]"
            >
              {openingHours.map((o) => {
                const closed = o.hours === "Gesloten";
                const on = day === o.day;
                return (
                  <button
                    key={o.day}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    disabled={closed}
                    onClick={() => setDay(o.day)}
                    className={`relative shrink-0 rounded-full px-3.5 py-2 text-xs transition-colors disabled:cursor-not-allowed disabled:text-offwhite/30 md:px-5 ${
                      on ? "text-black [text-shadow:none]" : "hover:text-gold"
                    }`}
                  >
                    {on && <motion.span layoutId="day-pill" className="absolute inset-0 rounded-full bg-offwhite" transition={{ duration: 0.5, ease }} />}
                    <span className="relative">{o.day.slice(0, 2)}</span>
                  </button>
                );
              })}
            </div>

            <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl bg-offwhite text-black shadow-2xl shadow-black/40 [text-shadow:none]">
              <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4 md:px-8">
                <p className="text-lg">
                  {day} <span className="accent text-gold-muted">geopend</span>
                </p>
                <p className="flex items-center gap-2 text-xs text-black/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  {openingHours.find((o) => o.day === day)?.hours.replace(" & ", " · ")}
                </p>
              </div>
              <ul className="p-2 md:p-3">
                {treatments.map((t, i) => (
                  <li key={t.slug}>
                    <Link
                      href={`/afspraak?treatment=${t.slug}`}
                      className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-ivory/70 md:grid-cols-[2rem_5rem_1fr_1.3fr_auto_auto] md:gap-5 md:px-5"
                    >
                      <span className="hidden text-xs tabular-nums text-black/40 md:block">0{i + 1}</span>
                      <span className="relative block aspect-square overflow-hidden rounded-xl md:aspect-[4/3]">
                        <Image src={t.image} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      </span>
                      <span>
                        <span className="block text-base md:text-lg">
                          {t.name} <span className="accent text-gold-muted">{t.accent}</span>
                        </span>
                        <span className="mt-0.5 block text-xs text-black/50 md:hidden">
                          {t.duration} · {t.price}
                        </span>
                      </span>
                      <span className="hidden text-xs leading-relaxed text-black/55 md:block">{t.description}</span>
                      <span className="hidden whitespace-nowrap text-right md:block">
                        <span className="block text-sm">{t.price.replace("vanaf ", "")}</span>
                        <span className="block text-[11px] text-black/45">vanaf · {t.duration}</span>
                      </span>
                      <span className="flex h-10 items-center gap-2 rounded-full bg-black px-4 text-xs text-offwhite transition-colors group-hover:bg-gold group-hover:text-black">
                        Boek <span aria-hidden className="hidden transition-transform group-hover:translate-x-0.5 md:inline">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 text-center">
              <Button href="/prijslijst" variant="light">Bekijk alle prijzen</Button>
            </div>
          </div>
        </section>

        {/* ABOUT: pinned scroll story with the spinning 3D shears */}
        <ScrollScissors />

        {/* TEAM: copy left, two portrait tiles right (name on the photo, D&R tile style) */}
        <section className="px-6 py-24 md:px-14 md:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold-muted">Het team</p>
              <AnimatedHeading
                lines={["Gestyled met aandacht,", "geknipt"]}
                accent="met liefde"
                className="mt-3 text-4xl leading-[1.05] md:text-5xl"
              />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-black/60">
                Een klein team dat luistert, meedenkt en weet wat jouw haar nodig heeft. Bij ons zit je
                altijd bij een vast, vertrouwd gezicht.
              </p>
              <Button href="/afspraak" className="mt-10">Afspraak maken</Button>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.12} className={i === 1 ? "mt-14 md:mt-20" : ""}>
                  <Link href="/afspraak" className="group relative block aspect-[3/4.3] overflow-hidden rounded-2xl bg-ivory">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width:1024px) 340px, 50vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="on-photo absolute inset-x-4 bottom-4 text-offwhite md:inset-x-6 md:bottom-6">
                      <p className="text-xl md:text-2xl">
                        {m.name} <span className="accent text-gold">stylist</span>
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-offwhite/75">{m.role}</p>
                      <span className="mt-3 hidden rounded-md bg-offwhite px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black [text-shadow:none] transition-colors group-hover:bg-gold md:inline-block">
                        Boek bij {m.name}
                      </span>
                    </div>
                  </Link>
                  <p className="mt-3 text-xs leading-relaxed text-black/55">{m.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* OUR WORK: two scroll-driven rows */}
        <WorkMarquee />

        {/* SHOP: Dore & Rose "Bestsellers" row: heading left, shop link right, swipeable product cards */}
        <section className="py-24 md:py-28">
          <div className="flex items-end justify-between gap-6 px-6 md:px-14">
            <AnimatedHeading lines={["Favoriet in"]} accent="de salon" className="text-4xl leading-[1.05] md:text-5xl" />
            <Link href="/producten" className="group mb-1 flex shrink-0 items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em]">
              Shop alles
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <p className="mt-3 max-w-sm px-6 text-sm text-black/60 md:px-14">
            De producten die wij zelf dagelijks gebruiken. Afhalen in Rhoon of thuisbezorgd.
          </p>
          <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] md:scroll-px-14 md:gap-5 md:px-14">
            {products.map((p) => (
              <li key={p.slug} className="w-[64vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] xl:w-[calc((100vw-7rem-3.75rem)/4)]">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>

        {/* TIPS */}
        <section className="px-6 py-24 md:px-14 md:py-28">
          <AnimatedHeading
            lines={["Tips uit"]}
            accent="de salon"
            className="text-center text-4xl leading-[1.05] md:text-5xl"
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2">
            {tips.slice(0, 2).map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.08}>
                <Link href={`/blog/${t.slug}`} className="group grid h-full grid-cols-[42%_1fr] gap-5 rounded-2xl bg-ivory/70 p-3">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={t.image} alt={t.h1} fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-2 top-2 rounded-full bg-offwhite/90 px-2.5 py-1 text-[10px]">Uitgelicht</span>
                  </div>
                  <div className="py-2 pr-2">
                    <h3 className="text-lg leading-tight">
                      {t.title} <span className="accent text-gold-muted">{t.accent}</span>
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-black/55">{t.text}</p>
                    <p className="mt-4 text-[11px] text-black/45">{t.read}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-5 grid max-w-6xl gap-5 sm:grid-cols-3">
            {tips.slice(2, 5).map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.08}>
                <Link href={`/blog/${t.slug}`} className="group block h-full rounded-2xl bg-ivory/70 p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={t.image} alt={t.h1} fill sizes="(min-width:640px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 px-1 text-base leading-tight">
                    {t.title} <span className="accent text-gold-muted">{t.accent}</span>
                  </h3>
                  <p className="mt-2 px-1 text-xs leading-relaxed text-black/55">{t.text}</p>
                  <p className="mt-3 px-1 pb-2 text-[11px] text-black/45">{t.read}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

    </>
  );
}
