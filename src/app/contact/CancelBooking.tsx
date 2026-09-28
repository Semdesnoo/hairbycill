"use client";

import { useState } from "react";
import { findBooking, canCancel, hoursUntil, cancelBooking, Booking } from "@/lib/bookingApi";
import { stylistName } from "@/lib/bookingApi";

export default function CancelBooking() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  const [cancelled, setCancelled] = useState(false);

  function lookup(e: React.FormEvent) {
    e.preventDefault();
    setBooking(findBooking(id.trim(), email.trim()) ?? null);
  }

  function doCancel() {
    if (!booking) return;
    cancelBooking(booking.id);
    setCancelled(true);
  }

  if (cancelled) {
    return <p className="text-sm text-black/60">Je afspraak is geannuleerd. De tijd komt weer vrij.</p>;
  }

  return (
    <div>
      <form onSubmit={lookup} className="flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="Boekingsnummer"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="flex-1 rounded-full border border-black/15 bg-transparent px-4 py-2.5 text-sm focus:border-black focus:outline-none"
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-full border border-black/15 bg-transparent px-4 py-2.5 text-sm focus:border-black focus:outline-none"
        />
        <button type="submit" className="rounded-full bg-gold-muted px-6 py-2.5 text-sm text-offwhite hover:bg-black">
          Zoeken
        </button>
      </form>

      {booking === null && (
        <p className="mt-4 text-sm text-red-700">Geen afspraak gevonden met dat nummer en e-mailadres.</p>
      )}

      {booking && (
        <div className="mt-4 rounded-2xl bg-ivory/70 p-4 text-sm">
          <p>
            {booking.date} om {booking.time} bij {stylistName(booking.stylistSlug)}
          </p>
          {canCancel(booking) ? (
            <button
              type="button"
              onClick={doCancel}
              className="mt-3 rounded-full bg-gold-muted px-5 py-2 text-xs text-offwhite"
            >
              Annuleer deze afspraak
            </button>
          ) : (
            <p className="mt-3 text-red-700">
              Annuleren kan alleen tot 12 uur van tevoren (nog {Math.max(0, Math.round(hoursUntil(booking)))} uur te gaan). Bel ons voor uitzonderingen.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
