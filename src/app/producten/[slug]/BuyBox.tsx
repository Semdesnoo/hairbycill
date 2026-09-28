"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product, business, euroToNumber, formatEuro, SECOND_ITEM_DISCOUNT } from "@/lib/data";

/**
 * Pack choice (1 or 2 with discount on the 2nd) + order button.
 * ponytail: no webshop/checkout yet, so ordering opens WhatsApp with a prefilled reservation
 * (pick up in the salon). Swap the href for a cart/checkout call once a shop backend exists.
 */
export default function BuyBox({ product }: { product: Product }) {
  const unit = euroToNumber(product.price);
  const was = product.oldPrice ? euroToNumber(product.oldPrice) : unit;
  const packs = [
    { qty: 1, label: "1 stuk", price: unit, was, note: "Ophalen in de salon" },
    ...(SECOND_ITEM_DISCOUNT > 0
      ? [
          {
            qty: 2,
            label: "2 stuks",
            price: unit * (2 - SECOND_ITEM_DISCOUNT),
            was: was * 2,
            note: `${Math.round(SECOND_ITEM_DISCOUNT * 100)}% korting op je tweede`,
          },
        ]
      : []),
  ];
  const [qty, setQty] = useState(packs.length > 1 ? 2 : 1);
  const pack = packs.find((p) => p.qty === qty)!;

  const message = `Hoi Hair by Cill! Ik wil graag ${pack.qty}x ${product.brand} ${product.name} (${product.volume}) reserveren voor ${formatEuro(pack.price)}. Ik haal het op in de salon.`;

  return (
    <div>
      <div className="space-y-3" role="radiogroup" aria-label="Kies een aantal">
        {packs.map((p) => {
          const active = p.qty === qty;
          const save = p.was - p.price;
          return (
            <button
              key={p.qty}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setQty(p.qty)}
              className={`relative w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                active ? "border-black bg-offwhite shadow-md shadow-black/5" : "border-black/10 bg-ivory/50 hover:border-black/30"
              }`}
            >
              {p.qty === 2 && (
                <span className="absolute -top-2.5 right-4 rounded-md bg-black px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-offwhite">
                  Meest gekozen
                </span>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      active ? "border-black" : "border-black/30"
                    }`}
                  >
                    {active && <motion.span layoutId="pack-dot" className="h-2 w-2 rounded-full bg-black" />}
                  </span>
                  <div>
                    <p className="font-medium">
                      {p.label}
                      {save > 0.005 && (
                        <span className="ml-2 rounded-full bg-gold/25 px-2 py-0.5 text-[10px] font-normal">
                          Bespaar {formatEuro(save)}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-black/55">{p.note}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatEuro(p.price)}</p>
                  {save > 0.005 && <p className="text-xs text-red-700 line-through">{formatEuro(p.was)}</p>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-gold-muted">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-muted" />
        </span>
        Op voorraad in de salon
      </p>

      <a
        href={`${business.whatsappHref}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm uppercase tracking-wider text-offwhite transition-colors hover:bg-gold hover:text-black"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2" />
          <circle cx="9" cy="20" r="1.3" />
          <circle cx="17" cy="20" r="1.3" />
        </svg>
        Reserveren · {formatEuro(pack.price)}
      </a>

      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-black/55">
        <span>✓ Professioneel advies bij afhalen</span>
        <span>✓ Dezelfde producten als in de salon</span>
      </div>
    </div>
  );
}
