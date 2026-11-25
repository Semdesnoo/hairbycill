"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import HeroVideo from "./HeroVideo";
import { euroToNumber, priceList, team, treatments } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

// Real numbers only, all from data.ts.
const cutFrom = Math.min(...(priceList.find((c) => c.title === "Knippen")?.items ?? []).map((i) => euroToNumber(i.price)));
const STATS = [
  { value: String(team.length), label: "vaste stylisten" },
  { value: String(treatments.length), label: "behandelingen" },
  { value: `€${cutFrom.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`, label: "knippen vanaf" },
];

/** Original video hero; copy and buttons slide in from the left, stats from the right. */
export default function HomeHero() {
  const still = !!useReducedMotion();
  const fromSide = (dir: -1 | 1, delay: number) =>
    still
      ? {}
      : { initial: { opacity: 0, x: dir * 80 }, animate: { opacity: 1, x: 0 }, transition: { duration: 1, delay, ease } };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black">
      <HeroVideo className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

      <div className="on-photo relative z-10 mx-auto grid w-full max-w-[1400px] items-end gap-10 px-6 py-32 md:grid-cols-[1fr_auto] md:px-14">
        <div>
          <motion.p {...fromSide(-1, 0.1)} className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Kapsalon in Rhoon
          </motion.p>
          <motion.h1 {...fromSide(-1, 0.2)} className="mt-4 max-w-2xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] text-offwhite">
            Jouw haar, <span className="accent text-gold">jouw uitstraling</span>
          </motion.h1>
          <motion.p {...fromSide(-1, 0.35)} className="mt-5 max-w-sm text-sm leading-relaxed text-offwhite/85">
            Knippen, kleuren en stylen met persoonlijk advies, bij {team.map((m) => m.name).join(" & ")}.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3 [text-shadow:none]">
            <motion.div {...fromSide(-1, 0.5)}>
              <Link
                href="/afspraak"
                className="group inline-flex items-center gap-3 rounded-full bg-offwhite py-1.5 pl-6 pr-1.5 text-sm font-medium text-black transition-colors hover:bg-gold"
              >
                Plan je afspraak
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-gold transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
            </motion.div>
            <motion.div {...fromSide(-1, 0.62)}>
              <Link
                href="/prijslijst"
                className="inline-flex h-12 items-center rounded-full border border-offwhite/40 px-6 text-sm text-offwhite backdrop-blur-sm transition-colors hover:border-offwhite hover:bg-offwhite/10"
              >
                Bekijk prijzen
              </Link>
            </motion.div>
          </div>
        </div>

        <ul className="hidden gap-3 md:grid">
          {STATS.map((s, i) => (
            <motion.li
              key={s.label}
              {...fromSide(1, 0.5 + i * 0.12)}
              className="min-w-[12rem] rounded-2xl border border-offwhite/15 bg-black/30 px-5 py-4 text-right backdrop-blur-md"
            >
              <p className="text-3xl font-light tracking-tight text-offwhite">{s.value}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-offwhite/65">{s.label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
