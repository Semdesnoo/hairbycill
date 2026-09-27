"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reviews } from "@/lib/data";

export default function ReviewSlider() {
  const [i, setI] = useState(0);
  const review = reviews[i];
  const total = reviews.length;

  const go = (dir: 1 | -1) => setI((v) => (v + dir + total) % total);

  return (
    <div className="mx-auto max-w-3xl px-6 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-6 tracking-widest text-gold">★★★★★</p>
          <p className="font-display text-3xl leading-snug text-offwhite md:text-5xl">
            “{review.text}”
          </p>
          <p className="mt-8 text-sm uppercase tracking-widest text-offwhite/50">
            {review.name} — {review.treatment}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-center gap-6 text-sm text-offwhite/60">
        <button onClick={() => go(-1)} aria-label="Vorige review" className="hover:text-gold">
          ←
        </button>
        <span>
          0{i + 1} / 0{total}
        </span>
        <button onClick={() => go(1)} aria-label="Volgende review" className="hover:text-gold">
          →
        </button>
      </div>
    </div>
  );
}
