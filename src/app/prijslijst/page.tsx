import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import Button from "@/components/Button";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import PriceList from "@/components/PriceList";
import { priceList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Prijslijst",
  description:
    "Prijslijst van Hair by Cill in Rhoon: knippen vanaf € 29,50, stylen, kleuren, folies, extra's en haar verdikking/verlenging.",
};

// Left column; every other category (incl. new ones) lands on the right. Balanced by row count.
const LEFT = ["Knippen", "Stylen", "Extra's"];

export default function PrijslijstPage() {
  return (
    <>
      <PageHero
        title="Onze"
        accent="prijslijst"
        intro="Eerlijke prijzen, geen verrassingen. Twijfel je welke behandeling bij je past? We denken graag met je mee."
        image="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop"
      />

      {/* Price list on ecru: same heading + card language as the rest of the site */}
      <section className="px-4 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <AnimatedHeading lines={["Alle behandelingen"]} accent="op een rij" className="text-4xl leading-[1.05] md:text-5xl" />
            <p className="max-w-sm text-sm leading-relaxed text-black/60">
              Alle prijzen zijn inclusief btw. Wij werken met Keune, The art of hair.
            </p>
          </div>

          {/* Two fixed columns of near-equal height; the last card in each stretches so both end flush. */}
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[priceList.filter((c) => LEFT.includes(c.title)), priceList.filter((c) => !LEFT.includes(c.title))].map((col, ci) => (
              <div key={ci} className="flex flex-col gap-6">
                {col.map((category, i) => (
                  <PriceList
                    key={category.title}
                    category={category}
                    index={ci}
                    className={i === col.length - 1 && ci === 0 ? "flex-1" : ""}
                  />
                ))}
                {ci === 1 && (
                  <div className="flex flex-1 flex-col justify-center rounded-3xl bg-black p-8 text-offwhite">
                    <p className="text-2xl font-light">
                      Twijfel je <span className="accent text-gold">welke behandeling?</span>
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-offwhite/70">
                      Stuur ons een berichtje of plan je afspraak, dan kijken we in de salon samen wat bij jouw haar past.
                    </p>
                    <div className="mt-6">
                      <Button href="/afspraak" variant="light">Afspraak maken</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Jouw haar,"
        accent="onze passie"
        text="Weet je welke behandeling je wilt? Kies je dag en tijd, dan zien we je in de salon."
        image="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1920&auto=format&fit=crop"
      />
    </>
  );
}
