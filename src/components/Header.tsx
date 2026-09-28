"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { navLinks, business } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        {/* Topbar */}
        <div className="hidden bg-black text-offwhite/70 md:block">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-xs tracking-wide">
            <div className="flex items-center gap-8">
              <a href={business.phoneHref} className="hover:text-gold">
                Bel of maak een afspraak: {business.phone}
              </a>
              <span className="text-offwhite/50">{business.address}</span>
              <a href={`mailto:${business.email}`} className="hover:text-gold">
                {business.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <a href={business.instagram} className="hover:text-gold">
                Instagram
              </a>
              <a href={business.facebook} className="hover:text-gold">
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="border-b border-offwhite/10 bg-soft-black">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
            <Link href="/" className="leading-tight">
              <span className="font-display block text-xl tracking-[0.15em] text-offwhite">
                {business.name.toUpperCase()}
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-gold">
                {business.tagline.toUpperCase()}
              </span>
            </Link>

            <nav className="hidden items-center gap-7 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-sm tracking-[0.12em] ${
                    pathname === link.href ? "text-gold" : "text-offwhite/80 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/afspraak"
                className="font-display bg-gold px-5 py-2.5 text-sm tracking-[0.12em] text-black transition-colors hover:bg-gold-muted"
              >
                Afspraak maken
              </Link>
            </nav>

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
