"use client";

import { useState } from "react";

export default function AddToCart() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center rounded-[8px] border border-ink/15">
        <button
          aria-label="Aantal verlagen"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-3 text-ink/60 hover:text-champagne"
        >
          −
        </button>
        <span className="w-8 text-center text-sm">{qty}</span>
        <button
          aria-label="Aantal verhogen"
          onClick={() => setQty((q) => q + 1)}
          className="px-4 py-3 text-ink/60 hover:text-champagne"
        >
          +
        </button>
      </div>
      <button className="flex-1 rounded-[8px] bg-champagne px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-gold-light">
        IN WINKELMAND
      </button>
    </div>
  );
}
