"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { BASE_PATH } from "@/lib/basePath";
import { openingHours, reviews, team, tips, treatments } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;
const u = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/** Round arrow button used by sliders. */
function Arrow({ dir, onClick, dark = false }: { dir: "prev" | "next"; onClick: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Vorige" : "Volgende"}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        dark ? "bg-gold-muted text-offwhite hover:bg-black" : "border border-black/20 hover:border-black"
      }`}
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );
}

export default function Home() {
  const teamRef = useRef<HTMLDivElement>(null);
  const [teamProgress, setTeamProgress] = useState(0);
  const openDays = openingHours.filter((o) => o.hours !== "Gesloten");
  const [day, setDay] = useState(openDays[0].day);
  const [review, setReview] = useState(0);
  const r = reviews[review];

  const scrollTeam = (dir: 1 | -1) =>
    teamRef.current?.scrollBy({ left: dir * teamRef.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <>
        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black md:min-h-[760px]">
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
        </section>

        {/* TREATMENTS: arched portraits */}
        <section className="px-6 py-20 md:px-14 md:py-24">
          <AnimatedHeading
            lines={["Onze"]}
            accent="behandelingen"
            className="text-center text-4xl leading-[1.05] md:text-5xl"
          />
          <div className="mt-12 flex snap-x gap-3 overflow-x-auto [scrollbar-width:none] md:justify-center md:gap-4">
            {treatments.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.06} className="shrink-0 snap-start">
                <Link
                  href={`/afspraak?treatment=${t.slug}`}
                  className="group relative block h-60 w-36 overflow-hidden rounded-full md:h-80 md:w-48"
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pb-6 pt-12 text-center text-sm text-offwhite">
                    {t.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
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

        {/* ABOUT: fanned cards + stats */}
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

          <div className="relative mx-auto mt-16 flex h-[340px] max-w-3xl items-center justify-center md:h-[420px]">
            {[
              { img: treatments[0].image, tag: "Knippen", cls: "-rotate-[10deg] -translate-x-[62%] translate-y-6" },
              { img: u("1560066984-138dadb4c035"), tag: "Onze salon", cls: "z-10 -translate-y-2" },
              { img: team[0].image, tag: "Advies", cls: "rotate-[10deg] translate-x-[62%] translate-y-6" },
            ].map((c, i) => (
              <Reveal key={c.tag} delay={i * 0.1} className={`absolute ${c.cls}`}>
                <div className="relative h-[260px] w-[190px] overflow-hidden rounded-2xl border-4 border-offwhite shadow-xl md:h-[330px] md:w-[250px]">
                  <Image src={c.img} alt={c.tag} fill sizes="250px" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-offwhite/90 px-3 py-1 text-[10px] text-black">
                    {c.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

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

        {/* TEAM slider */}
        <section className="border-t border-black/5 px-6 py-24 md:px-14 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <AnimatedHeading
                lines={["Gestyled met aandacht,", "geknipt"]}
                accent="met liefde"
                className="text-4xl leading-[1.05] md:text-5xl"
              />
              <p className="mt-4 max-w-xs text-sm text-black/60">
                Een team dat luistert, meedenkt en weet wat jouw haar nodig heeft.
              </p>
            </div>
            <div className="grid max-w-xs grid-cols-2 gap-2 text-[11px]">
              {["Persoonlijk", "Gecertificeerd", "Ervaren", "Duurzaam"].map((c) => (
                <span key={c} className="rounded-full border border-black/15 px-4 py-1.5 text-center">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={teamRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              setTeamProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
            }}
            className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none]"
          >
            {team.map((m) => (
              <div key={m.name} className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-2.5rem)/3)]">
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl bg-ivory">
                  <Image src={m.image} alt={m.name} fill sizes="(min-width:1024px) 33vw, 80vw" className="object-cover" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-offwhite/90 px-3 py-1 text-[10px]">
                    {m.role}
                  </span>
                </div>
                <p className="mt-4 text-lg">
                  {m.name} <span className="accent text-gold-muted">stylist</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-black/55">{m.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-6 border-t border-black/10 pt-8">
            <Button href="/afspraak">Afspraak maken</Button>
            <div className="hidden h-px w-40 bg-black/10 md:block">
              <div className="h-px bg-black transition-all" style={{ width: `${25 + teamProgress * 75}%` }} />
            </div>
            <div className="flex gap-2">
              <Arrow dir="prev" onClick={() => scrollTeam(-1)} />
              <Arrow dir="next" dark onClick={() => scrollTeam(1)} />
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="bg-ivory/60 px-6 py-24 md:py-28">
          <AnimatedHeading
            lines={["Verhalen van"]}
            accent="transformatie"
            className="text-center text-4xl leading-[1.05] md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-sm text-center text-sm text-black/60">
            Wat onze klanten zeggen na hun afspraak.
          </p>
          <div className="mx-auto mt-14 grid max-w-4xl items-center gap-10 md:grid-cols-[260px_1fr]">
            <div className="relative aspect-[4/3.6] overflow-hidden rounded-2xl">
              <Image src={r.image} alt={r.name} fill sizes="260px" className="object-cover" />
            </div>
            <motion.div key={review} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
              <p className="text-xl leading-snug md:text-2xl">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-black/50">{r.treatment}</p>
                </div>
                <div className="flex gap-2">
                  <Arrow dir="prev" onClick={() => setReview((review - 1 + reviews.length) % reviews.length)} />
                  <Arrow dir="next" dark onClick={() => setReview((review + 1) % reviews.length)} />
                </div>
              </div>
            </motion.div>
          </div>
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
