"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Black & gold FAQ: numbered rounded cards that rise in one by one. The open card gets a gold edge, a gold line
 * that draws itself under the question, and a plus that turns into a gold cross. One card open at a time.
 */
export default function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <motion.li
            key={f.q}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className={`overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-500 ${
              isOpen ? "border-gold shadow-[0_12px_40px_-18px_rgba(232,176,75,0.55)]" : "border-black/10 hover:border-gold/60"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center gap-4 px-5 py-5 text-left md:gap-6 md:px-7"
            >
              <span
                className={`font-serif text-2xl italic tabular-nums transition-colors duration-500 ${isOpen ? "text-gold" : "text-black/30 group-hover:text-gold"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block text-base font-medium md:text-lg">{f.q}</span>
                <span
                  aria-hidden
                  className={`mt-2 block h-0.5 origin-left rounded-full bg-gold transition-transform duration-700 ease-out ${isOpen ? "scale-x-100" : "scale-x-0"}`}
                />
              </span>
              <span
                aria-hidden
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                  isOpen ? "rotate-45 border-gold bg-gold text-black" : "border-black/15 group-hover:border-gold group-hover:text-gold"
                }`}
              >
                <span className="absolute h-px w-3.5 bg-current" />
                <span className="absolute h-3.5 w-px bg-current" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <div className="px-5 pb-6 pl-[3.75rem] text-sm leading-relaxed text-black/65 md:px-7 md:pl-[5.25rem] md:text-base">{f.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
