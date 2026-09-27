"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Subtle mobile-only sticky CTA. Hidden while the fullscreen menu could be open (contact page needs no duplicate). */
export default function MobileStickyCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-gold/20 bg-black/95 backdrop-blur-md px-6 py-3">
      <Link
        href="/contact"
        className="block w-full rounded-[6px] bg-gold py-3 text-center text-sm tracking-wide text-black"
      >
        AFSPRAAK MAKEN
      </Link>
    </div>
  );
}
