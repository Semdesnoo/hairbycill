"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-black/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="border-b border-black/10">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left text-xs font-medium uppercase tracking-wider"
            >
              {item.title}
              <span className={`text-base transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>⌄</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm leading-relaxed text-black/65">{item.content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
