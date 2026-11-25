"use client";

import Image from "next/image";
import { useRef } from "react";
import { BASE_PATH } from "@/lib/basePath";
import { business } from "@/lib/data";

const IG = "https://www.instagram.com/p/";

// Our own Instagram posts, photo and video alternating. Media are stored in public/ig (Instagram CDN links expire).
const POSTS = [
  { id: "C5gl6wgM7UM", img: "C5gl6wgM7UM-0.jpg", title: "Blond met zachte golven", label: "Kleuren" },
  { id: "DZZb9JBKiad", img: "DZZb9JBKiad-0.jpg", video: "/ig/DZZb9JBKiad.mp4", title: "Onze Keune favoriet is terug", label: "Reel" },
  { id: "DAvVHfLse5X", img: "DAvVHfLse5X-0.jpg", title: "Voor en na", label: "Kleuren" },
  { id: "", img: "", video: "/hero-2-mobile.mp4", poster: "/hero-poster.jpg", title: "Een kijkje in de salon", label: "Salon" },
  { id: "DAOoD_FsAOY", img: "DAOoD_FsAOY-0.jpg", title: "Highlights zonder toner", label: "Highlights" },
  { id: "DZEzhsqqh79", img: "DZEzhsqqh79-0.jpg", title: "Hairbooster & Golden gloss", label: "Producten" },
];

/** "Seen on the move" style row: tall Instagram tiles (photo / video alternating), caption + button below. */
export default function InstagramRow() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="py-24 md:py-28">
      <div className="flex items-end justify-between gap-6 px-6 md:px-14">
        <h2 className="text-4xl leading-[1.05] md:text-5xl">
          Volg ons op <span className="accent text-gold-muted">Instagram</span>
        </h2>
        <div className="hidden gap-2 md:flex">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Vorige" : "Volgende"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:border-black hover:bg-black hover:text-gold"
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] md:scroll-px-14 md:gap-5 md:px-14"
      >
        {POSTS.map((p) => {
          const href = p.id ? `${IG}${p.id}/` : business.instagram;
          return (
            <li key={p.title} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-[28vw] xl:w-[calc((100vw-7rem-5rem)/5)]">
              <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[9/14] overflow-hidden rounded-2xl bg-ivory">
                  {p.video ? (
                    <video
                      src={`${BASE_PATH}${p.video}`}
                      poster={`${BASE_PATH}${p.poster ?? `/ig/${p.img}`}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={`${BASE_PATH}/ig/${p.img}`}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 28vw, 68vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-ivory">
                    <Image src={`${BASE_PATH}/icon-192.png`} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{p.title}</span>
                    <span className="block text-xs text-gold-muted">{p.label}</span>
                  </span>
                </div>
                <span className="mt-3 block border border-black py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] transition-colors group-hover:bg-black group-hover:text-gold">
                  Bekijk op Instagram
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
