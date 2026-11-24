"use client";

import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import Button from "./Button";
import Scissors3D from "./Scissors3D";

const STATS = [
  { n: "93", title: "Voelt zich", accent: "zelfverzekerder", text: "Klanten geven aan zich zekerder te voelen na hun eerste afspraak." },
  { n: "87", title: "Komt", accent: "graag terug", text: "Een warme salon vol vaste gezichten die zich thuis voelen." },
  { n: "95", title: "Tevreden over", accent: "het advies", text: "Persoonlijk advies dat past bij jouw haar en jouw ritme." },
];

/** About + stats as a scroll story: the section pins while the shears spin and snip, stats light up one by one. */
export default function ScrollScissors() {
  const ref = useRef<HTMLElement>(null);
  const still = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.6 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(STATS.length - 1, Math.floor(v * STATS.length))));

  return (
    <section ref={ref} className={still ? "relative" : "relative h-[280vh]"}>
      <div className={`${still ? "py-24" : "sticky top-0 h-[100svh]"} flex items-center overflow-hidden`}>
        <div aria-hidden className="absolute right-[-10vw] top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full bg-gold/15 blur-3xl md:right-[5vw]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-4 px-6 md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-14">
          <div className="order-2 md:order-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-muted">Over Hair by Cill</p>
            <AnimatedHeading
              lines={["Jouw plek om te ontspannen,"]}
              accent="stralen en groeien"
              className="mt-3 max-w-md text-[2rem] leading-[1.05] md:text-5xl"
            />
            <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-black/60 md:block">
              We maken salonzorg toegankelijk voor iedereen, waar je ook begint en hoe druk je dag ook is geweest.
            </p>
            <ol className="mt-6 border-t border-black/10 md:mt-8">
              {STATS.map((s, i) => {
                const on = still || i === active;
                return (
                  <li
                    key={s.n}
                    className={`grid grid-cols-[4.5rem_1fr] items-baseline border-b border-black/10 py-3 transition-opacity duration-500 md:grid-cols-[6rem_1fr] md:py-4 ${on ? "opacity-100" : "opacity-30"}`}
                  >
                    <span className="text-3xl font-light tracking-tight md:text-4xl">
                      {s.n}
                      <sup className="text-xs">%</sup>
                    </span>
                    <span>
                      <span className="text-sm font-medium">
                        {s.title} <span className="accent text-base text-gold-muted">{s.accent}</span>
                      </span>
                      <span className="mt-1 hidden text-xs leading-relaxed text-black/55 md:block">{s.text}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            <Button href="/over-ons" className="mt-6 md:mt-8">Meer over ons</Button>
          </div>
          <Scissors3D p={p} still={still} className="order-1 h-[34svh] md:order-2 md:h-[80svh]" />
        </div>
      </div>
    </section>
  );
}
