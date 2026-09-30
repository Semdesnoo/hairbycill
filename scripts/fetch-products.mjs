// Pull the shop from Supabase (managed in the dashboard) into src/lib/products.json before a build.
// Runs in GitHub Actions (repository_dispatch "products" from the dashboard) and locally: `node scripts/fetch-products.mjs`.
// On any failure the committed products.json stays as-is, so a build never ships an empty shop.
import { readFileSync, writeFileSync } from "node:fs";

const api = readFileSync(new URL("../src/lib/bookingApi.ts", import.meta.url), "utf8");
const url = api.match(/SUPABASE_URL = "([^"]+)"/)[1];
const key = api.match(/SUPABASE_ANON_KEY = "([^"]+)"/)[1];
const OUT = new URL("../src/lib/products.json", import.meta.url);

const euro = (n) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n).replace(/\s/g, "");

if (url.includes("REPLACE_ME")) {
  console.log("fetch-products: Supabase not configured yet, keeping products.json");
  process.exit(0);
}
const res = await fetch(`${url}/rest/v1/products?select=*&active=eq.true&order=sort,name`, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
});
if (!res.ok) {
  console.error(`fetch-products: HTTP ${res.status}, keeping products.json`);
  process.exit(0);
}
const rows = await res.json();
const products = rows
  .filter((r) => r.image && r.content?.story?.title) // incomplete drafts never reach the site
  .map((r) => ({
    slug: r.slug,
    brand: r.brand,
    name: r.name,
    price: euro(Number(r.price)),
    ...(r.old_price ? { oldPrice: euro(Number(r.old_price)) } : {}),
    volume: r.volume,
    category: r.category,
    image: r.image,
    highlights: [], description: "", benefit: "", usage: "", hairType: "", ingredients: "",
    faqs: [], story: { title: "", text: "" }, features: [], steps: [], tip: "", freeOf: [],
    ...r.content,
  }));
if (!products.length) {
  console.error("fetch-products: 0 complete products, keeping products.json");
  process.exit(0);
}
writeFileSync(OUT, JSON.stringify(products, null, 2) + "\n");
console.log(`fetch-products: wrote ${products.length} products`);
