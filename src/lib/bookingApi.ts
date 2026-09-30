// Booking + order backend: Supabase (schema lives in Semdesnoo/hairbycill-dashboard/supabase/schema.sql).
// The anon key is public by design: the site can only call the security-definer functions
// (free_slots, create_booking, find_booking, cancel_booking, create_order) and read staff/products.
// Client data never comes back to the browser except her own booking via code + email.
import { stylists as fallbackStylists } from "./data";

export const SUPABASE_URL = "https://REPLACE_ME.supabase.co";
export const SUPABASE_ANON_KEY = "REPLACE_ME";

async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? `HTTP ${res.status}`);
  return data as T;
}

export type Booking = {
  code: string;
  name: string;
  treatment: string;
  stylistSlug: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
};

export type StylistOption = { slug: string; name: string; role: string };

/** Active stylists from the dashboard, plus "Geen voorkeur". Falls back to data.ts when offline. */
export async function loadStylists(): Promise<StylistOption[]> {
  const any = fallbackStylists.find((s) => s.slug === "any")!;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/staff?select=slug,name,role&active=eq.true&order=sort`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) throw new Error();
    const staff: StylistOption[] = await res.json();
    return staff.length > 1 ? [...staff, any] : staff;
  } catch {
    return fallbackStylists;
  }
}

/** Free start times per date for the chosen stylist ("any" = union of everyone). */
export type Slots = Record<string, string[]>;

export async function loadSlots(from: string, to: string, stylistSlug: string): Promise<Slots> {
  const rows = await rpc<{ staff_slug: string; day: string; start: string }[]>("free_slots", { p_from: from, p_to: to });
  return groupSlots(rows, stylistSlug);
}

export function groupSlots(rows: { staff_slug: string; day: string; start: string }[], stylistSlug: string): Slots {
  const out: Slots = {};
  for (const r of rows) {
    if (stylistSlug !== "any" && r.staff_slug !== stylistSlug) continue;
    const day = (out[r.day] ??= []);
    if (!day.includes(r.start)) day.push(r.start);
  }
  for (const d in out) out[d].sort();
  return out;
}

/** "Geen voorkeur": first stylist who is free at that moment. */
export async function pickStylist(date: string, time: string): Promise<string | null> {
  const rows = await rpc<{ staff_slug: string; day: string; start: string }[]>("free_slots", { p_from: date, p_to: date });
  return rows.find((r) => r.start === time)?.staff_slug ?? null;
}

// No 0/O/1/I/L: codes get read from an email and typed back in.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function makeCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

export class SlotTakenError extends Error {}

export async function createBooking(input: {
  name: string; email: string; phone: string; treatment: string; stylistSlug: string;
  date: string; time: string; notes: string; newsletter: boolean;
}): Promise<Booking> {
  const stylistSlug = input.stylistSlug === "any" ? await pickStylist(input.date, input.time) : input.stylistSlug;
  if (!stylistSlug) throw new SlotTakenError();
  const code = makeCode();
  try {
    await rpc("create_booking", {
      p_code: code, p_name: input.name, p_email: input.email, p_phone: input.phone, p_treatment: input.treatment,
      p_stylist_slug: stylistSlug, p_date: input.date, p_time: input.time, p_notes: input.notes, p_newsletter: input.newsletter,
    });
  } catch (e) {
    if (/slot_taken|duplicate/.test((e as Error).message)) throw new SlotTakenError();
    throw e;
  }
  rememberContact(input);
  return { code, name: input.name, treatment: input.treatment, stylistSlug, date: input.date, time: input.time };
}

export async function findBooking(code: string, email: string): Promise<Booking | undefined> {
  const rows = await rpc<{ name: string; treatment: string; stylist_slug: string; day: string; start: string }[]>("find_booking", {
    p_code: code, p_email: email,
  });
  const r = rows[0];
  return r && { code: code.trim().toUpperCase(), name: r.name, treatment: r.treatment, stylistSlug: r.stylist_slug, date: r.day, time: r.start };
}

/** Server enforces the 12h rule; false = too late or not found. */
export const cancelBooking = (code: string, email: string) =>
  rpc<boolean | null>("cancel_booking", { p_code: code, p_email: email }).then((ok) => ok === true);

export const MIN_CANCEL_HOURS = 12;

export function hoursUntil(booking: Pick<Booking, "date" | "time">): number {
  return (new Date(`${booking.date}T${booking.time}:00`).getTime() - Date.now()) / 3_600_000;
}

export const canCancel = (booking: Pick<Booking, "date" | "time">) => hoursUntil(booking) >= MIN_CANCEL_HOURS;

export type OrderInput = {
  items: { slug: string; qty: number }[];
  name: string; email: string; phone: string; method: "pickup" | "delivery";
  street: string; number: string; postcode: string; city: string; notes: string; code: string;
};

export class OutOfStockError extends Error {}

/** Server recomputes prices, discount, shipping and stock; returns the final ref + total. */
export async function createOrder(o: OrderInput): Promise<{ ref: string; total: number }> {
  try {
    const [r] = await rpc<{ ref: string; total: number }[]>("create_order", {
      p_items: o.items, p_name: o.name, p_email: o.email, p_phone: o.phone, p_method: o.method,
      p_street: o.street, p_number: o.number, p_postcode: o.postcode, p_city: o.city, p_notes: o.notes, p_code: o.code,
    });
    return { ref: r.ref, total: Number(r.total) };
  } catch (e) {
    const m = (e as Error).message.match(/out_of_stock:(.*)/);
    if (m) throw new OutOfStockError(m[1].trim());
    throw e;
  }
}

/** Live stock per slug (products the dashboard switched offline are missing = 0). */
export async function loadStock(): Promise<Record<string, number>> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=slug,stock,active`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const rows: { slug: string; stock: number; active: boolean }[] = await res.json();
  return Object.fromEntries(rows.map((r) => [r.slug, r.active ? r.stock : 0]));
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

// Returning client: prefill her contact details next time (her own browser only).
const CONTACT_KEY = "hbc_contact";
type Contact = { name: string; email: string; phone: string };

function rememberContact({ name, email, phone }: Contact) {
  try {
    localStorage.setItem(CONTACT_KEY, JSON.stringify({ name, email, phone }));
  } catch {}
}

export function lastContact(): Contact | null {
  try {
    return JSON.parse(localStorage.getItem(CONTACT_KEY) ?? "null");
  } catch {
    return null;
  }
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
