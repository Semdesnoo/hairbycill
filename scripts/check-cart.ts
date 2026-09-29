// @ts-nocheck -- plain-Node test script, not part of the Next app type-check
// Run: node scripts/check-cart.ts   Checks cart pricing: 2nd-item discount matches the product-page 2-pack.
import assert from "node:assert/strict";
import { registerHooks } from "node:module";

registerHooks({
  resolve: (spec, ctx, next) => next(spec.startsWith("./") && !/\.\w+$/.test(spec) ? `${spec}.ts` : spec, ctx),
});
const { lineTotal, cartTotal, cartCount } = await import("../src/lib/cart.ts");
const { products, euroToNumber, SECOND_ITEM_DISCOUNT } = await import("../src/lib/data.ts");

const p = products[0];
const unit = euroToNumber(p.price);
const r = (n) => Math.round(n * 100) / 100;

assert.equal(lineTotal(p, 1), unit, "1 item = unit price");
assert.equal(lineTotal(p, 2), r(unit * (2 - SECOND_ITEM_DISCOUNT)), "2 items = product-page 2-pack price");
assert.equal(lineTotal(p, 3), r(unit * (3 - SECOND_ITEM_DISCOUNT)), "3rd item full price again");
assert.equal(lineTotal(p, 4), r(unit * (4 - 2 * SECOND_ITEM_DISCOUNT)), "every 2nd item discounted");

const items = [{ slug: p.slug, qty: 2 }, { slug: products[1].slug, qty: 1 }, { slug: "bestaat-niet", qty: 5 }];
assert.equal(cartTotal(items), r(lineTotal(p, 2) + lineTotal(products[1], 1)), "unknown products are ignored in the total");
assert.equal(cartCount(items.slice(0, 2)), 3, "count sums quantities");

console.log("cart checks OK");

const { shippingCost, SHIPPING } = await import("../src/lib/data.ts");
assert.equal(shippingCost(SHIPPING.freeFrom - 0.01), SHIPPING.cost, "below threshold pays shipping");
assert.equal(shippingCost(SHIPPING.freeFrom), 0, "at threshold ships free");
console.log("shipping checks OK");
