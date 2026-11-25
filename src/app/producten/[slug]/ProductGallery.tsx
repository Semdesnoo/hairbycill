"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Img = { src: string; label?: string };

/**
 * Dore & Rose gallery: on desktop the photos sit flush in a 2-column grid that you scroll
 * past next to the buy box; on mobile it is a swipeable slider with dots.
 */
export default function ProductGallery({ images, alt }: { images: Img[]; alt: string }) {
  const [i, setI] = useState(0);
  const touchX = useRef(0);
  const go = (k: number) => setI((k + images.length) % images.length);
  const altOf = (k: number) => (k === 0 ? alt : images[k].label ?? "");

  return (
    <>
      {/* Desktop grid */}
      <div className="hidden animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_both] grid-cols-2 gap-1.5 lg:grid">
        {images.map((img, k) => (
          <figure key={img.src} className="relative aspect-[4/5.2] overflow-hidden bg-ivory">
            <Image
              src={img.src}
              alt={altOf(k)}
              fill
              priority={k < 2}
              sizes="31vw"
              className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
            />
            {img.label && (
              <figcaption className="absolute bottom-3 left-3 rounded-md bg-offwhite/90 px-2.5 py-1 text-[10px] uppercase tracking-wide">
                {img.label}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Mobile slider */}
      <div className="lg:hidden">
        <div
          className="relative aspect-square w-full animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_both] overflow-hidden rounded-2xl bg-ivory"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
          }}
        >
          {images.map((img, k) => (
            <Image
              key={img.src}
              src={img.src}
              alt={altOf(k)}
              fill
              priority={k === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {images[i].label && (
            <span className="absolute bottom-3 left-3 rounded-md bg-offwhite/90 px-2.5 py-1 text-[10px] uppercase tracking-wide">
              {images[i].label}
            </span>
          )}
        </div>
        <div className="mt-2 flex justify-center gap-1">
          {images.map((img, k) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Afbeelding ${k + 1}`}
              aria-current={k === i}
              className="flex h-8 items-center px-1.5"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-black" : "w-1.5 bg-black/25"}`} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
