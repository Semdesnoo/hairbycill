// @ts-nocheck -- plain-Node test script, not part of the Next app type-check
// Run: node scripts/check-booking.ts  (Node 22.18+ strips TS types natively)
// Slot/booking rules live in Supabase (tested in hairbycill-dashboard); this covers the browser side.
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
registerHooks({
  resolve: (spec, ctx, next) => next(spec.startsWith("./") && !/\.\w+$/.test(spec) ? `${spec}.ts` : spec, ctx),
});
const store = new Map();
globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) };
const api = await import("../src/lib/bookingApi.ts");

assert.match(api.makeCode(), /^[A-HJKMNP-Z2-9]{6}$/, "code: 6 chars, no ambiguous 0/O/1/I/L");
assert.equal(api.isoDate(new Date(2026, 0, 1, 0, 30)), "2026-01-01", "isoDate uses local day, not UTC");

const rows = [
  { staff_slug: "priscilla", day: "2030-01-08", start: "10:00" },
  { staff_slug: "mellissa", day: "2030-01-08", start: "09:00" },
  { staff_slug: "mellissa", day: "2030-01-08", start: "10:00" },
];
assert.deepEqual(api.groupSlots(rows, "priscilla"), { "2030-01-08": ["10:00"] }, "one stylist's slots");
assert.deepEqual(api.groupSlots(rows, "any"), { "2030-01-08": ["09:00", "10:00"] }, "'any' = union, sorted, no duplicates");

const inH = (h) => {
  const d = new Date(Date.now() + h * 3_600_000);
  return { date: api.isoDate(d), time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}` };
};
assert.equal(api.canCancel(inH(48)), true, "48h ahead: cancellable");
assert.equal(api.canCancel(inH(6)), false, "6h ahead: blocked by 12h rule");

assert.equal(api.lastContact(), null);
console.log("booking checks OK");
