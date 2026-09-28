"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { products, Product } from "@/lib/data";

const categories: (Product["category"] | "ALL")[] = ["ALL", "Shampoo", "Conditioner", "Treatment", "Styling"];

export default function ProductsClient() {
  const [active, setActive] = useState<(typeof categories)[number]>("ALL");
  const filtered = active === "ALL" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-5 py-2 text-xs transition-colors ${
              active === c ? "bg-black text-offwhite" : "bg-ivory hover:bg-black/10"
            }`}
          >
            {c === "ALL" ? "Alles" : c}
          </button>
        ))}
      </div>
      <ProductGrid products={filtered} />
    </>
  );
}
