"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === link.href ? "text-champagne" : "text-bone/80 hover:text-champagne"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-[8px] bg-champagne px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gold-light"
          >
            Afspraak maken
          </Link>
        </nav>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-px w-6 bg-bone transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-px w-6 bg-bone transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-px w-6 bg-bone transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-ink/95 backdrop-blur-md border-t border-white/10 px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-2xl ${
                pathname === link.href ? "text-champagne" : "text-bone"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-[8px] bg-champagne px-5 py-3 text-center text-sm font-medium text-ink"
          >
            Afspraak maken
          </Link>
        </nav>
      )}
    </header>
  );
}
