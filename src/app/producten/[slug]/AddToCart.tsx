"use client";

import { useState } from "react";

export default function AddToCart() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-black/15">
        <button
          aria-label="Aantal verlagen"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-3.5 text-black/50 hover:text-gold-muted"
        >
          −
        </button>
        <span className="w-8 text-center text-sm">{qty}</span>
        <button
          aria-label="Aantal verhogen"
          onClick={() => setQty((q) => q + 1)}
          className="px-4 py-3.5 text-black/50 hover:text-gold-muted"
        >
          +
        </button>
      </div>
      <button className="flex-1 rounded-[6px] bg-black px-6 py-3.5 text-sm tracking-widest text-offwhite transition-colors hover:bg-soft-black">
        IN WINKELMAND
      </button>
    </div>
  );
}
