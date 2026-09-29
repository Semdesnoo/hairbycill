"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cart, cartLines, cartTotal, useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/data";

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

/** Slide-in cart drawer (opens after "In winkelwagen" and from the header bag icon). */
export default function CartDrawer() {
  const { items, open } = useCart();
  const lines = cartLines(items);

  return (
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
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-offwhite"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <p className="text-xl font-light">
                Jouw <span className="accent text-gold-muted">winkelwagen</span>
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
                <ul className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                  {lines.map(({ product, qty, total }) => (
                    <li key={product.slug} className="flex gap-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-ivory">
                        <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-[11px] text-black/45">{product.brand}</p>
                        <Link href={`/producten/${product.slug}`} onClick={cart.close} className="leading-tight hover:underline">
                          {product.name}
                        </Link>
                        <p className="text-xs text-black/45">{product.volume}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <QtyStepper slug={product.slug} qty={qty} />
                          <span className="text-sm">{formatEuro(total)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-black/10 px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-black/55">Subtotaal</span>
                    <span className="text-xl">{formatEuro(cartTotal(items))}</span>
                  </div>
                  <p className="mt-1 text-xs text-black/45">Gratis afhalen in de salon of thuisbezorgd.</p>
                  <Link
                    href="/checkout"
                    onClick={cart.close}
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-black py-4 text-sm uppercase tracking-wider text-offwhite transition-colors hover:bg-gold hover:text-black"
                  >
                    Afrekenen
                  </Link>
                  <button type="button" onClick={cart.close} className="mt-3 w-full text-center text-xs text-black/55 underline-offset-4 hover:underline">
                    Verder winkelen
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
