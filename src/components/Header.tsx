"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { navLinks, business } from "@/lib/data";
import { BASE_PATH } from "@/lib/basePath";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Floating glassy pill bar over the hero */}
      <header className="fixed top-3 inset-x-3 z-50 md:top-5 md:inset-x-6">
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between rounded-2xl border border-offwhite/10 bg-black/60 px-4 py-2.5 backdrop-blur-md md:rounded-3xl md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={`${BASE_PATH}/logo.jpg`}
              alt="Hair by Cill logo"
              width={44}
              height={44}
              className="rounded-full"
              priority
            />
            <span className="font-display hidden text-lg tracking-[0.15em] text-offwhite sm:block">
              {business.name.toUpperCase()}
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks
              .filter((l) => l.href !== "/" && l.href !== "/afspraak")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide ${
                    pathname === link.href ? "text-gold" : "text-offwhite/85 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/afspraak"
              className="hidden rounded-full bg-gold px-6 py-2.5 text-sm tracking-wide text-black transition-colors hover:bg-gold-muted md:block"
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
