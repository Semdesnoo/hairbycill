import type { Metadata } from "next";
import Button from "@/components/Button";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PriceList from "@/components/PriceList";
import { priceList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Prijslijst",
  description:
    "Bekijk de volledige prijslijst van Hair by Cill: knippen, kleuren, balayage, highlights en styling.",
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

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-20 md:grid-cols-2 md:py-28">
        {priceList.map((category, i) => (
          <PriceList key={category.title} category={category} index={i} />
        ))}
        <div className="flex flex-col justify-center rounded-2xl border border-black/10 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl">
            Niet zeker wat <span className="accent text-gold-muted">je nodig hebt?</span>
          </h2>
          <p className="mt-3 text-sm text-black/60">
            Plan een gratis adviesmoment of stel je vraag. We kijken samen naar je haar en wensen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/afspraak">Afspraak maken</Button>
            <Button href="/contact" variant="ghost">Contact</Button>
          </div>
        </div>
      </section>

      <CTA
        title="Klaar voor"
        accent="jouw moment?"
        image="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1600&auto=format&fit=crop"
      />
    </>
  );
}
