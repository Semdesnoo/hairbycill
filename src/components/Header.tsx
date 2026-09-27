"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { navLinks, business } from "@/lib/data";

const mid = Math.ceil(navLinks.length / 2);
const leftLinks = navLinks.slice(0, mid);
const rightLinks = navLinks.slice(mid);

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 border-b border-black/5 bg-offwhite/95 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 items-center px-6 py-4 md:grid-cols-3">
          <nav className="hidden md:flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide ${
                  pathname === link.href ? "text-gold" : "text-black/70 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="justify-self-start text-center md:justify-self-center">
            <div className="font-display text-xl tracking-[0.35em] text-black md:text-2xl">
              {business.name.toUpperCase()}
            </div>
            <div className="mt-0.5 text-[10px] tracking-[0.3em] text-black/50">
              {business.tagline.toUpperCase()}
            </div>
          </Link>

          <div className="hidden items-center justify-end gap-8 md:flex">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide ${
                  pathname === link.href ? "text-gold" : "text-black/70 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-[6px] bg-gold-muted px-5 py-2.5 text-sm tracking-wide text-black hover:bg-gold"
            >
              Afspraak maken
            </Link>
          </div>

          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="justify-self-end flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`block h-px w-6 bg-black transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-black transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold-muted/60 to-transparent" />
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
