"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/lib/data";
import { BASE_PATH } from "@/lib/basePath";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Floating glassy pill bar over the hero */}
      <header className="fixed top-3 inset-x-3 z-50 md:top-5 md:inset-x-6">
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between rounded-full bg-black/45 px-3 py-2 backdrop-blur-md md:px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={`${BASE_PATH}/logo.jpg`}
              alt="Hair by Cill logo"
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
            <span className="hidden text-base text-offwhite sm:block">
              Hair <span className="accent text-gold">by</span> Cill
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 md:flex">
            {navLinks
              .filter((l) => l.href !== "/afspraak")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
                    pathname === link.href
                      ? "bg-offwhite text-black"
                      : "bg-offwhite/15 text-offwhite hover:bg-offwhite/30"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/afspraak"
              className="hidden rounded-full bg-offwhite px-5 py-2 text-xs text-black transition-colors hover:bg-gold md:block"
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
