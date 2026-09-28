"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { findBooking, canCancel, hoursUntil, cancelBooking, stylistName, Booking } from "@/lib/bookingApi";
import { treatments } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });

/** Cancel an appointment with email + the 6-char code from the confirmation. Allowed until 12h before. */
export default function CancelBooking({ dark = false }: { dark?: boolean }) {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  const [cancelled, setCancelled] = useState(false);

  const field = `w-full rounded-full border bg-transparent px-5 py-3 text-sm focus:outline-none ${
    dark
      ? "border-offwhite/20 text-offwhite placeholder:text-offwhite/40 focus:border-offwhite/70"
      : "border-black/15 placeholder:text-black/35 focus:border-black"
  }`;

  function lookup(e: React.FormEvent) {
    e.preventDefault();
    setBooking(findBooking(code, email) ?? null);
  }

  if (cancelled) {
    return (
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm opacity-75">
        Je afspraak is geannuleerd. Het tijdslot komt weer vrij. Tot een volgende keer!
      </motion.p>
    );
  }

  return (
    <div>
      <form onSubmit={lookup} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="E-mailadres"
          aria-label="E-mailadres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />
        <input
          required
          placeholder="Annuleringscode"
          aria-label="Annuleringscode"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className={`${field} font-mono tracking-[0.3em]`}
        />
        <button
          type="submit"
          className={`rounded-full px-7 py-3 text-sm transition-colors ${
            dark ? "bg-offwhite text-black hover:bg-gold" : "bg-black text-offwhite hover:bg-gold hover:text-black"
          }`}
        >
          Zoeken
        </button>
      </form>

      <AnimatePresence mode="wait">
        {booking === null && (
          <motion.p
            key="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-4 text-sm text-red-400"
          >
            Geen afspraak gevonden met deze code en dit e-mailadres.
          </motion.p>
        )}
        {booking && (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className={`mt-5 rounded-2xl p-5 text-sm ${dark ? "bg-offwhite/10" : "bg-ivory/70"}`}
          >
            <p className="text-base">
              {treatments.find((t) => t.slug === booking.treatment)?.name ?? booking.treatment}
            </p>
            <p className="mt-1 opacity-70">
              {longDate(booking.date)} om {booking.time} · {stylistName(booking.stylistSlug)}
            </p>
            {canCancel(booking) ? (
              <button
                type="button"
                onClick={() => {
                  cancelBooking(booking.id);
                  setCancelled(true);
                }}
                className="mt-4 rounded-full border border-red-400/60 px-5 py-2 text-xs text-red-400 transition-colors hover:bg-red-500 hover:text-white"
              >
                Afspraak definitief annuleren
              </button>
            ) : (
              <p className="mt-4 text-red-400">
                Annuleren kan tot 12 uur van tevoren (nog {Math.max(0, Math.round(hoursUntil(booking)))} uur tot je
                afspraak). Bel ons even, dan kijken we samen wat mogelijk is.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
