"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products, Product } from "@/lib/data";

const categories: (Product["category"] | "Alles")[] = [
  "Alles",
  "Shampoo",
  "Conditioner",
  "Maskers",
  "Styling",
  "Treatments",
];

export default function ProductsClient() {
  const [active, setActive] = useState<(typeof categories)[number]>("Alles");
  const filtered = active === "Alles" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-[8px] border px-4 py-2 text-sm transition-colors ${
              active === c
                ? "border-champagne bg-champagne text-ink"
                : "border-ink/15 text-ink/70 hover:border-champagne hover:text-champagne"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 80}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
