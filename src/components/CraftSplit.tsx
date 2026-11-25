"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BASE_PATH } from "@/lib/basePath";

const STEPS = [
  {
    title: "Eerst advies",
    text: "We kijken samen naar je haar, je gezicht en je ritme. Pas als het plan klopt, pakken we de schaar.",
    image: "/img/spiegel.jpg",
    tags: [{ t: "Haartype", p: "left-[18%] top-[30%]" }, { t: "Wensen", p: "right-[16%] top-[58%]" }],
  },
  {
    title: "Knippen met precisie",
    text: "Een coupe die meebeweegt en ook thuis makkelijk zit. Puntjes of een complete make-over.",
    image: "/img/knippen.jpg",
    tags: [{ t: "Model", p: "left-[22%] top-[24%]" }, { t: "Lengte", p: "right-[20%] top-[66%]" }],
  },
  {
    title: "Kleur die bij je past",
    text: "Van uitgroei bijwerken tot folies en toner. Met professionele kleur voor een egale, diepe glans.",
    image: "/img/folies.jpg",
    tags: [{ t: "Folies", p: "left-[20%] top-[36%]" }, { t: "Toner", p: "right-[18%] top-[22%]" }],
  },
  {
    title: "Afwerking en glans",
    text: "Föhnen, stylen en een tip voor thuis. Zo blijft je haar mooi tot je volgende afspraak.",
    image: "/img/lang-haar.jpg",
    tags: [{ t: "Glans", p: "left-[24%] top-[40%]" }, { t: "Volume", p: "right-[22%] top-[28%]" }],
  },
];

function Step({ i, onActive, children }: { i: number; onActive: (i: number) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <div ref={ref} className="flex min-h-[50vh] flex-col justify-center py-10 md:min-h-[62vh]">
      {children}
    </div>
  );
}

/** "Zo werken wij": sticky photo left that changes per step, steps on the right joined by a line that draws as you scroll. */
export default function CraftSplit() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section className="bg-[#fbfaf7] px-3 md:px-6">
      <div className="mx-auto grid max-w-[1400px] gap-3 md:grid-cols-2 md:gap-6">
        {/* Sticky photo stack (desktop) */}
        <div className="sticky top-3 hidden h-[calc(100svh-1.5rem)] overflow-hidden rounded-3xl bg-ivory md:block">
          {STEPS.map((s, i) => (
            <div key={s.title} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}>
              <Image
                src={`${BASE_PATH}${s.image}`}
                alt=""
                fill
                sizes="50vw"
                className={`object-cover transition-transform duration-[2s] ease-out ${i === active ? "scale-100" : "scale-110"}`}
              />
              {s.tags.map((tag, k) => (
                <span
                  key={tag.t}
                  className={`absolute flex flex-col items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-700 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)] ${tag.p} ${
                    i === active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: i === active ? `${300 + k * 200}ms` : "0ms" }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
                  </span>
                  {tag.t}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="relative rounded-3xl bg-[#f4efe6] px-6 md:px-14">
          <div className="pt-20 text-center md:pt-28">
            <h2 className="text-4xl leading-[1.05] md:text-5xl">
              Zo werken <span className="accent text-gold-muted">wij</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xs text-sm text-black/55">Vier stappen, één vast gezicht. Van advies tot afwerking.</p>
          </div>

          <div ref={listRef} className="relative">
            {/* drawing line + arrow head */}
            <div aria-hidden className="absolute bottom-[30vh] left-1/2 top-0 hidden w-px -translate-x-1/2 bg-black/10 md:block">
              <motion.div style={{ scaleY: line }} className="h-full w-full origin-top bg-black/50" />
            </div>
            {STEPS.map((s, i) => (
              <Step key={s.title} i={i} onActive={setActive}>
                <div className={`relative mx-auto max-w-sm bg-[#f4efe6] py-6 text-center transition-opacity duration-500 ${i === active ? "md:opacity-100" : "md:opacity-35"}`}>
                  {/* mobile photo */}
                  <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl md:hidden">
                    <Image src={`${BASE_PATH}${s.image}`} alt="" fill sizes="100vw" className="object-cover" />
                  </div>
                  <p className="text-xs tabular-nums text-gold-muted">0{i + 1}</p>
                  <h3 className="mt-2 text-3xl leading-tight md:text-4xl">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/60">{s.text}</p>
                </div>
              </Step>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
