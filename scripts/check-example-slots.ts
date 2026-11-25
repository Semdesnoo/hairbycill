// Run: npx tsx scripts/check-example-slots.ts
import assert from "node:assert";
import { exampleSlots } from "../src/lib/bookingApi";

// Mon 2026-11-30 closed, Tue 09:30-17:00, Wed two blocks; "now" = Tue 12:10.
const s = exampleSlots("2026-11-30", "2026-12-02", new Date("2026-12-01T12:10"));
assert.equal(s["2026-11-30"], undefined);
assert.deepEqual(s["2026-12-01"].slice(0, 2), ["12:30", "13:00"]);
assert.equal(s["2026-12-01"].at(-1), "16:00");
assert.ok(s["2026-12-02"].includes("09:30") && s["2026-12-02"].includes("20:00") && !s["2026-12-02"].includes("17:00"));
console.log("example slots ok");
