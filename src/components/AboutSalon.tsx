"use client";

import { useReducedMotion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import Button from "./Button";
import Reveal from "./Reveal";
import Scissors3D from "./Scissors3D";

const STATS = [
  { n: "93", label: "voelt zich zelfverzekerder na de eerste afspraak" },
  { n: "87", label: "komt graag bij ons terug" },
  { n: "95", label: "is tevreden over het persoonlijke advies" },
];

/** About band: dark section, 3D shears turning and snipping on their own next to the story and stats. */
export default function AboutSalon() {
  const still = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 text-offwhite md:px-14 md:py-28">
      <div aria-hidden className="absolute left-[-15vw] top-1/2 h-[80vh] w-[80vh] -translate-y-1/2 rounded-full bg-gold/20 blur-[120px] md:left-[2vw]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-[1fr_1.1fr] md:gap-14">
        <Scissors3D still={still} className="h-[42svh] md:h-[68svh]" />

        <div>
          <AnimatedHeading
            lines={["Jouw plek om te ontspannen,"]}
            accent="stralen en groeien"
            className="max-w-md text-4xl leading-[1.08] md:text-5xl"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-offwhite/70">
            We maken salonzorg toegankelijk voor iedereen, waar je ook begint en hoe druk je dag ook is geweest.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-offwhite/15 pt-6 md:gap-8">
            {STATS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <dt className="gold-foil text-4xl font-light tracking-tight md:text-5xl">
                  {s.n}
                  <span className="text-xl">%</span>
                </dt>
                <dd className="mt-2 text-xs leading-relaxed text-offwhite/60">{s.label}</dd>
              </Reveal>
            ))}
          </dl>

          <Button href="/over-ons" variant="light" className="mt-10">
            Meer over ons
          </Button>
        </div>
      </div>
    </section>
  );
}
