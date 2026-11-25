"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { findBooking, canCancel, hoursUntil, cancelBooking, type Booking } from "@/lib/bookingApi";

const ease = [0.16, 1, 0.3, 1] as const;
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });

/** Cancel an appointment with email + the 6-char code from the confirmation. Allowed until 12h before. */
export default function CancelBooking() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  const [cancelled, setCancelled] = useState(false);
  const [err, setErr] = useState("");

  const field =
    "w-full rounded-full border border-black/20 bg-white px-5 py-3 text-sm text-black placeholder:text-black/45 focus:border-black focus:outline-none focus:ring-1 focus:ring-black";

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      setBooking((await findBooking(code, email)) ?? null);
    } catch {
      setErr("Zoeken lukte niet. Controleer je internet en probeer opnieuw.");
    }
  }

  async function cancel() {
    setErr("");
    try {
      if (await cancelBooking(code, email)) setCancelled(true);
      else setErr("Annuleren lukte niet (minder dan 12 uur van tevoren?). Bel of WhatsApp ons even.");
    } catch {
      setErr("Annuleren lukte niet. Controleer je internet en probeer opnieuw.");
    }
  }

  if (cancelled) {
    return (
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
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
          className="rounded-full bg-black px-7 py-3 text-sm font-medium text-offwhite transition-colors hover:bg-gold hover:text-black"
        >
          Zoeken
        </button>
      </form>

      {err && <p role="alert" className="mt-4 text-sm text-red-700">{err}</p>}
      <AnimatePresence mode="wait">
        {booking === null && (
          <motion.p
            key="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-4 text-sm text-red-700"
          >
            Geen afspraak gevonden met deze code en dit e-mailadres.
          </motion.p>
        )}
        {booking && (
          <motion.div
            key={booking.code}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mt-5 rounded-2xl border border-black/10 bg-white p-5 text-sm"
          >
            <p className="text-base font-medium">
              {booking.treatment}
            </p>
            <p className="mt-1 text-black/65">
              {longDate(booking.date)} om {booking.time} · {booking.stylistSlug.replace(/^./, (c) => c.toUpperCase())}
            </p>
            {canCancel(booking) ? (
              <button
                type="button"
                onClick={cancel}
                className="mt-4 rounded-full bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-800"
              >
                Afspraak definitief annuleren
              </button>
            ) : (
              <p className="mt-4 text-red-700">
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
