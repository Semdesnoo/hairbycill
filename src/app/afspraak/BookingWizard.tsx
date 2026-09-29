"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { treatments, stylists } from "@/lib/data";
import { availableSlots, nextBookableDates, createBooking, isClosed, isoDate, lastContact, Booking } from "@/lib/bookingApi";

const noop = () => () => {};
const ease = [0.16, 1, 0.3, 1] as const;
const WEEKDAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });

/** Monday-first week grid covering every bookable date; cells outside the range are null. */
function calendarWeeks(dates: string[]): (string | null)[][] {
  const bookable = new Set(dates);
  const d = new Date(`${dates[0]}T00:00:00`);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  const weeks: (string | null)[][] = [];
  while (isoDate(d) <= dates[dates.length - 1]) {
    const week: (string | null)[] = [];
    for (let i = 0; i < 7; i++) {
      const iso = isoDate(d);
      week.push(bookable.has(iso) ? iso : null);
      d.setDate(d.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <motion.fieldset
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease }}
      className="border-t border-black/10 pt-8 first:border-t-0 first:pt-0"
    >
      <legend className="mb-5 flex items-baseline gap-3 text-2xl font-light">
        <span className="accent text-gold-muted">{String(n).padStart(2, "0")}</span>
        {title}
      </legend>
      {children}
    </motion.fieldset>
  );
}

const choice = (active: boolean) =>
  `rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
    active
      ? "border-black bg-black text-offwhite shadow-lg shadow-black/15"
      : "border-black/10 bg-offwhite hover:-translate-y-0.5 hover:border-black/40"
  }`;

export default function BookingWizard() {
  const [treatment, setTreatment] = useState(treatments[0].slug);
  const [stylistSlug, setStylistSlug] = useState(stylists[stylists.length - 1].slug);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [newsletter, setNewsletter] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  // Dates depend on "today": false during static prerender, true in the browser.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const dates = useMemo(() => nextBookableDates(), []);
  const weeks = useMemo(() => calendarWeeks(dates), [dates]);
  const slots = useMemo(() => (date ? availableSlots(date, stylistSlug) : []), [date, stylistSlug]);
  const t = treatments.find((x) => x.slug === treatment)!;
  const s = stylists.find((x) => x.slug === stylistSlug)!;
  const ready = date && time && form.name && /\S+@\S+\.\S+/.test(form.email) && form.phone;
  const confirm = () => setConfirmed(createBooking({ ...form, newsletter, treatment, stylistSlug, date, time }));

  const monthLabel = useMemo(() => {
    const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("nl-NL", { month: "long" });
    const a = fmt(dates[0]);
    const b = fmt(dates[dates.length - 1]);
    return a === b ? a : `${a} / ${b}`;
  }, [dates]);

  // Prefill from ?treatment=&date=&time= (window.location: no Suspense needed in a static export).
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time read of external URL state after mount */
    const q = new URLSearchParams(window.location.search);
    const tq = q.get("treatment");
    const d = q.get("date");
    const tm = q.get("time");
    if (tq && treatments.some((x) => x.slug === tq)) setTreatment(tq);
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) setDate(d);
    if (tm && /^\d{2}:\d{2}$/.test(tm)) setTime(tm);
    const known = lastContact(); // returning client: prefill from her previous booking
    if (known) setForm((f) => ({ ...f, ...known }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto max-w-xl rounded-3xl bg-black p-10 text-center text-offwhite md:p-14"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-2xl text-black"
        >
          ✓
        </motion.div>
        <h2 className="mt-6 text-4xl font-light">
          Tot <span className="accent text-gold">snel</span>, {confirmed.name.split(" ")[0]}
        </h2>
        <p className="mt-4 text-offwhite/70">
          {t.name} op {longDate(confirmed.date)} om {confirmed.time}.
        </p>
        <p className="mt-8 text-xs text-offwhite/50">Jouw annuleringscode</p>
        <p className="mt-2 select-all font-mono text-3xl tracking-[0.4em] text-gold">{confirmed.code}</p>
        <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-offwhite/60">
          Bewaar deze code. Met je e-mailadres en deze code kun je tot 12 uur van tevoren kosteloos annuleren,
          onderaan deze pagina.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-full bg-ivory/70 py-2 pl-6 pr-2 text-sm">
        <span className="text-black/60">Al een afspraak en kom je toch niet?</span>
        <a href="#annuleren" className="rounded-full border border-black/20 px-5 py-2 transition-colors hover:border-black hover:bg-black hover:text-offwhite">
          Boeking annuleren
        </a>
      </div>
    <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
      <div className="space-y-10">
        <Step n={1} title="Kies je behandeling">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {treatments.map((x) => (
              <button key={x.slug} type="button" onClick={() => setTreatment(x.slug)} className={choice(treatment === x.slug)}>
                <span className="block text-base">
                  {x.name} <span className={`accent ${treatment === x.slug ? "text-gold" : "text-gold-muted"}`}>{x.accent}</span>
                </span>
                <span className="mt-1 block text-xs opacity-60">
                  {x.duration} · {x.price}
                </span>
              </button>
            ))}
          </div>
        </Step>

        <Step n={2} title="Bij wie?">
          <div className="grid gap-3 sm:grid-cols-3">
            {stylists.map((x) => (
              <button
                key={x.slug}
                type="button"
                onClick={() => {
                  setStylistSlug(x.slug);
                  setTime("");
                }}
                className={choice(stylistSlug === x.slug)}
              >
                <span className="block text-base">{x.name}</span>
                <span className="mt-1 block text-xs opacity-60">{x.role}</span>
              </button>
            ))}
          </div>
        </Step>
      </div>

      {/* Summary: next to steps 1-2 on desktop, last on mobile */}
      <aside className="order-last lg:order-none">
        <div className="rounded-3xl bg-ivory p-7">
          <p className="text-xl font-light">
            Jouw <span className="accent text-gold-muted">afspraak</span>
          </p>
          <dl className="mt-6 space-y-4 text-sm">
            {[
              ["Behandeling", `${t.name} · ${t.duration}`],
              ["Stylist", s.name],
              ["Datum", date ? longDate(date) : "Nog niet gekozen"],
              ["Tijd", time || "Nog niet gekozen"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-black/10 pb-3">
                <dt className="text-black/50">{k}</dt>
                <AnimatePresence mode="wait">
                  <motion.dd
                    key={v}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="text-right capitalize"
                  >
                    {v}
                  </motion.dd>
                </AnimatePresence>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex items-baseline justify-between">
            <span className="text-sm text-black/50">Totaal</span>
            <span className="text-2xl font-light">{t.price}</span>
          </div>
          <button
            type="button"
            disabled={!ready}
            onClick={confirm}
            className="mt-6 w-full rounded-full bg-black py-4 text-sm text-offwhite transition-colors hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Afspraak bevestigen
          </button>
          <p className="mt-3 text-center text-[11px] text-black/45">Kosteloos annuleren tot 12 uur van tevoren</p>
        </div>
      </aside>

      {/* Steps 3-4 span the full width (under the steps and the summary) */}
      <div className="space-y-10 lg:col-span-2">
        <Step n={3} title="Datum & tijd">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Calendar */}
            <div className="rounded-3xl bg-black p-5 text-offwhite md:p-6">
              <p className="mb-6 mt-2 text-center text-3xl font-light capitalize md:text-4xl">
                <span className="accent text-gold">{mounted ? monthLabel : " "}</span>
              </p>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-offwhite/40">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="py-1">{w}</span>
                ))}
              </div>
              <div className="mt-1 grid min-h-64 grid-cols-7 gap-1">
                {mounted && weeks.flat().map((iso, i) => {
                  if (!iso) return <span key={i} />;
                  const closed = isClosed(iso);
                  const active = iso === date;
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={closed}
                      aria-label={longDate(iso)}
                      aria-pressed={active}
                      onClick={() => {
                        setDate(iso);
                        setTime("");
                      }}
                      className="relative flex aspect-square items-center justify-center rounded-full text-sm transition-colors disabled:cursor-not-allowed disabled:text-offwhite/20 enabled:hover:bg-offwhite/10"
                    >
                      {active && (
                        <motion.span
                          layoutId="day"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0.5 rounded-full bg-gold"
                        />
                      )}
                      <span className={`relative ${active ? "text-black" : ""} ${closed ? "line-through" : ""}`}>
                        {new Date(`${iso}T00:00:00`).getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-[11px] text-offwhite/40">Maandag en zondag gesloten</p>
            </div>

            {/* Times */}
            <div>
              <AnimatePresence mode="wait">
                {!date ? (
                  <motion.p
                    key="pick"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full min-h-40 items-center justify-center rounded-3xl border border-dashed border-black/15 p-6 text-center text-sm text-black/45"
                  >
                    Kies eerst een dag in de kalender
                  </motion.p>
                ) : (
                  <motion.div
                    key={date}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <p className="mb-4 text-lg font-light capitalize">{longDate(date)}</p>
                    {slots.length === 0 ? (
                      <p className="text-sm text-black/50">Geen vrije tijden meer op deze dag.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {slots.map((sl, i) => (
                          <motion.button
                            key={sl}
                            type="button"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03, duration: 0.4, ease }}
                            onClick={() => setTime(sl)}
                            className={`rounded-full border py-2.5 text-sm transition-colors ${
                              time === sl
                                ? "border-black bg-black text-offwhite"
                                : "border-black/15 hover:border-black"
                            }`}
                          >
                            {sl}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Step>

        <Step n={4} title="Jouw gegevens">
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                ["name", "Naam", "text", "name"],
                ["email", "E-mailadres", "email", "email"],
                ["phone", "Telefoon", "tel", "tel"],
                ["notes", "Opmerking (optioneel)", "text", "off"],
              ] as const
            ).map(([key, label, type, ac]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-xs text-black/55">{label}</span>
                <input
                  type={type}
                  autoComplete={ac}
                  required={key !== "notes"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-full border border-black/15 bg-offwhite px-5 py-3 text-sm transition-colors focus:border-black focus:outline-none"
                />
              </label>
            ))}
          </div>
          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-black/65">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--color-gold-muted)]"
            />
            Ja, stuur mij acties en haartips van Hair by Cill. Afmelden kan altijd.
          </label>
        </Step>

        {/* Desktop: confirm right where the form ends (mobile uses the summary card below) */}
        <div className="hidden items-center justify-between gap-6 rounded-3xl bg-ivory p-6 lg:flex">
          <p className="text-sm text-black/60">
            {t.name} · {s.name}
            {date && ` · ${longDate(date)}`}
            {time && ` · ${time}`}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-2xl font-light">{t.price}</span>
            <button
              type="button"
              disabled={!ready}
              onClick={confirm}
              className="rounded-full bg-black px-8 py-4 text-sm text-offwhite transition-colors hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
            >
              Afspraak bevestigen
            </button>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
}
