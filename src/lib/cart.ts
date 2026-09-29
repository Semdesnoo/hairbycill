"use client";

// Shopping cart: kept in the visitor's localStorage, shared via useSyncExternalStore so the header
// badge, drawer, product page and checkout stay in sync (also across tabs).
// ponytail: no payment provider yet (backend comes later) -> checkout sends the order to the salon
// and the customer pays when picking up. Add Mollie/Stripe in the checkout submit when needed.
import { useSyncExternalStore } from "react";
import { euroToNumber, products, SECOND_ITEM_DISCOUNT, type Product } from "./data";

export type CartItem = { slug: string; qty: number };
type State = { items: CartItem[]; open: boolean };

const KEY = "hbc_cart";
const EMPTY: State = { items: [], open: false };
let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const items = JSON.parse(localStorage.getItem(KEY) ?? "[]") as CartItem[];
    // Drop products that no longer exist or bad quantities (stale storage).
    state = { ...state, items: items.filter((i) => products.some((p) => p.slug === i.slug) && i.qty > 0) };
  } catch {
    state = EMPTY;
  }
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    loaded = false;
    load();
    listeners.forEach((l) => l());
  });
}

function set(next: Partial<State>) {
  state = { ...state, ...next };
  if (next.items) localStorage.setItem(KEY, JSON.stringify(state.items));
  listeners.forEach((l) => l());
}

export const cart = {
  add(slug: string, qty: number) {
    load();
    const items = state.items.some((i) => i.slug === slug)
      ? state.items.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i))
      : [...state.items, { slug, qty }];
    set({ items, open: true });
  },
  setQty(slug: string, qty: number) {
    load();
    set({ items: qty > 0 ? state.items.map((i) => (i.slug === slug ? { ...i, qty } : i)) : state.items.filter((i) => i.slug !== slug) });
  },
  clear: () => set({ items: [] }),
  open: () => set({ open: true }),
  close: () => set({ open: false }),
};

export function useCart(): State {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => {
      load();
      return state;
    },
    () => EMPTY,
  );
}

/** Price for `qty` of one product: every 2nd item gets SECOND_ITEM_DISCOUNT (matches the 2-pack on the product page). */
export function lineTotal(product: Product, qty: number): number {
  const unit = euroToNumber(product.price);
  return Math.round(unit * (qty - Math.floor(qty / 2) * SECOND_ITEM_DISCOUNT) * 100) / 100;
}

export function cartLines(items: CartItem[]) {
  return items.flatMap((i) => {
    const product = products.find((p) => p.slug === i.slug);
    return product ? [{ product, qty: i.qty, total: lineTotal(product, i.qty) }] : [];
  });
}

export const cartTotal = (items: CartItem[]) => cartLines(items).reduce((s, l) => s + l.total, 0);
export const cartCount = (items: CartItem[]) => items.reduce((s, i) => s + i.qty, 0);
