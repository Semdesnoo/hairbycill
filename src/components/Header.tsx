"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: "-50px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const dark = !scrolled; // hero is dark-image behind transparent header

  return (
    <>
      <div ref={sentinel} className="pointer-events-none absolute top-0 h-px w-full" />
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-offwhite/85 backdrop-blur-md border-b border-black/10 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6">
          <Logo dark={dark && !open} />

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm tracking-wide ${
                  dark ? "text-offwhite/90" : "text-black/80"
                } ${pathname === link.href ? "text-gold" : ""}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/contact"
              className={`rounded-[6px] px-5 py-2.5 text-sm tracking-wide transition-colors ${
                dark ? "bg-gold text-black hover:bg-gold-muted" : "bg-black text-offwhite hover:bg-soft-black"
              }`}
            >
              AFSPRAAK MAKEN
            </Link>
          </nav>

          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block h-px w-6 transition-transform ${open ? "translate-y-2 rotate-45 bg-offwhite" : dark ? "bg-offwhite" : "bg-black"}`}
            />
            <span
              className={`block h-px w-6 transition-opacity ${open ? "opacity-0" : dark ? "bg-offwhite" : "bg-black"}`}
            />
            <span
              className={`block h-px w-6 transition-transform ${open ? "-translate-y-2 -rotate-45 bg-offwhite" : dark ? "bg-offwhite" : "bg-black"}`}
            />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
