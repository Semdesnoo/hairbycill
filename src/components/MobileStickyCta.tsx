"use client";

import { useEffect, useRef, useState } from "react";
import BookButton from "./BookButton";

/** Mobile-only sticky CTA: slides away while scrolling down, comes back as soon as you scroll up. */
export default function MobileStickyCta() {
  const [shown, setShown] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // 8px dead zone so tiny jitters (iOS bounce, address bar) don't flicker it.
      if (Math.abs(y - lastY.current) < 8) return;
      setShown(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      {...(shown ? { "data-sticky-cta": "" } : {})}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-gold/20 bg-black/95 px-6 py-3 backdrop-blur-md transition-transform duration-300 ease-out md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <BookButton tabIndex={shown ? 0 : -1} className="w-full" />
    </div>
  );
}
