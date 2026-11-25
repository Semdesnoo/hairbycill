"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Words that ink in gold (italic accent) instead of black.
const TEXT = "Bij *Hair *by *Cill draait alles om jou. Wij luisteren, adviseren eerlijk en werken met topkwaliteit kleur, zodat je de salon uitloopt met haar waar je *elke *dag *blij *van *wordt.";

function Word({ word, p, range }: { word: string; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.15, 1]);
  const gold = word.startsWith("*");
  return (
    <motion.span style={{ opacity }} className={`inline-block whitespace-pre ${gold ? "accent text-gold-muted" : "text-black"}`}>
      {gold ? word.slice(1) : word}{" "}
    </motion.span>
  );
}

/** Statement whose words ink in (black, key words gold) as you scroll past. No pinning. */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section ref={ref} className="px-6 py-28 md:py-40">
      <p className="mx-auto max-w-4xl text-center text-[clamp(1.7rem,3.6vw,3.1rem)] font-light leading-[1.15] tracking-[-0.03em]">
        {words.map((w, i) => (
          <Word key={i} word={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  );
}
