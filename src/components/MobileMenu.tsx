"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import BookButton from "./BookButton";
import { SOCIALS } from "./Footer";
import { business, navLinks } from "@/lib/data";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-black px-6 pt-28 pb-12 md:hidden"
        >
          <nav className="flex flex-col gap-2">
            {navLinks.filter((l) => l.href !== "/").map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-baseline gap-4 py-3 font-display text-4xl text-offwhite"
                >
                  <span className="text-sm text-gold">0{i + 1}</span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <BookButton className="w-full" />
            <div className="flex items-center justify-between text-sm text-offwhite/60">
              <div className="flex gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${business.name} op ${s.label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-offwhite/15 text-offwhite transition-colors hover:border-gold hover:bg-gold hover:text-black"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
              <a href={business.phoneHref}>{business.phone}</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
