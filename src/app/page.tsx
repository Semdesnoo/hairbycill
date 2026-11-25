"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";
import Reveal from "@/components/Reveal";
import { BASE_PATH } from "@/lib/basePath";
import { products, treatments } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import InstagramRow from "@/components/InstagramRow";
import HomeHero from "@/components/HomeHero";


/** Our work: 13 result photos in two rows that glide endlessly in opposite directions. */
const WORK = Array.from({ length: 13 }, (_, i) => `${BASE_PATH}/work/${String(i + 1).padStart(2, "0")}.jpg`);
const ROWS = [WORK.slice(0, 7), WORK.slice(7)];

function WorkMarquee() {
  return (
    <section className="overflow-hidden bg-white py-24 md:py-28">
      <AnimatedHeading
        lines={["Resultaten van"]}
        accent="ons werk"
        className="px-6 text-center text-4xl leading-[1.05] md:text-5xl"
      />
      <p className="mx-auto mt-4 max-w-sm px-6 text-center text-sm text-black/60">
        Echte klanten, echte transformaties uit onze salon.
      </p>
      <div className="mt-14 flex flex-col gap-4 md:gap-5">
        {ROWS.map((row, r) => (
          <div
            key={r}
            // Endless CSS marquee: top row glides left -> right, bottom row right -> left (margins, not gap, so -50% loops exactly).
            style={{ animationDuration: "70s", animationDirection: r === 0 ? "reverse" : "normal" }}
            className={`flex w-max animate-marquee will-change-transform`}
          >
            {/* 4 copies = 2 identical halves (each wider than any screen), so the -50% keyframe loops seamlessly */}
            {[...row, ...row, ...row, ...row].map((src, i) => (
              <div
                key={i}
                className="relative mr-4 aspect-[4/3.6] w-[200px] shrink-0 overflow-hidden rounded-2xl md:mr-5 md:w-[260px]"
              >
                <Image
                  src={src}
                  alt={i < row.length ? "Resultaat van Hair by Cill" : ""}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {

  return (
    <>
        {/* HERO: light portrait hero with blur-in headline, scanning frames and live stats */}
        <HomeHero />

        {/* TREATMENTS: Dore & Rose editorial tiles (one wide, then pairs) with a white button bottom-left */}
        <section id="behandelingen" className="scroll-mt-20 px-3 py-24 md:px-6 md:py-32">
          <AnimatedHeading
            lines={["Onze"]}
            accent="behandelingen"
            className="px-6 text-center text-4xl leading-[1.05] md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-sm px-6 text-center text-sm text-black/60">
            Van een frisse coupe tot een complete kleurmetamorfose.
          </p>
          <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2 md:gap-4">
            {treatments.map((t, i) => (
              <Reveal key={t.slug} curtain delay={(i % 2) * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
                <Link
                  href={`/afspraak?treatment=${t.slug}`}
                  className={`group relative block overflow-hidden rounded-2xl bg-ivory ${
                    i === 0 ? "h-[420px] md:h-[min(68vh,560px)]" : "h-[340px] md:h-[440px]"
                  }`}
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/15 to-transparent" />
                  <div className="on-photo absolute inset-x-6 bottom-6 text-offwhite md:inset-x-9 md:bottom-9">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-offwhite/80">
                      0{i + 1} · {t.duration}
                    </p>
                    <h3 className={`mt-2 leading-none ${i === 0 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>
                      {t.name} <span className="accent text-offwhite/90">{t.accent}</span>
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-offwhite/85">{t.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-md bg-offwhite px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black transition-colors duration-300 [text-shadow:none] group-hover:bg-gold">
                      Boek {t.name.toLowerCase()}
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* INSTAGRAM: our posts, photo and video alternating */}
        <InstagramRow />

        {/* SHOP: Dore & Rose "Bestsellers" row: heading left, shop link right, swipeable product cards */}
        <section className="py-24 md:py-28">
          <div className="flex items-end justify-between gap-6 px-6 md:px-14">
            <AnimatedHeading lines={["Favoriet in"]} accent="de salon" className="text-4xl leading-[1.05] md:text-5xl" />
            <Link href="/producten" className="group mb-1 flex shrink-0 items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em]">
              Shop alles
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <p className="mt-3 max-w-sm px-6 text-sm text-black/60 md:px-14">
            De producten die wij zelf dagelijks gebruiken. Afhalen in Rhoon of thuisbezorgd.
          </p>
          <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] md:scroll-px-14 md:gap-5 md:px-14">
            {products.map((p) => (
              <li key={p.slug} className="w-[64vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] xl:w-[calc((100vw-7rem-3.75rem)/4)]">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>



        {/* OUR WORK: two scroll-driven rows */}
        <WorkMarquee />



    </>
  );
}
