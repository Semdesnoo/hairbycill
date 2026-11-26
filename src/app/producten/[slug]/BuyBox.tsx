"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cart } from "@/lib/cart";
import { loadStock } from "@/lib/bookingApi";
import { Product, euroToNumber, formatEuro, SECOND_ITEM_DISCOUNT, SHIPPING } from "@/lib/data";

/**
 * Dore & Rose buy box: quantity as "size" boxes (2nd item discounted), stock dot, big add-to-cart with price,
 * trust line underneath, sticky bar once the button scrolls away.
 */
export default function BuyBox({ product }: { product: Product }) {
  const unit = euroToNumber(product.price);
  const was = product.oldPrice ? euroToNumber(product.oldPrice) : unit;
  const packs = [
    { qty: 1, label: "1 stuk", price: unit, was },
    ...(SECOND_ITEM_DISCOUNT > 0 ? [{ qty: 2, label: "2 stuks", price: unit * (2 - SECOND_ITEM_DISCOUNT), was: was * 2 }] : []),
  ];
  const [qty, setQty] = useState(1);
  const pack = packs.find((p) => p.qty === qty)!;
  // Live stock from the dashboard; null = unknown (offline), then we don't block.
  const [stock, setStock] = useState<number | null>(null);
  useEffect(() => {
    loadStock().then((s) => setStock(s[product.slug] ?? 0)).catch(() => {});
  }, [product.slug]);
  const soldOut = stock === 0;
  const add = () => cart.add(product.slug, stock === null ? pack.qty : Math.min(pack.qty, stock));

  // Sticky buy bar: shows once the main button has scrolled up out of view.
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
      <p className="text-xs">
        <span className="font-semibold uppercase">Aantal</span>
        <span className="mx-2 text-black/25">|</span>
        <span className="text-black/60">{pack.label}</span>
        {SECOND_ITEM_DISCOUNT > 0 && <span className="ml-3 text-gold-muted">{Math.round(SECOND_ITEM_DISCOUNT * 100)}% korting op je tweede</span>}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-5" role="radiogroup" aria-label="Kies een aantal">
        {packs.map((p) => (
          <button
            key={p.qty}
            type="button"
            role="radio"
            aria-checked={p.qty === qty}
            onClick={() => setQty(p.qty)}
            className={`border py-3.5 text-sm font-semibold transition-colors ${
              p.qty === qty ? "border-black text-black" : "border-black/15 text-black/60 hover:border-black/40"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs text-emerald-700">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
        {soldOut ? "Tijdelijk uitverkocht" : stock !== null && stock <= 3 ? `Nog ${stock} op voorraad` : "Op voorraad in de salon"}
      </p>

      <button
        ref={buyRef}
        type="button"
        onClick={add}
        disabled={soldOut}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-black py-[1.1rem] text-base font-medium uppercase text-offwhite transition-colors hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2" />
          <circle cx="9" cy="20" r="1.3" />
          <circle cx="17" cy="20" r="1.3" />
        </svg>
        In winkelwagen <span className="text-gold">·</span> {formatEuro(pack.price)}
      </button>

      <p className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-1 text-xs text-black/70">
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 3 3 5-6" />
          </svg>
          Gratis afhalen in Rhoon
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01" />
          </svg>
          Gratis verzending vanaf {formatEuro(SHIPPING.freeFrom)}
        </span>
      </p>

      <div
        {...(stuck ? { "data-sticky-cta": "" } : {})}
        aria-hidden={!stuck}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur-md transition-transform duration-500 md:inset-x-auto md:bottom-5 md:left-1/2 md:w-[560px] md:-translate-x-1/2 md:rounded-2xl md:border md:shadow-xl md:shadow-black/10 ${
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
            className="rounded-md bg-black px-5 py-3 text-xs uppercase tracking-wider text-offwhite transition-colors hover:bg-gold hover:text-black disabled:opacity-40"
          >
            {soldOut ? "Uitverkocht" : "In winkelwagen"}
          </button>
        </div>
      </div>
    </div>
  );
}
