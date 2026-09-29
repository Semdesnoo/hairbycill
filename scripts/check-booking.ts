// @ts-nocheck -- plain-Node test script, not part of the Next app type-check
// Run: node scripts/check-booking.ts  (Node 22.18+ strips TS types natively)
// Covers the cancel flow: code format, email+code lookup, 12h rule, local-date helper.
import assert from "node:assert/strict";

const store = new Map<string, string>();
(globalThis as any).window = globalThis;
(globalThis as any).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => store.set(k, v),
};

// bookingApi imports "./data" without extension (bundler style); resolve it for plain Node.
import { registerHooks } from "node:module";
registerHooks({
  resolve: (spec, ctx, next) => next(spec.startsWith("./") && !/\.\w+$/.test(spec) ? `${spec}.ts` : spec, ctx),
});
const api = await import("../src/lib/bookingApi.ts");

const code = api.makeCode();
assert.match(code, /^[A-HJKMNP-Z2-9]{6}$/, "code: 6 chars, no ambiguous 0/O/1/I/L");

const inHours = (h: number) => {
  const d = new Date(Date.now() + h * 3_600_000);
  return { date: api.isoDate(d), time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}` };
};
const base = { name: "Sanne", email: "Sanne@Mail.nl", phone: "0612345678", treatment: "knippen", stylistSlug: "priscilla", notes: "", newsletter: true };

const far = api.createBooking({ ...base, ...inHours(48) });
const near = api.createBooking({ ...base, ...inHours(6) });

assert.equal(api.findBooking(far.code.toLowerCase(), " sanne@mail.nl ")?.id, far.id, "lookup is case/space tolerant");
assert.equal(api.findBooking(far.code, "other@mail.nl"), undefined, "wrong email must not find booking");
assert.equal(api.canCancel(far), true, "48h ahead: cancellable");
assert.equal(api.canCancel(near), false, "6h ahead: blocked by 12h rule");

api.cancelBooking(far.id);
assert.equal(api.findBooking(far.code, base.email), undefined, "cancelled booking is gone");

assert.equal(api.isoDate(new Date(2026, 0, 1, 0, 30)), "2026-01-01", "isoDate uses local day, not UTC");
assert.equal(api.isClosed("2026-09-28"), true, "Monday closed");
assert.equal(api.isClosed("2026-09-29"), false, "Tuesday open");
assert.equal(api.isClosed("2026-10-01"), true, "Thursday closed");
const tue = api.availableSlots("2026-10-06", "priscilla");
assert.equal(tue[0], "09:30", "Tuesday opens 09:30");
assert.equal(tue.at(-1), "15:30", "last Tuesday slot ends by 17:00");
const wed = api.availableSlots("2026-10-07", "priscilla");
assert.ok(wed.includes("16:30") === false && wed.includes("18:30") && wed.includes("19:30"), "Wednesday has an evening block");
assert.equal(wed.includes("20:30"), false, "no slot running past 21:00");
assert.equal(api.availableSlots("2026-10-10", "priscilla")[0], "09:00", "Saturday opens 09:00");

assert.equal(api.lastContact()?.email, base.email, "next booking prefills from previous one");

console.log("booking checks OK");
