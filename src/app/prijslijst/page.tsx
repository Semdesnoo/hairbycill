import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import SectionLabel from "@/components/SectionLabel";
import PriceList from "@/components/PriceList";
import Reveal from "@/components/Reveal";
import { priceList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Prijslijst",
  description:
    "Bekijk de volledige prijslijst van Hair by Cill: knippen, kleuren, balayage, highlights en styling.",
};

export default function PrijslijstPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:pt-52">
        <SectionLabel>Prijslijst</SectionLabel>
        <AnimatedHeading
          as="h1"
          lines={["BEAUTIFUL HAIR", "STARTS HERE."]}
          className="font-display text-5xl leading-[1.02] md:text-7xl"
        />
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-28 md:pb-48">
        {priceList.map((category, i) => (
          <PriceList key={category.title} category={category} index={i} />
        ))}

        <Reveal className="border-t border-black/15 pt-16 text-center">
          <h2 className="font-display text-3xl">Not sure what you need?</h2>
          <p className="mt-3 text-black/60">Wij denken graag met je mee.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            <a href="/contact" className="group inline-flex items-center gap-2 text-sm">
              <span className="border-b border-black/30 pb-0.5 group-hover:border-gold group-hover:text-gold-muted">
                CONTACT OPNEMEN
              </span>
              <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </a>
            <a href="/afspraak" className="group inline-flex items-center gap-2 text-sm">
              <span className="border-b border-black/30 pb-0.5 group-hover:border-gold group-hover:text-gold-muted">
                AFSPRAAK MAKEN
              </span>
              <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
