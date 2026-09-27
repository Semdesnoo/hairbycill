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
  name: string;
  email: string;
  phone: string;
  treatment: string;
  stylistSlug: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes: string;
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

export function createBooking(input: Omit<Booking, "id" | "createdAt">): Booking {
  const booking: Booking = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  writeAll([...readAll(), booking]);
  return booking;
}

export function findBooking(id: string, email: string): Booking | undefined {
  return readAll().find((b) => b.id === id && b.email.toLowerCase() === email.toLowerCase());
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
  const day = new Date(`${date}T00:00:00`).getDay(); // 0=Sunday
  const dayName = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"][day];
  const hours = openingHours.find((o) => o.day === dayName);
  if (!hours || hours.hours === "Gesloten") return [];

  const [openStr, closeStr] = hours.hours.split("-");
  const open = parseInt(openStr, 10);
  const close = parseInt(closeStr, 10);

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

export function nextBookableDates(count = 21): string[] {
  const dates: string[] = [];
  const d = new Date();
  while (dates.length < count) {
    d.setDate(d.getDate() + 1);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export function stylistName(slug: string): string {
  return stylists.find((s) => s.slug === slug)?.name ?? slug;
}
