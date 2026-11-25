"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TEXT =
  "Bij Hair by Cill draait alles om jou. Wij luisteren, adviseren eerlijk en werken met topkwaliteit kleur, zodat je de salon uitloopt met haar waar je elke dag blij van wordt.";

// Small chips that float around the statement, like the reference video's mood tags.
const CHIPS = [
  { label: "Glanzend", className: "left-[6%] top-[8%]", dot: "bg-gold" },
  { label: "Verzorgd", className: "right-[8%] top-[4%]", dot: "bg-rose-300" },
  { label: "Zelfverzekerd", className: "left-[2%] top-[52%]", dot: "bg-emerald-400" },
  { label: "Stralend", className: "right-[4%] top-[60%]", dot: "bg-amber-300" },
  { label: "Ontspannen", className: "left-[30%] bottom-[2%]", dot: "bg-sky-300" },
];

function Word({ word, p, range }: { word: string; p: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(p, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

/** Statement whose words ink in one by one as you scroll past (no pinning). */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#fbfaf7] px-6 py-28 md:py-40">
      {CHIPS.map((c, i) => (
        <motion.span
          key={c.label}
          aria-hidden
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className={`absolute hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs text-black/70 shadow-[0_6px_24px_-8px_rgba(14,12,10,0.15)] md:flex ${c.className}`}
          style={{ animation: `float 6s ease-in-out ${i * 0.8}s infinite` }}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
          {c.label}
        </motion.span>
      ))}
      <p className="relative mx-auto max-w-4xl text-center text-[clamp(1.7rem,3.6vw,3.1rem)] font-light leading-[1.15] tracking-[-0.03em]">
        {words.map((w, i) => (
          <Word key={i} word={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  );
}
