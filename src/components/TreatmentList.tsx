"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Treatment } from "@/lib/data";

/** Large horizontal rows (not cards). Hover reveals a preview image on desktop. */
export default function TreatmentList({ treatments }: { treatments: Treatment[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = treatments.find((t) => t.slug === hovered);

  return (
    <div className="relative">
      <div className="border-t border-black/15">
        {treatments.map((t, i) => (
          <Link
            key={t.slug}
            href="/prijslijst"
            onMouseEnter={() => setHovered(t.slug)}
            onMouseLeave={() => setHovered(null)}
            className="group flex items-center justify-between border-b border-black/15 py-7 transition-colors hover:border-gold md:py-9"
          >
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-sm text-gold-muted">0{i + 1}</span>
              <span className="font-display text-3xl transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                {t.name}
              </span>
            </div>
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop-only floating preview image */}
      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-72 w-56 -translate-y-1/2 overflow-hidden rounded-[6px] lg:block">
        {active && (
          <Image
            key={active.slug}
            src={active.image}
            alt={active.name}
            fill
            sizes="220px"
            className="object-cover opacity-90"
          />
        )}
      </div>
    </div>
  );
}
