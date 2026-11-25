"use client";

import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { BASE_PATH } from "@/lib/basePath";
import { euroToNumber, priceList, team, treatments } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

// Real numbers only (no invented percentages): all from data.ts.
const cutFrom = Math.min(...(priceList.find((c) => c.title === "Knippen")?.items ?? []).map((i) => euroToNumber(i.price)));
const STATS = [
  { value: team.length, decimals: 0, prefix: "", label: "vaste stylisten, altijd hetzelfde gezicht" },
  { value: treatments.length, decimals: 0, prefix: "", label: "behandelingen, van coupe tot verlenging" },
  { value: cutFrom, decimals: 2, prefix: "€", label: "knippen vanaf, inclusief advies" },
];

// Focus frames that "scan" the hair, like the reference video's face-analysis boxes.
const FRAMES = [
  { label: "Glans", className: "left-[14%] top-[30%] h-[16%] w-[22%]" },
  { label: "Kleur", className: "right-[16%] top-[18%] h-[14%] w-[20%]" },
  { label: "Coupe", className: "right-[10%] top-[62%] h-[18%] w-[24%]" },
];

/** Word-by-word blur-in, the reference video's headline effect. */
function BlurWords({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, filter: "blur(12px)", y: "0.25em" }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.12, ease }}
        >
          {w}{" "}
        </motion.span>
      ))}
    </span>
  );
}

function CountUp({ to, decimals, prefix }: { to: number; decimals: number; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const fmt = (v: number) => prefix + v.toLocaleString("nl-NL", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const [txt, setTxt] = useState(fmt(0));
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, delay: 0.8, ease, onUpdate: (v) => setTxt(fmt(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);
  return <span ref={ref}>{txt}</span>;
}

/** Light, airy hero: blur-in headline left, portrait centre with scanning frames, live stats right. */
export default function HomeHero() {
  const still = !!useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 900], ["0%", "-12%"]);

  return (
    <section className="relative overflow-hidden bg-[#fbfaf7] pt-24 md:pt-20">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1400px] items-center gap-6 px-6 md:grid-cols-[1fr_1.15fr_0.8fr] md:px-10">
        {/* Copy */}
        <div className="relative z-10 order-2 pb-10 md:order-1 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white py-1 pl-1 pr-4 shadow-[0_1px_0_rgba(14,12,10,0.04)]"
          >
            <span className="flex -space-x-2">
              {team.map((m) => (
                <span key={m.name} className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white">
                  <Image src={m.image} alt="" fill sizes="28px" className="object-cover" />
                </span>
              ))}
            </span>
            <span className="text-xs text-black/70">
              Bij <span className="font-medium text-black">{team.map((m) => m.name).join(" & ")}</span>
            </span>
          </motion.div>

          <h1 className="mt-6 text-[clamp(2.9rem,5.4vw,5rem)] leading-[0.98] tracking-[-0.04em]">
            <BlurWords text="Jouw haar," delay={0.15} />
            <br />
            <BlurWords text="jouw uitstraling" delay={0.45} className="accent text-gold-muted" />
          </h1>
          <motion.p
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-5 max-w-xs text-sm leading-relaxed text-black/60"
          >
            Knippen, kleuren en stylen met persoonlijk advies, in een rustige salon in Rhoon.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.05, ease }} className="mt-7">
            <Button href="/afspraak">Plan je afspraak</Button>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0 round 999px 999px 24px 24px)" }}
          animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 24px 24px)" }}
          transition={{ duration: 1.3, ease }}
          className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-ivory md:order-2 md:aspect-auto md:h-[calc(100svh-7rem)] md:max-h-[820px]"
        >
          {/* Arch portrait: slow settle-zoom on load, then drifts up as you scroll away (parallax). */}
          <motion.div
            style={still ? undefined : { y: drift, scale: 1.12 }}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: 2.4, ease }}
            className="absolute inset-0"
          >
            <Image
              src={`${BASE_PATH}/img/hero.jpg`}
              alt="Vrouw met lang, glanzend donker haar"
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </motion.div>
          {FRAMES.map((f, i) => (
            <motion.span
              key={f.label}
              aria-hidden
              initial={{ opacity: 0, scale: 1.25 }}
              animate={still ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 1], scale: [1.25, 1, 1] }}
              transition={{ duration: 0.9, delay: 1.2 + i * 0.35, ease }}
              className={`absolute ${f.className}`}
            >
              {/* four corner brackets */}
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white" />
              <span className="absolute -top-6 left-0 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-black backdrop-blur-sm">
                {f.label}
              </span>
            </motion.span>
          ))}
        </motion.div>

        {/* Stats */}
        <ul className="order-3 hidden space-y-8 md:block">
          {STATS.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease }}
              className="ml-auto max-w-[14rem] text-right"
            >
              <p className="text-4xl font-light tracking-tight tabular-nums">
                <CountUp to={s.value} decimals={s.decimals} prefix={s.prefix} />
              </p>
              <p className="mt-1 text-xs leading-relaxed text-black/50">{s.label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
