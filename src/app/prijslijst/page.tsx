import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import PriceList from "@/components/PriceList";
import { priceList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Prijslijst",
  description:
    "Prijslijst van Hair by Cill in Rhoon: knippen vanaf € 29,50, stylen, kleuren, folies, extra's en haar verdikking/verlenging.",
};

export default function PrijslijstPage() {
  return (
    <>
      <PageHero
        title="Onze"
        accent="prijslijst"
        intro="Eerlijke prijzen, geen verrassingen. Twijfel je welke behandeling bij je past? We denken graag met je mee."
        image="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop"
      />

      {/* Light price list: gold accents on white, one card per category */}
      <section className="bg-white px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, tiny logo */}
            <img src="/logo.jpg" alt="Hair by Cill" width={96} height={96} className="mx-auto h-20 w-20 rounded-full ring-1 ring-gold/60 md:h-24 md:w-24" />
            <h2 className="gold-foil mt-6 text-4xl uppercase tracking-[0.3em] md:text-5xl">Prijslijst</h2>
            <div aria-hidden className="mx-auto mt-4 flex max-w-sm items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
              <span className="h-2 w-2 rotate-45 bg-gold" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </div>

          <div className="mt-14 gap-6 md:columns-2">
            {priceList.map((category, i) => (
              <PriceList key={category.title} category={category} index={i} />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-6 border-t border-gold/40 pt-10 text-center md:flex-row md:justify-between md:text-left">
            <p className="accent gold-foil text-3xl md:text-4xl">Jouw haar, onze passie</p>
            <Button href="/afspraak">Afspraak maken</Button>
          </div>
          <p className="mt-8 text-center text-xs uppercase tracking-[0.35em] text-gold-muted">
            Wij werken met Keune · The art of hair
          </p>
        </div>
      </section>
    </>
  );
}
