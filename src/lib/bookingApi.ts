// Booking storage + slot logic.
//
// ponytail: no backend yet (user said "komt later"), so this stores bookings
// in localStorage on the visitor's own browser. That means: no real
// cross-device availability check, no server-sent confirmation email via
// Resend, no automatic WhatsApp message. Once a backend (Vercel functions +
// DB) exists, replace the three functions below with real fetch() calls to
// it — the wizard and cancel page only talk to this file, so that's the only
// place that needs to change.
import { openingHours, stylists } from "./data";

export type Booking = {
  id: string;
  /** 6-char code the client uses (with her email) to cancel. */
  code: string;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  stylistSlug: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes: string;
  /** Explicit opt-in for promo mail (AVG: unticked by default). */
  newsletter: boolean;
  createdAt: string;
};

const KEY = "hbc_bookings";
const MIN_CANCEL_HOURS = 12;

function readAll(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeAll(bookings: Booking[]) {
  localStorage.setItem(KEY, JSON.stringify(bookings));
}

// No 0/O/1/I/L: codes get read from an email and typed back in.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function makeCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

export function createBooking(input: Omit<Booking, "id" | "code" | "createdAt">): Booking {
  const booking: Booking = { ...input, id: crypto.randomUUID(), code: makeCode(), createdAt: new Date().toISOString() };
  writeAll([...readAll(), booking]);
  return booking;
}

export function findBooking(code: string, email: string): Booking | undefined {
  const c = code.trim().toUpperCase();
  const e = email.trim().toLowerCase();
  return readAll().find((b) => b.code === c && b.email.toLowerCase() === e);
}

export function hoursUntil(booking: Booking): number {
  const start = new Date(`${booking.date}T${booking.time}:00`);
  return (start.getTime() - Date.now()) / 3_600_000;
}

export function canCancel(booking: Booking): boolean {
  return hoursUntil(booking) >= MIN_CANCEL_HOURS;
}

export function cancelBooking(id: string) {
  writeAll(readAll().filter((b) => b.id !== id));
}

// Slot generation: hourly slots within opening hours, next 21 days, minus
// whatever is already taken in localStorage for that stylist.
export function availableSlots(date: string, stylistSlug: string): string[] {
  const hours = openHours(date);
  if (!hours) return [];
  const [open, close] = hours;

  const taken = new Set(
    readAll()
      .filter((b) => b.date === date && (b.stylistSlug === stylistSlug || stylistSlug === "any"))
      .map((b) => b.time),
  );

  const slots: string[] = [];
  for (let h = open; h < close; h++) {
    const time = `${String(h).padStart(2, "0")}:00`;
    if (!taken.has(time)) slots.push(time);
  }
  return slots;
}

/** Local YYYY-MM-DD (toISOString is UTC and shifts the day around midnight in NL). */
export const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function nextBookableDates(count = 28): string[] {
  const dates: string[] = [];
  const d = new Date();
  while (dates.length < count) {
    d.setDate(d.getDate() + 1);
    dates.push(isoDate(d));
  }
  return dates;
}

export const isClosed = (date: string) => openHours(date) === null;

function openHours(date: string): [number, number] | null {
  const day = new Date(`${date}T00:00:00`).getDay();
  const dayName = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"][day];
  const hours = openingHours.find((o) => o.day === dayName);
  if (!hours || hours.hours === "Gesloten") return null;
  const [o, c] = hours.hours.split("-");
  return [parseInt(o, 10), parseInt(c, 10)];
}

export function stylistName(slug: string): string {
  return stylists.find((s) => s.slug === slug)?.name ?? slug;
}

// Cookie consent.
export type Consent = { cookies: "all" | "necessary"; at: string };
const CONSENT_KEY = "hbc_consent";

export function getConsent(): Consent | null {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
  } catch {
    return null;
  }
}

export function saveConsent(c: Omit<Consent, "at">) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...c, at: new Date().toISOString() }));
}

/** Contact details of this browser's most recent booking, to prefill the next one (sites can't read the browser's account email). */
export function lastContact(): Pick<Booking, "name" | "email" | "phone"> | null {
  const b = readAll().at(-1);
  return b ? { name: b.name, email: b.email, phone: b.phone } : null;
}
