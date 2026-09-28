"use client";

import { useEffect, useRef } from "react";
import { BASE_PATH } from "@/lib/basePath";

/**
 * Muted looping background video that also autoplays on phones.
 * iOS/Android only autoplay when the element is muted *as a DOM property and attribute*
 * and inline; React sets `muted` as a property only after hydration, so we force both and
 * call play() ourselves. Low Power Mode / data saver still block it: then the poster
 * (first frame) shows and the first tap anywhere starts playback.
 */
export default function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const tryPlay = () => void v.play().catch(() => {});
    tryPlay();
    // Autoplay refused (power saving): start on the first interaction instead.
    window.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    window.addEventListener("click", tryPlay, { once: true });
    return () => {
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("click", tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={`${BASE_PATH}/hero-poster.jpg`}
      aria-hidden
      className={className}
    >
      {/* Lighter 720p file for phones, full HD for larger screens */}
      <source src={`${BASE_PATH}/hero-2-mobile.mp4`} type="video/mp4" media="(max-width: 767px)" />
      <source src={`${BASE_PATH}/hero-2.mp4`} type="video/mp4" />
    </video>
  );
}
