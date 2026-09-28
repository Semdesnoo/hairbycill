"use client";

import { useMemo, useState } from "react";
import { treatments, stylists } from "@/lib/data";
import { availableSlots, nextBookableDates, createBooking, Booking } from "@/lib/bookingApi";

const dateLabel = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });

export default function BookingWizard() {
  const [treatment, setTreatment] = useState(treatments[0].slug);
  const [stylistSlug, setStylistSlug] = useState(stylists[stylists.length - 1].slug);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const dates = useMemo(() => nextBookableDates(), []);
  const slots = useMemo(() => (date ? availableSlots(date, stylistSlug) : []), [date, stylistSlug]);

  function submit() {
    const booking = createBooking({ ...form, treatment, stylistSlug, date, time });
    setConfirmed(booking);
  }

  if (confirmed) {
    return (
      <div className="rounded-lg border border-black/10 bg-white p-8 text-center">
        <h2 className="font-display text-3xl">Afspraak bevestigd</h2>
        <p className="mt-3 text-black/60">
          {dateLabel(confirmed.date)} om {confirmed.time}. Bewaar dit boekingsnummer om te annuleren:
        </p>
        <p className="mt-4 select-all rounded bg-ivory px-4 py-2 font-mono text-sm">{confirmed.id}</p>
        <p className="mt-4 text-sm text-black/50">Je kunt tot 12 uur van tevoren kosteloos annuleren via de contactpagina.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-black/10 bg-white p-6 md:p-10">
      {/* Step 1: treatment */}
      <fieldset className="mb-8">
        <legend className="mb-3 text-sm uppercase tracking-widest text-black/50">1. Behandeling</legend>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {treatments.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setTreatment(t.slug)}
              className={`rounded-md border px-4 py-3 text-left text-sm ${
                treatment === t.slug ? "border-black bg-black text-offwhite" : "border-black/15 hover:border-black/40"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Step 2: stylist */}
      <fieldset className="mb-8">
        <legend className="mb-3 text-sm uppercase tracking-widest text-black/50">2. Stylist</legend>
        <div className="grid grid-cols-3 gap-3">
          {stylists.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setStylistSlug(s.slug)}
              className={`rounded-md border px-4 py-3 text-left text-sm ${
                stylistSlug === s.slug ? "border-black bg-black text-offwhite" : "border-black/15 hover:border-black/40"
              }`}
            >
              <div>{s.name}</div>
              <div className={`text-xs ${stylistSlug === s.slug ? "text-offwhite/60" : "text-black/40"}`}>{s.role}</div>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Step 3: date + time */}
      <fieldset className="mb-8">
        <legend className="mb-3 text-sm uppercase tracking-widest text-black/50">3. Datum & tijd</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-1 block text-sm text-black/60">Datum</label>
            <select
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
              className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-sm focus:border-black focus:outline-none"
            >
              <option value="" disabled>Kies een datum</option>
              {dates.map((d) => (
                <option key={d} value={d}>{dateLabel(d)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="time" className="mb-1 block text-sm text-black/60">Tijd</label>
            <select
              id="time"
              value={time}
              disabled={!date}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-md border border-black/15 bg-white px-4 py-2.5 text-sm focus:border-black focus:outline-none disabled:opacity-40"
            >
              <option value="" disabled>
                {date ? (slots.length ? "Kies een tijd" : "Geen vrije tijden") : "Kies eerst een datum"}
              </option>
              {slots.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Step 4: contact info */}
      <fieldset>
        <legend className="mb-3 text-sm uppercase tracking-widest text-black/50">4. Jouw gegevens</legend>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-black/60">Naam</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-black/15 px-4 py-2.5 text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-black/60">E-mail</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md border border-black/15 px-4 py-2.5 text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm text-black/60">Telefoon</label>
            <input
              id="phone"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-md border border-black/15 px-4 py-2.5 text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="notes" className="mb-1 block text-sm text-black/60">Opmerking (optioneel)</label>
            <input
              id="notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-md border border-black/15 px-4 py-2.5 text-sm focus:border-black focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      <button
        type="button"
        disabled={!date || !time || !form.name || !form.email || !form.phone}
        onClick={submit}
        className="mt-8 w-full rounded-md bg-black py-3.5 text-sm tracking-wide text-offwhite disabled:cursor-not-allowed disabled:opacity-30"
      >
        AFSPRAAK BEVESTIGEN
      </button>
    </div>
  );
}
