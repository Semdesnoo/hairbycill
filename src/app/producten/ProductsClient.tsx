"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { products, Product } from "@/lib/data";

type Category = Product["category"];
const CATEGORY_LABEL: Record<Category, string> = {
  Shampoo: "Shampoo",
  Conditioner: "Conditioner",
  Treatment: "Maskers & treatments",
  Styling: "Styling",
};
const categories = Object.keys(CATEGORY_LABEL) as Category[];
const brands = [...new Set(products.map((p) => p.brand))];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-black/10 px-5 py-5 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em]"
      >
        {title}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <div className="mt-3 space-y-1">{children}</div>}
    </div>
  );
}

/** Filter row: the whole row lights up gold on hover; the box turns solid gold with a check when selected. */
function Check({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`group -mx-2 flex cursor-pointer items-center justify-between rounded-xl px-2 py-2 text-sm transition-colors hover:bg-gold/15 ${
        checked ? "bg-gold/10 font-medium text-black" : "text-black/75"
      }`}
    >
      <span>
        {label} <span className="text-black/40">({count})</span>
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gold ${
          checked ? "border-gold bg-gold text-black" : "border-black/25 bg-white group-hover:border-gold group-hover:bg-gold/30"
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
            <path d="m5 12 5 5 9-10" />
          </svg>
        )}
      </span>
    </label>
  );
}

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export default function ProductsClient() {
  const [cats, setCats] = useState<Category[]>([]);
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [saleOnly, setSaleOnly] = useState(false);
  // Footer links: /producten?categorie=Shampoo preselects that category.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("categorie") as Category | null;
    if (c && products.some((p) => p.category === c)) setCats([c]); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const filtered = products.filter(
    (p) =>
      (!cats.length || cats.includes(p.category)) &&
      (!brandSel.length || brandSel.includes(p.brand)) &&
      (!saleOnly || p.oldPrice),
  );
  const active = cats.length + brandSel.length + (saleOnly ? 1 : 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-12">
      <aside className="self-start rounded-3xl border border-black/10 bg-white py-1 shadow-sm lg:sticky lg:top-28">
        <Group title="Categorieën">
          {categories.map((c) => (
            <Check
              key={c}
              label={CATEGORY_LABEL[c]}
              count={products.filter((p) => p.category === c).length}
              checked={cats.includes(c)}
              onChange={() => setCats(toggle(cats, c))}
            />
          ))}
        </Group>
        <Group title="Merken">
          {brands.map((b) => (
            <Check
              key={b}
              label={b}
              count={products.filter((p) => p.brand === b).length}
              checked={brandSel.includes(b)}
              onChange={() => setBrandSel(toggle(brandSel, b))}
            />
          ))}
        </Group>
        <Group title="Aanbiedingen">
          <Check
            label="In de sale"
            count={products.filter((p) => p.oldPrice).length}
            checked={saleOnly}
            onChange={() => setSaleOnly(!saleOnly)}
          />
        </Group>
        {active > 0 && (
          <button
            type="button"
            onClick={() => {
              setCats([]);
              setBrandSel([]);
              setSaleOnly(false);
            }}
            className="mx-5 mb-4 mt-1 rounded-full border border-black px-4 py-2 text-xs font-medium transition-colors hover:bg-black hover:text-gold"
          >
            Wis filters ({active})
          </button>
        )}
      </aside>

      <div>
        <p className="mb-6 text-sm text-black/50">{filtered.length} producten</p>
        {filtered.length ? (
          <ProductGrid products={filtered} />
        ) : (
          <p className="rounded-2xl bg-ivory/70 p-10 text-center text-sm text-black/55">
            Geen producten gevonden met deze filters.
          </p>
        )}
      </div>
    </div>
  );
}
