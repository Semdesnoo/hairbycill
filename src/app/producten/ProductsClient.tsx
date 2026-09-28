"use client";

import { useState } from "react";
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
    <div className="border-b border-black/10 py-5 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-xs font-medium uppercase tracking-wider"
      >
        {title}
        <span className={`transition-transform ${open ? "" : "-rotate-90"}`}>⌄</span>
      </button>
      {open && <div className="mt-3 space-y-2.5">{children}</div>}
    </div>
  );
}

function Check({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between text-sm text-black/75 hover:text-black">
      <span>
        {label} <span className="text-black/35">({count})</span>
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[var(--color-black)]" />
    </label>
  );
}

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export default function ProductsClient() {
  const [cats, setCats] = useState<Category[]>([]);
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [saleOnly, setSaleOnly] = useState(false);

  const filtered = products.filter(
    (p) =>
      (!cats.length || cats.includes(p.category)) &&
      (!brandSel.length || brandSel.includes(p.brand)) &&
      (!saleOnly || p.oldPrice),
  );
  const active = cats.length + brandSel.length + (saleOnly ? 1 : 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-12">
      <aside className="lg:sticky lg:top-28 lg:self-start">
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
            className="mt-5 text-xs text-black/55 underline underline-offset-4 hover:text-black"
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
