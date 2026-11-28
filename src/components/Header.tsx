"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/lib/basePath";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/lib/data";
import BookButton from "./BookButton";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => setOpen(false), [pathname]);
  // White text over the dark home video (and the black mobile menu); dark text on cream everywhere else.
  // Pages that open on a dark photo/video hero get a white header until scrolled.
  const photoHero = ["/", "/prijslijst", "/over-ons", "/blog"].includes(pathname.replace(/\/$/, "") || "/");
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
              .filter((l) => l.href !== "/")
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
            <BookButton label="Afspraak maken" tone={light ? "light" : "dark"} className="hidden py-1 text-base md:inline-flex" />
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
