"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/basePath";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/lib/data";
import { cart, cartCount, useCart } from "@/lib/cart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const count = cartCount(useCart().items);

  useEffect(() => setOpen(false), [pathname]);
  // White text over the dark home video (and the black mobile menu); dark text on cream everywhere else.
  // Pages that open on a dark photo/video hero get a white header until scrolled.
  const photoHero = ["/", "/afspraak", "/prijslijst", "/producten", "/over-ons", "/contact", "/blog"].includes(pathname.replace(/\/$/, "") || "/");
  const light = open || (photoHero && !scrolled);

  // Hide while scrolling down, reveal on any scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120);
    setScrolled(y > 40);
  });

  return (
    <>
      {/* Light, airy bar: transparent at the top, frosted ivory once scrolled. Inverts while the (black) mobile menu is open. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-5 py-3 transition-colors duration-500 md:px-10 md:py-4 ${
            scrolled && !open ? "bg-white/85 shadow-[0_1px_0_rgba(14,12,10,0.06)] backdrop-blur-md" : ""
          }`}
        >
          <Link href="/" aria-label="Hair by Cill home" className="relative block h-14 w-14 shrink-0 md:h-20 md:w-20">
            <Image src={`${BASE_PATH}/icon-512.png`} alt="Hair by Cill" fill priority sizes="80px" className="object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]" />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex lg:gap-3">
            {navLinks
              .filter((l) => l.href !== "/" && l.href !== "/afspraak")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-base font-medium tracking-wide transition-colors lg:text-lg after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:bg-black after:transition-transform after:duration-300 ${
                    light ? "text-offwhite/80 after:scale-x-0 after:bg-offwhite hover:text-offwhite hover:after:scale-x-100" : pathname === link.href ? "text-black after:scale-x-100" : "text-black/60 after:scale-x-0 hover:text-black hover:after:scale-x-100"
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
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                light ? "border-offwhite/25 bg-offwhite/10 text-offwhite backdrop-blur-sm" : "border-black/10 bg-white text-black hover:border-black/30"
              }`}
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
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
              className={`hidden rounded-full px-8 py-3.5 text-base font-medium transition-colors hover:bg-gold hover:text-black md:block ${light ? "bg-offwhite text-black" : "bg-black text-offwhite"}`}
            >
              Afspraak maken
            </Link>
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className={`block h-px w-6 ${light ? "bg-offwhite" : "bg-black"} transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-px w-6 ${light ? "bg-offwhite" : "bg-black"} transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 ${light ? "bg-offwhite" : "bg-black"} transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
