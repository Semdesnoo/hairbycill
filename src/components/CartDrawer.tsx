"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cart, cartLines, cartTotal, useCart } from "@/lib/cart";
import { euroToNumber, formatEuro, products, SHIPPING } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export function QtyStepper({ slug, qty }: { slug: string; qty: number }) {
  return (
    <div className="flex items-center rounded-full border border-black/15 text-sm">
      <button type="button" aria-label="Minder" onClick={() => cart.setQty(slug, qty - 1)} className="px-3 py-1.5 text-black/60 hover:text-black">
        −
      </button>
      <span className="w-6 text-center">{qty}</span>
      <button type="button" aria-label="Meer" onClick={() => cart.setQty(slug, qty + 1)} className="px-3 py-1.5 text-black/60 hover:text-black">
        +
      </button>
    </div>
  );
}

const TRUST = [
  { icon: "M4 10h16l-1 10H5L4 10ZM8 10V7a4 4 0 0 1 8 0v3", label: "Gratis afhalen in Rhoon" },
  { icon: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z", label: "Veilig betalen" },
  { icon: "M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11Z", label: "Gebruikt in onze salon" },
];

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/** Cart bubble on a product card: opens the quick-add popup instead of navigating. */
export function QuickAddButton({ slug, name }: { slug: string; name: string }) {
  return (
    <button
      type="button"
      onClick={() => cart.quick(slug)}
      aria-label={`${name} in winkelwagen`}
      className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-black hover:text-gold"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2" />
        <circle cx="9" cy="20" r="1.3" />
        <circle cx="17" cy="20" r="1.3" />
      </svg>
    </button>
  );
}

/** Dore & Rose style quick-add: photo, price, quantity and one big add-to-cart button. */
function QuickAdd({ slug }: { slug: string }) {
  const [qty, setQty] = useState(1);
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  const pct = p.oldPrice ? Math.round((1 - euroToNumber(p.price) / euroToNumber(p.oldPrice)) * 100) : 0;

  return (
    <motion.div
      role="dialog"
      aria-label={`${p.name} toevoegen`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease }}
      className="fixed inset-x-0 bottom-0 z-[73] mx-auto max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white p-5 md:inset-y-0 md:my-auto md:h-fit md:rounded-3xl md:p-8"
    >
      <button type="button" onClick={() => cart.quick(null)} aria-label="Sluiten" className="absolute right-4 top-3 text-2xl text-black/40 hover:text-black">
        ×
      </button>
      <div className="grid gap-5 md:grid-cols-[220px_1fr] md:gap-8">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-ivory md:aspect-[4/5]">
          <Image src={p.image} alt={p.name} fill sizes="220px" className="object-cover" />
        </div>
        <div className="flex flex-col">
          {pct > 0 && <span className="w-fit rounded-md bg-black px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-gold">Salonaanbieding</span>}
          <p className="mt-2 text-xs text-black/50">
            {p.brand} · {p.volume}
          </p>
          <p className="text-2xl leading-tight">{p.name}</p>
          <p className="mt-2 flex items-center gap-2">
            {p.oldPrice && <span className="text-sm text-red-700 line-through">{p.oldPrice}</span>}
            <span className="text-xl font-medium">{p.price}</span>
            {pct > 0 && <span className="rounded-md bg-gold px-2 py-0.5 text-[10px] font-semibold text-black">-{pct}%</span>}
          </p>
          {p.benefit && <p className="mt-3 text-sm text-black/60">{p.benefit}</p>}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider">Aantal</span>
            <div className="flex items-center rounded-full border border-black/15 text-sm">
              <button type="button" aria-label="Minder" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-black/60 hover:text-black">
                −
              </button>
              <span className="w-6 text-center">{qty}</span>
              <button type="button" aria-label="Meer" onClick={() => setQty((q) => q + 1)} className="px-4 py-2 text-black/60 hover:text-black">
                +
              </button>
            </div>
          </div>
          <Link href={`/producten/${p.slug}`} onClick={() => cart.quick(null)} className="mt-4 w-fit text-xs text-black/55 underline underline-offset-4 hover:text-black">
            Bekijk alle details
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={() => cart.add(p.slug, qty)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-medium uppercase tracking-wider text-offwhite transition-colors hover:bg-gold hover:text-black"
      >
        In winkelwagen <span className="text-gold">·</span> {formatEuro(euroToNumber(p.price) * qty)}
      </button>
      <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-black/60">
        {TRUST.slice(0, 2).map((t) => (
          <span key={t.label} className="flex items-center gap-1.5">
            <Icon d={t.icon} size={15} /> {t.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/** Slide-in cart drawer (opens after "In winkelwagen" and from the header bag icon) + the quick-add popup. */
export default function CartDrawer() {
  const { items, open, quick } = useCart();
  const lines = cartLines(items);
  const total = cartTotal(items);
  // Savings = (old price or list price) x qty minus what she actually pays (includes the 2nd-item discount).
  const saved = lines.reduce((s, l) => s + euroToNumber(l.product.oldPrice ?? l.product.price) * l.qty - l.total, 0);
  const toFree = Math.max(0, SHIPPING.freeFrom - total);
  const upsell = products.filter((p) => !items.some((i) => i.slug === p.slug)).slice(0, 4);

  return (
    <>
      <AnimatePresence>
        {quick && (
          <>
            <motion.div
              key="quick-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => cart.quick(null)}
              className="fixed inset-0 z-[72] bg-black/50 backdrop-blur-sm"
            />
            <QuickAdd key={quick} slug={quick} />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cart.close}
              className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              role="dialog"
              aria-label="Winkelwagen"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease }}
              className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-white"
            >
              <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
                <p className="text-sm font-medium uppercase tracking-[0.15em]">
                  Winkelwagen {lines.length > 0 && <span className="text-black/45">({lines.reduce((s, l) => s + l.qty, 0)})</span>}
                </p>
                <button type="button" onClick={cart.close} aria-label="Sluiten" className="text-2xl leading-none text-black/50 hover:text-black">
                  ×
                </button>
              </div>

              {lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="text-black/55">Je winkelwagen is nog leeg.</p>
                  <Link href="/producten" onClick={cart.close} className="rounded-full bg-black px-6 py-3 text-sm text-offwhite hover:bg-gold hover:text-black">
                    Bekijk producten
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    {/* Free shipping progress */}
                    <div className="border-b border-black/10 px-6 py-4">
                      <p className="text-sm">
                        {toFree > 0 ? (
                          <>
                            Nog <span className="font-semibold">{formatEuro(toFree)}</span> tot gratis verzending
                          </>
                        ) : (
                          <span className="font-medium">Je hebt gratis verzending ✓</span>
                        )}
                      </p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10">
                        <motion.div
                          className="h-full rounded-full bg-gold"
                          initial={false}
                          animate={{ width: `${Math.min(100, (total / SHIPPING.freeFrom) * 100)}%` }}
                          transition={{ duration: 0.6, ease }}
                        />
                      </div>
                    </div>

                    <ul className="divide-y divide-black/10">
                      {lines.map(({ product, qty, total: line }) => (
                        <li key={product.slug} className="flex gap-4 px-6 py-5">
                          <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-ivory">
                            <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <Link href={`/producten/${product.slug}`} onClick={cart.close} className="font-medium leading-tight hover:underline">
                                {product.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => cart.setQty(product.slug, 0)}
                                aria-label={`${product.name} verwijderen`}
                                className="text-black/40 hover:text-red-700"
                              >
                                <Icon d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                              </button>
                            </div>
                            <p className="text-xs text-black/50">
                              {product.brand} · {product.volume}
                            </p>
                            <p className="mt-1 text-sm">
                              {product.oldPrice && <span className="mr-2 text-red-700 line-through">{product.oldPrice}</span>}
                              {product.price}
                            </p>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <QtyStepper slug={product.slug} qty={qty} />
                              <span className="text-sm font-medium">{formatEuro(line)}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {upsell.length > 0 && (
                      <div className="border-t border-black/10 px-6 py-5">
                        <p className="font-medium">Maak je routine compleet</p>
                        <ul className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
                          {upsell.map((p) => (
                            <li key={p.slug} className="flex w-36 shrink-0 flex-col">
                              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ivory">
                                <Image src={p.image} alt={p.name} fill sizes="144px" className="object-cover" />
                              </div>
                              <p className="mt-2 truncate text-xs font-medium">{p.name}</p>
                              <p className="mt-0.5 text-xs">
                                {p.oldPrice && <span className="mr-1.5 text-red-700 line-through">{p.oldPrice}</span>}
                                <span className="font-medium">{p.price}</span>
                              </p>
                              <button
                                type="button"
                                onClick={() => cart.add(p.slug, 1)}
                                className="mt-2.5 rounded-full border border-black py-2.5 text-xs font-medium transition-colors hover:bg-black hover:text-gold"
                              >
                                In winkelwagen
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-black/10 bg-ivory px-6 py-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium">Subtotaal</span>
                      <span className="text-xl font-medium">{formatEuro(total)}</span>
                    </div>
                    {saved > 0.004 && <p className="mt-1 text-right text-xs text-emerald-700">Je bespaart {formatEuro(saved)}</p>}
                    <Link
                      href="/checkout"
                      onClick={cart.close}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-medium uppercase tracking-wider text-offwhite transition-colors hover:bg-gold hover:text-black"
                    >
                      Afrekenen <span className="text-gold">·</span> {formatEuro(total)}
                    </Link>
                    <button type="button" onClick={cart.close} className="mt-3 w-full text-center text-xs text-black/55 underline-offset-4 hover:underline">
                      Verder winkelen
                    </button>
                    <ul className="mt-4 grid grid-cols-3 gap-2 border-t border-black/10 pt-4 text-center text-[11px] leading-tight text-black/60">
                      {TRUST.map((t) => (
                        <li key={t.label} className="flex flex-col items-center gap-1.5">
                          <Icon d={t.icon} size={20} />
                          {t.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
