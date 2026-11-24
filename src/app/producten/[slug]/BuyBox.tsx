"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cart } from "@/lib/cart";
import { loadStock } from "@/lib/bookingApi";
import { Product, euroToNumber, formatEuro, SECOND_ITEM_DISCOUNT, SHIPPING } from "@/lib/data";

/**
 * Pack choice (1 or 2 with discount on the 2nd) + add-to-cart (opens the cart drawer).
 */
export default function BuyBox({ product }: { product: Product }) {
  const unit = euroToNumber(product.price);
  const was = product.oldPrice ? euroToNumber(product.oldPrice) : unit;
  const packs = [
    { qty: 1, label: "1 stuk", price: unit, was, note: "Afhalen of thuisbezorgd" },
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
  // Live stock from the dashboard; null = unknown (offline), then we don't block.
  const [stock, setStock] = useState<number | null>(null);
  useEffect(() => {
    loadStock().then((s) => setStock(s[product.slug] ?? 0)).catch(() => {});
  }, [product.slug]);
  const soldOut = stock === 0;
  const add = () => cart.add(product.slug, stock === null ? pack.qty : Math.min(pack.qty, stock));

  // Sticky buy bar (D&R): shows once the main button has scrolled up out of view.
  const buyRef = useRef<HTMLButtonElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
        {soldOut ? "Tijdelijk uitverkocht" : stock !== null && stock <= 3 ? `Nog ${stock} op voorraad` : "Op voorraad in de salon"}
      </p>

      <button
        ref={buyRef}
        type="button"
        onClick={add}
        disabled={soldOut}
        className="disabled:cursor-not-allowed disabled:opacity-40 mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm uppercase tracking-wider text-offwhite transition-colors hover:bg-gold hover:text-black"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2" />
          <circle cx="9" cy="20" r="1.3" />
          <circle cx="17" cy="20" r="1.3" />
        </svg>
        In winkelwagen · {formatEuro(pack.price)}
      </button>

      {/* Perks (D&R "+ FREE travel pouch" rows) */}
      <ul className="mt-5 space-y-2 rounded-2xl border border-black/10 p-4 text-sm">
        {[
          ["Gratis afhalen in de salon", "€ 0"],
          [`Gratis bezorging vanaf ${formatEuro(SHIPPING.freeFrom)}`, `${formatEuro(SHIPPING.cost)}`],
          ["Persoonlijk advies van onze stylisten", "Gratis"],
        ].map(([label, value]) => (
          <li key={label} className="flex items-center justify-between gap-4">
            <span>
              <span className="mr-2 text-gold-muted">+</span>
              {label}
            </span>
            <span className="text-xs text-black/45">{value}</span>
          </li>
        ))}
      </ul>

      <div
        {...(stuck ? { "data-sticky-cta": "" } : {})}
        aria-hidden={!stuck}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-offwhite/95 px-4 py-3 backdrop-blur-md transition-transform duration-500 md:inset-x-auto md:bottom-5 md:left-1/2 md:w-[560px] md:-translate-x-1/2 md:rounded-2xl md:border md:shadow-xl md:shadow-black/10 ${
          stuck ? "translate-y-0" : "pointer-events-none translate-y-[150%]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-ivory">
            <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{product.name}</span>
            <span className="block text-xs text-black/55">
              {pack.label} · {formatEuro(pack.price)}
            </span>
          </span>
          <button
            type="button"
            onClick={add}
            disabled={soldOut}
            tabIndex={stuck ? 0 : -1}
            className="rounded-xl bg-black px-5 py-3 text-xs uppercase tracking-wider text-offwhite transition-colors hover:bg-gold hover:text-black disabled:opacity-40"
          >
            {soldOut ? "Uitverkocht" : "In winkelwagen"}
          </button>
        </div>
      </div>
    </div>
  );
}
