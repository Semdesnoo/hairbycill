"use client";

import Link from "next/link";

/** Subtle mobile-only sticky CTA, appears above the fold bottom bar. */
export default function MobileStickyCta() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-champagne/30 bg-ink/95 backdrop-blur-md px-6 py-3">
      <Link
        href="/contact"
        className="block w-full rounded-[8px] bg-champagne py-3 text-center text-sm font-medium tracking-wide text-ink"
      >
        AFSPRAAK MAKEN
      </Link>
    </div>
  );
}
