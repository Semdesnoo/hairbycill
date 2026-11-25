"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { team, treatments, stylists as fallbackStylists } from "@/lib/data";
import {
  loadSlots, loadStylists, nextBookableDates, createBooking, isoDate, lastContact, SlotTakenError,
  type Booking, type Slots, type StylistOption,
} from "@/lib/bookingApi";

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
      className="min-w-0 border-t border-black/10 pt-8 first:border-t-0 first:pt-0"
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
  const [stylists, setStylists] = useState<StylistOption[]>(fallbackStylists);
  const [stylistSlug, setStylistSlug] = useState(fallbackStylists[fallbackStylists.length - 1].slug);
  const [allSlots, setAllSlots] = useState<Slots | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [newsletter, setNewsletter] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [query, setQuery] = useState("");
  const shown = treatments.filter((x) => `${x.name} ${x.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  // DB stylists carry no photo: take it from the static list (slug) or the team (display name).
  const photoOf = (slug: string) =>
    fallbackStylists.find((x) => x.slug === slug && slug !== "any")?.image ?? team.find((m) => m.name === stylists.find((x) => x.slug === slug)?.name)?.image;

  // Dates depend on "today": false during static prerender, true in the browser.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const dates = useMemo(() => nextBookableDates(), []);
  const weeks = useMemo(() => calendarWeeks(dates), [dates]);
  const slots = (date && allSlots?.[date]) || [];
  const isClosed = (iso: string) => !allSlots?.[iso]?.length;
  const t = treatments.find((x) => x.slug === treatment)!;
  const s = stylists.find((x) => x.slug === stylistSlug) ?? stylists[stylists.length - 1];
  const ready = date && time && form.name && /\S+@\S+\.\S+/.test(form.email) && form.phone && !busy;

  // Live availability from the salon's roster (dashboard), refreshed when the stylist changes.
  const refresh = useCallback(() => {
    loadSlots(dates[0], dates[dates.length - 1], stylistSlug)
      .then((r) => {
        setAllSlots(r);
        setLoadError(false);
      })
      .catch(() => setLoadError(true));
  }, [dates, stylistSlug]);
  useEffect(refresh, [refresh]);
  useEffect(() => {
    loadStylists().then((list) => {
      setStylists(list);
      setStylistSlug((cur) => (list.some((x) => x.slug === cur) ? cur : list[list.length - 1].slug));
    });
  }, []);

  async function confirm() {
    setBusy(true);
    setSubmitError("");
    try {
      setConfirmed(await createBooking({ ...form, newsletter, treatment: t.name, stylistSlug, date, time }));
    } catch (e) {
      setSubmitError(
        e instanceof SlotTakenError
          ? "Deze tijd is net door iemand anders geboekt. Kies een andere tijd."
          : "Boeken lukte niet. Controleer je internet of bel/WhatsApp ons even.",
      );
      if (e instanceof SlotTakenError) {
        setTime("");
        refresh();
      }
    }
    setBusy(false);
  }

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
      <div className="min-w-0 space-y-10">
        <Step n={1} title="Kies je behandeling">
          <label className="relative mb-4 block">
            <span className="sr-only">Zoek een behandeling</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek een behandeling..."
              className="w-full rounded-2xl border border-black/10 bg-white py-3.5 pl-5 pr-14 text-sm shadow-[0_8px_24px_-12px_rgba(14,12,10,0.18)] focus:border-gold focus:outline-none"
            />
            <span aria-hidden className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-black text-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </span>
          </label>
          {/* Treatment menu card (same layout as the home "Vind een behandeling" card), black & gold */}
          <div className="overflow-hidden rounded-3xl border border-gold/25 bg-black text-offwhite shadow-[0_30px_80px_-30px_rgba(210,174,98,0.3)]">
            <ul className="p-2 md:p-3">
              {shown.map((x, i) => {
                const on = treatment === x.slug;
                return (
                  <motion.li
                    key={x.slug}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease }}
                  >
                    <button
                      type="button"
                      onClick={() => setTreatment(x.slug)}
                      aria-pressed={on}
                      className={`group grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors md:grid-cols-[2rem_5rem_1fr_1.3fr_auto_auto] md:gap-5 md:px-5 ${
                        on ? "bg-gold/[0.12] ring-1 ring-gold/50" : "hover:bg-offwhite/[0.04]"
                      }`}
                    >
                      <span className="hidden text-xs tabular-nums text-gold/60 md:block">0{i + 1}</span>
                      <span className="relative block aspect-square overflow-hidden rounded-xl md:aspect-[4/3]">
                        <Image src={x.image} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base md:text-lg">
                          {x.name} <span className="accent text-gold">{x.accent}</span>
                        </span>
                        <span className="mt-0.5 block text-xs text-offwhite/50 md:hidden">
                          {x.duration} · {x.price}
                        </span>
                      </span>
                      <span className="hidden text-xs leading-relaxed text-offwhite/55 md:block">{x.description}</span>
                      <span className="hidden whitespace-nowrap text-right md:block">
                        <span className="block text-sm">{x.price.replace("vanaf ", "")}</span>
                        <span className="block text-[11px] text-offwhite/45">vanaf · {x.duration}</span>
                      </span>
                      <span className={`flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-medium transition-colors ${on ? "bg-gold text-black" : "border border-gold/40 text-gold group-hover:bg-gold group-hover:text-black"}`}>
                        {on ? "Gekozen ✓" : "Kies"}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
              {!shown.length && <li className="py-6 text-center text-sm text-offwhite/50">Geen behandeling gevonden.</li>}
            </ul>
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
                <span className="flex items-center gap-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-ivory ring-2 ring-gold/60">
                    {photoOf(x.slug) && <Image src={photoOf(x.slug)!} alt="" fill sizes="44px" className="object-cover" />}
                  </span>
                  <span>
                    <span className="block text-base">{x.name}</span>
                    <span className="mt-0.5 block text-xs opacity-60">{x.role}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Step>
      </div>

      {/* Summary: next to steps 1-2 on desktop, last on mobile */}
      <aside className="order-last lg:order-none">
        <div className="rounded-3xl border border-gold/25 bg-black p-7 text-offwhite lg:sticky lg:top-24">
          <p className="text-xl font-light">
            Jouw <span className="accent text-gold">afspraak</span>
          </p>
          <dl className="mt-6 space-y-4 text-sm">
            {[
              ["Behandeling", `${t.name} · ${t.duration}`],
              ["Stylist", s.name],
              ["Datum", date ? longDate(date) : "Nog niet gekozen"],
              ["Tijd", time || "Nog niet gekozen"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-offwhite/10 pb-3">
                <dt className="text-offwhite/50">{k}</dt>
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
            <span className="text-sm text-offwhite/50">Totaal</span>
            <span className="text-2xl font-light text-gold">{t.price}</span>
          </div>
          <button
            type="button"
            disabled={!ready}
            onClick={confirm}
            className="mt-6 w-full rounded-full bg-gold py-4 text-sm font-medium text-black transition-colors hover:bg-offwhite disabled:cursor-not-allowed disabled:opacity-30"
          >
            Afspraak bevestigen
          </button>
          {submitError && <p role="alert" className="mt-3 text-center text-sm text-red-300">{submitError}</p>}
          <p className="mt-3 text-center text-[11px] text-offwhite/45">Kosteloos annuleren tot 12 uur van tevoren</p>
        </div>
      </aside>

      {/* Steps 3-4 span the full width (under the steps and the summary) */}
      <div className="min-w-0 space-y-10 lg:col-span-2">
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
              <p className="mt-4 text-center text-[11px] text-offwhite/40">
                {loadError ? "Beschikbaarheid laden mislukt, ververs de pagina" : allSlots ? "Doorgestreepte dagen zijn vol of gesloten" : "Beschikbaarheid laden..."}
              </p>
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
                      <p className="text-sm text-black/50">{allSlots ? "Geen vrije tijden meer op deze dag." : "Laden..."}</p>
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

        {submitError && <p role="alert" className="hidden text-right text-sm text-red-700 lg:block">{submitError}</p>}
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
