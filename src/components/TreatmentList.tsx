"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { treatments, whatsappBooking } from "@/lib/data";

const SIZE = 300;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/**
 * Treatments as big editorial rows; hovering a row lets its photo follow the cursor with a spring + skew
 * (after 21st.dev "Hover Image List"). Mouse only; touch screens get a small photo inside each row instead.
 * Every row opens WhatsApp with a booking message for that treatment.
 */
export default function TreatmentList() {
  const still = !!useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const last = useRef<{ t: number; x: number } | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const skew = useMotionValue(0);
  const sx = useSpring(x, { damping: 26, stiffness: 260 });
  const sy = useSpring(y, { damping: 26, stiffness: 260 });
  const sSkew = useSpring(skew, { damping: 18, stiffness: 220 });

  function move(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !box.current) return;
    const r = box.current.getBoundingClientRect();
    const lx = e.clientX - r.left;
    const now = performance.now();
    if (last.current && !still) {
      const dt = Math.min(now - last.current.t, 50);
      if (dt > 0) skew.set(clamp(((lx - last.current.x) / dt) * 0.12, -8, 8));
    }
    last.current = { t: now, x: lx };
    x.set(lx - SIZE / 2);
    y.set(e.clientY - r.top - SIZE * 0.6);
  }

  const item = active === null ? null : treatments[active];

  return (
    <div
      ref={box}
      className="relative"
      onPointerMove={move}
      onPointerLeave={() => {
        setActive(null);
        last.current = null;
        skew.set(0);
      }}
    >
      <ul className="border-t border-offwhite/15">
        {treatments.map((t, i) => (
          <li key={t.slug} className="border-b border-offwhite/15">
            <a
              href={whatsappBooking(t.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.name} boeken via WhatsApp, ${t.price}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={`group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-opacity duration-300 md:grid-cols-[4rem_1fr_auto_auto] md:gap-8 md:py-9 ${
                active !== null && active !== i ? "md:opacity-35" : ""
              }`}
            >
              {/* Touch screens: the photo lives in the row */}
              <span className="relative h-16 w-16 overflow-hidden rounded-2xl md:hidden">
                <Image src={t.image} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="hidden text-sm tabular-nums text-gold md:block">0{i + 1}</span>
              <span>
                <span className="block text-3xl leading-none tracking-[-0.04em] text-offwhite transition-colors duration-300 group-hover:text-gold md:text-6xl">
                  {t.name} <span className="accent text-offwhite/60 group-hover:text-gold/80">{t.accent.toLowerCase()}</span>
                </span>
                <span className="mt-2 block text-sm text-offwhite/55 md:hidden">
                  {t.price} · {t.duration}
                </span>
                <span className="mt-3 hidden max-w-md text-sm text-offwhite/55 md:block">{t.description}</span>
              </span>
              <span className="hidden text-right text-sm text-offwhite/70 md:block">
                <span className="block text-offwhite">{t.price}</span>
                {t.duration}
              </span>
              <span
                aria-hidden
                className="flex h-11 w-11 items-center justify-center rounded-full border border-offwhite/20 text-gold transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-gold group-hover:bg-gold group-hover:text-black md:h-14 md:w-14"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Cursor-following photo (desktop only) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <motion.div
          className="absolute left-0 top-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-gold/40"
          style={{ width: SIZE, height: SIZE * 1.2, x: sx, y: sy, skewX: still ? 0 : sSkew }}
          initial={false}
          animate={{ opacity: item ? 1 : 0, scale: item ? 1 : 0.9 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
        >
          <AnimatePresence initial={false}>
            {item && (
              <motion.div
                key={item.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <Image src={item.image} alt="" fill sizes={`${SIZE}px`} className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
