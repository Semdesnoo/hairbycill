"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BASE_PATH } from "@/lib/basePath";

const ease = [0.16, 1, 0.3, 1] as const;

/** App-style booking hero: dark portrait, big two-line headline, gold pill CTA; copy slides in from the left. */
export default function BookingHero() {
  const still = !!useReducedMotion();
  const side = (delay: number) =>
    still ? {} : { initial: { opacity: 0, x: -70 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-black text-offwhite">
      <Image
        src={`${BASE_PATH}/img/lang-haar.jpg`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_20%] opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <div className="on-photo relative z-10 w-full max-w-xl px-6 pb-16 md:px-14 md:pb-24">
        <motion.h1 {...side(0.1)} className="text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02]">
          Zie er goed uit,
          <br />
          voel je <span className="accent text-gold">stralend</span>
        </motion.h1>
        <motion.p {...side(0.25)} className="mt-4 max-w-xs text-sm leading-relaxed text-offwhite/80">
          Schoonheid en stijl, helemaal afgestemd op jou. Binnen een minuut geboekt.
        </motion.p>
        <motion.a
          {...side(0.4)}
          href="#boeken"
          className="group mt-8 flex max-w-sm items-center justify-between rounded-full bg-gold py-2 pl-7 pr-2 text-sm font-medium text-black [text-shadow:none] transition-colors hover:bg-offwhite"
        >
          Afspraak boeken
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-gold transition-transform group-hover:translate-x-0.5">→</span>
        </motion.a>
        <motion.a {...side(0.55)} href="#boeken" className="mt-5 flex max-w-sm flex-col items-center gap-1 text-xs text-offwhite/70 hover:text-gold">
          Bekijk behandelingen
          <span aria-hidden className={still ? "" : "animate-bounce"}>⌄</span>
        </motion.a>
      </div>
    </section>
  );
}
