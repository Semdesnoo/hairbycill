"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
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
              className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium"
            >
              {item.title}
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
                className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
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
                  <div className="pb-5 text-sm leading-relaxed text-black/65">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
