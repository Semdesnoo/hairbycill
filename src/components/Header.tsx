"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/lib/data";
import { cart, cartCount, useCart } from "@/lib/cart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Product and blog detail pages start on cream, not on a dark photo hero.
  const hasDarkHero = !/^\/((producten|blog)\/[^/]+|checkout)/.test(pathname);
  const { scrollY } = useScroll();
  const count = cartCount(useCart().items);

  useEffect(() => setOpen(false), [pathname]);

  // Hide while scrolling down, reveal on any scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120);
    setScrolled(y > 40);
  });

  return (
    <>
      {/* Transparent bar over the hero; gets a soft glass backdrop once scrolled so it stays readable on cream */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10 md:py-5 ${
            !hasDarkHero ? "bg-black" : scrolled ? "bg-black/55 backdrop-blur-md" : ""
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl text-offwhite md:text-2xl">
              Hair <span className="accent text-gold">by</span> Cill
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
            {navLinks
              .filter((l) => l.href !== "/" && l.href !== "/afspraak")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full border px-5 py-2 text-sm backdrop-blur-sm transition-colors ${
                    pathname === link.href
                      ? "border-offwhite/60 bg-offwhite/30 text-offwhite"
                      : "border-offwhite/20 bg-offwhite/10 text-offwhite hover:bg-offwhite/25"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={cart.open}
              aria-label={`Winkelwagen${count ? `, ${count} artikelen` : ""}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 bg-offwhite/10 text-offwhite transition-colors hover:bg-offwhite/25"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M6 7h12l-1 13H7L6 7Z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-black">
                  {count}
                </span>
              )}
            </button>
            <Link
              href="/afspraak"
              className="hidden rounded-full bg-offwhite px-6 py-2.5 text-sm text-black transition-colors hover:bg-gold md:block"
            >
              Afspraak maken
            </Link>
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className={`block h-px w-6 bg-offwhite transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-offwhite transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-offwhite transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
