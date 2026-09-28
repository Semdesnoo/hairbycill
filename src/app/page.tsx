"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { BASE_PATH } from "@/lib/basePath";
import { openingHours, team, tips, treatments } from "@/lib/data";

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
          <video
            src={`${BASE_PATH}/hero.mp4`}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />

          <div className="relative z-10 px-6 py-32 md:px-14">
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
              className="mt-5 max-w-sm text-sm leading-relaxed text-offwhite/75"
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

        {/* TREATMENTS: arched portraits that sweep in from the left and right edges */}
        <section id="behandelingen" className="scroll-mt-20 py-24 md:py-36">
          <AnimatedHeading
            lines={["Onze"]}
            accent="behandelingen"
            className="px-6 text-center text-4xl leading-[1.05] md:text-5xl"
          />
          {/* Parent observes the viewport: children start off-screen, so they can't trigger whileInView themselves */}
          <motion.div
            initial="out"
            whileInView="in"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 flex snap-x justify-center-safe gap-4 overflow-x-auto px-6 [scrollbar-width:none] md:gap-5 md:px-14"
          >
            {treatments.map((t, i) => {
              const side = i - (treatments.length - 1) / 2; // <0 left, 0 middle, >0 right
              return (
                <motion.div
                  key={t.slug}
                  variants={{
                    out: { opacity: 0, x: `${side * 45}vw`, y: side === 0 ? 80 : 0, rotate: side * 4 },
                    in: { opacity: 1, x: 0, y: 0, rotate: 0 },
                  }}
                  transition={{ duration: 1.3, ease }}
                  className="shrink-0 snap-start"
                >
                  <Link
                    href={`/afspraak?treatment=${t.slug}`}
                    className="group relative block aspect-[3/5] w-44 overflow-hidden rounded-full md:w-52 xl:w-60 2xl:w-64 min-[1800px]:w-72"
                  >
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pb-8 pt-16 text-center text-base text-offwhite">
                      {t.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* SERVICES: dark band with day tabs + treatment table */}
        <section className="relative overflow-hidden bg-black px-4 py-24 text-offwhite md:px-14 md:py-28">
          <Image src={u("1633681926022-84c23e8cb2d6", 1800)} alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="relative z-10">
            <AnimatedHeading
              lines={["Vind een behandeling"]}
              accent="die bij je past"
              className="mx-auto max-w-lg text-center text-4xl leading-[1.05] md:text-5xl"
            />
            <p className="mx-auto mt-4 max-w-sm text-center text-sm text-offwhite/60">
              Kies je dag, kies je behandeling. Wij zorgen voor de rest.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-1.5">
              {openingHours.map((o) => {
                const closed = o.hours === "Gesloten";
                return (
                  <button
                    key={o.day}
                    type="button"
                    disabled={closed}
                    onClick={() => setDay(o.day)}
                    className={`rounded-full px-4 py-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                      day === o.day ? "bg-offwhite text-black" : "bg-offwhite/10 hover:bg-offwhite/20"
                    }`}
                  >
                    {o.day.slice(0, 2)}
                  </button>
                );
              })}
            </div>

            <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-black/70 p-3 backdrop-blur-md md:p-5">
              <p className="px-3 pb-3 text-xs text-offwhite/50">
                {day}: {openingHours.find((o) => o.day === day)?.hours}
              </p>
              {treatments.map((t, i) => (
                <div
                  key={t.slug}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-offwhite/10 px-3 py-4 md:grid-cols-[2rem_1.2fr_4rem_1.5fr_auto_auto]"
                >
                  <span className="hidden text-xs text-offwhite/50 md:block">0{i + 1}</span>
                  <p className="text-sm">
                    {t.name} <span className="accent text-gold">{t.accent}</span>
                  </p>
                  <div className="relative hidden h-10 w-16 overflow-hidden rounded-lg md:block">
                    <Image src={t.image} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <p className="hidden text-xs leading-relaxed text-offwhite/55 md:block">{t.description}</p>
                  <p className="whitespace-nowrap text-xs text-offwhite/80">
                    {t.duration} • {t.price}
                  </p>
                  <Link
                    href={`/afspraak?treatment=${t.slug}`}
                    className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
                      i === 0 ? "bg-offwhite text-black" : "border border-offwhite/25 hover:bg-offwhite hover:text-black"
                    }`}
                  >
                    Boek
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button href="/prijslijst" variant="light">Bekijk alle prijzen</Button>
            </div>
          </div>
        </section>

        {/* ABOUT: text + stats */}
        <section className="px-6 py-24 text-center md:py-32">
          <AnimatedHeading
            lines={["Jouw plek om te ontspannen,"]}
            accent="stralen en groeien"
            className="mx-auto max-w-xl text-4xl leading-[1.05] md:text-5xl"
          />
          <p className="mx-auto mt-5 max-w-md text-sm text-black/60">
            We maken salonzorg toegankelijk voor iedereen, waar je ook begint en hoe druk je dag ook is
            geweest.
          </p>

          <div className="mx-auto mt-16 grid max-w-5xl divide-black/10 border-t border-black/10 md:grid-cols-3 md:divide-x">
            {[
              { n: "93", title: "Voelt zich", accent: "zelfverzekerder", text: "Klanten geven aan zich zekerder te voelen na hun eerste afspraak." },
              { n: "87", title: "Komt", accent: "graag terug", text: "Een warme salon vol vaste gezichten die zich thuis voelen." },
              { n: "95", title: "Tevreden over", accent: "het advies", text: "Persoonlijk advies dat past bij jouw haar en jouw ritme." },
            ].map((s) => (
              <div key={s.n} className="px-8 py-10">
                <p className="text-4xl font-light">
                  {s.n}<sup className="text-sm">%</sup>
                </p>
                <p className="mt-2 text-sm font-medium">
                  {s.title} <span className="accent text-base text-gold-muted">{s.accent}</span>
                </p>
                <p className="mx-auto mt-3 max-w-[220px] text-xs leading-relaxed text-black/55">{s.text}</p>
              </div>
            ))}
          </div>
          <Button href="/over-ons" className="mt-6">Meer over ons</Button>
        </section>

        {/* TEAM: copy left, two portraits right, one aligned block */}
        <section className="relative px-6 py-24 md:px-14 md:py-32">
          {/* Real steel shears photo (user's, Lanczos-upscaled to 2400px) spanning the About/Team seam; multiply blend drops its white bg */}
          <motion.img
            src={`${BASE_PATH}/scissors.jpg`}
            alt=""
            aria-hidden
            initial={{ opacity: 0, rotate: -14, scale: 0.94 }}
            whileInView={{ opacity: 0.09, rotate: -8, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.8, ease }}
            className="pointer-events-none absolute left-1/2 top-0 -z-10 w-[120vw] max-w-none mix-blend-multiply -translate-x-1/2 -translate-y-1/2 select-none [mask-image:radial-gradient(closest-side,black_60%,transparent)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <div>
              <AnimatedHeading
                lines={["Gestyled met aandacht,", "geknipt"]}
                accent="met liefde"
                className="text-4xl leading-[1.05] md:text-5xl"
              />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-black/60">
                Een klein team dat luistert, meedenkt en weet wat jouw haar nodig heeft. Bij ons zit je
                altijd bij een vast, vertrouwd gezicht.
              </p>
              <div className="mt-7 flex max-w-sm flex-wrap gap-2 text-[11px]">
                {["Persoonlijk", "Gecertificeerd", "Ervaren", "Duurzaam"].map((c) => (
                  <span key={c} className="rounded-full border border-black/15 px-4 py-1.5">
                    {c}
                  </span>
                ))}
              </div>
              <Button href="/afspraak" className="mt-10">Afspraak maken</Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.12} className={i === 1 ? "mt-12 md:mt-16" : ""}>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-ivory">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width:1024px) 320px, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-lg">
                    {m.name} <span className="accent text-gold-muted">stylist</span>
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-black/45">{m.role}</p>
                  <p className="mt-2 text-xs leading-relaxed text-black/55">{m.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* OUR WORK: two scroll-driven rows */}
        <WorkMarquee />

        {/* TIPS */}
        <section className="px-6 py-24 md:px-14 md:py-28">
          <AnimatedHeading
            lines={["Tips uit"]}
            accent="de salon"
            className="text-center text-4xl leading-[1.05] md:text-5xl"
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2">
            {tips.slice(0, 2).map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <article className="grid h-full grid-cols-[42%_1fr] gap-5 rounded-2xl bg-ivory/70 p-3">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={t.image} alt="" fill sizes="240px" className="object-cover" />
                    <span className="absolute left-2 top-2 rounded-full bg-offwhite/90 px-2.5 py-1 text-[10px]">Uitgelicht</span>
                  </div>
                  <div className="py-2 pr-2">
                    <h3 className="text-lg leading-tight">
                      {t.title} <span className="accent text-gold-muted">{t.accent}</span>
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-black/55">{t.text}</p>
                    <p className="mt-4 text-[11px] text-black/45">{t.read}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-5 grid max-w-6xl gap-5 sm:grid-cols-3">
            {tips.slice(2).map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <article className="h-full rounded-2xl bg-ivory/70 p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={t.image} alt="" fill sizes="(min-width:640px) 30vw, 90vw" className="object-cover" />
                  </div>
                  <h3 className="mt-4 px-1 text-base leading-tight">
                    {t.title} <span className="accent text-gold-muted">{t.accent}</span>
                  </h3>
                  <p className="mt-2 px-1 text-xs leading-relaxed text-black/55">{t.text}</p>
                  <p className="mt-3 px-1 pb-2 text-[11px] text-black/45">{t.read}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

    </>
  );
}
