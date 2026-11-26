"use client";

import Image from "next/image";
import { useState } from "react";
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
];

/** "Seen on the move" style row: tall Instagram tiles (photo / video alternating), caption + button below. */
export default function InstagramRow() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 md:py-28">
      <div className="flex items-end justify-between gap-6 px-6 md:px-14">
        <h2 className="text-4xl leading-[1.05] md:text-5xl">
          Volg ons op <span className="accent text-gold-muted">Instagram</span>
        </h2>
      </div>

      <ul
        onScroll={(e) => {
          const el = e.currentTarget;
          const w = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
          setActive(Math.round(el.scrollLeft / w));
        }}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] md:scroll-px-14 md:gap-5 md:px-14"
      >
        {POSTS.map((p) => {
          const href = p.id ? `${IG}${p.id}/` : business.instagram;
          return (
            <li key={p.title} className="w-[84vw] shrink-0 snap-center sm:w-[42vw] sm:snap-start md:w-[28vw] xl:w-[calc((100vw-7rem-5rem)/5)]">
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
                <span className="mt-3 block rounded-full border border-black py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] transition-colors group-hover:bg-black group-hover:text-gold">
                  Bekijk op Instagram
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      {/* Mobile slider dots */}
      <div className="mt-5 flex justify-center gap-1.5 sm:hidden" aria-hidden>
        {POSTS.map((p, k) => (
          <span key={p.title} className={`h-1.5 rounded-full transition-all duration-300 ${k === active ? "w-6 bg-black" : "w-1.5 bg-black/25"}`} />
        ))}
      </div>
    </section>
  );
}
