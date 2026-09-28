"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { saveConsent, getConsent } from "@/lib/bookingApi";

const noop = () => () => {};

/** Cookie consent + optional newsletter opt-in (explicit checkbox: AVG requires active consent for marketing mail). */
export default function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);
  // Server snapshot = "consented" so nothing renders in the static HTML; client reads localStorage.
  const consented = useSyncExternalStore(noop, () => getConsent() !== null, () => true);
  const show = !consented && !dismissed;
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);


  function close(cookies: "all" | "necessary") {
    saveConsent({ cookies, email: optIn && /\S+@\S+\.\S+/.test(email) ? email.trim() : null });
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookievoorkeuren"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-lg rounded-3xl bg-black p-6 text-offwhite shadow-2xl shadow-black/40 md:bottom-6 md:left-6 md:right-auto md:p-7"
        >
          <p className="text-xl font-light">
            Even over <span className="accent text-gold">cookies</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-offwhite/65">
            We gebruiken cookies om de site goed te laten werken en te verbeteren. Wil je ook als eerste onze
            acties en haartips ontvangen? Laat je e-mail achter.
          </p>

          <input
            type="email"
            autoComplete="email"
            placeholder="Jouw e-mailadres (optioneel)"
            aria-label="E-mailadres voor de nieuwsbrief"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value) setOptIn(true);
            }}
            className="mt-4 w-full rounded-full border border-offwhite/20 bg-transparent px-5 py-3 text-sm placeholder:text-offwhite/40 focus:border-offwhite/70 focus:outline-none"
          />
          <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-xs text-offwhite/60">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="mt-0.5 accent-[var(--color-gold)]"
            />
            Ja, stuur mij acties en tips van Hair by Cill. Afmelden kan altijd.
          </label>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => close("all")}
              className="flex-1 rounded-full bg-offwhite py-3 text-sm text-black transition-colors hover:bg-gold"
            >
              Alles accepteren
            </button>
            <button
              type="button"
              onClick={() => close("necessary")}
              className="flex-1 rounded-full border border-offwhite/25 py-3 text-sm transition-colors hover:border-offwhite"
            >
              Alleen noodzakelijk
            </button>
          </div>
          <Link href="/contact" className="mt-3 block text-center text-[11px] text-offwhite/40 underline-offset-2 hover:underline">
            Vragen over je gegevens? Neem contact op
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
