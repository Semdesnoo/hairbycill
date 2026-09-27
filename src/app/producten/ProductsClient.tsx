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
      <div className="mb-16 flex flex-wrap gap-x-8 gap-y-3 border-b border-black/10 pb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`text-sm tracking-widest transition-colors ${
              active === c ? "text-gold-muted" : "text-black/50 hover:text-black"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      <ProductGrid products={filtered} />
    </>
  );
}
