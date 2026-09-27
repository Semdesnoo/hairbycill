import type { Metadata } from "next";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import PriceRow from "@/components/PriceRow";
import { priceList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Prijslijst",
  description:
    "Bekijk de volledige prijslijst van Hair by Cill: knippen, kleuren, highlights, balayage en styling.",
};

export default function PrijslijstPage() {
  return (
    <>
      <section className="bg-ink px-6 pb-20 pt-28 text-center text-bone">
        <Reveal>
          <p className="mb-3 text-xs tracking-[0.25em] text-champagne uppercase">Prijslijst</p>
          <h1 className="font-display text-5xl md:text-6xl">Beautiful hair starts here.</h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        {priceList.map((category, i) => (
          <Reveal key={category.title} delay={i * 80} className="mb-16">
            <h2 className="font-display text-3xl text-champagne">{category.title}</h2>
            <div className="mt-4">
              {category.items.map((item) => (
                <PriceRow key={item.name} item={item} />
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className="mt-8 rounded-[10px] bg-charcoal/[0.04] p-10 text-center">
          <h3 className="font-display text-2xl">Twijfel je welke behandeling je nodig hebt?</h3>
          <p className="mt-2 text-ink/60">Neem contact met ons op voor persoonlijk advies.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="secondary"
              className="!text-ink !border-ink/20 hover:!border-champagne hover:!text-champagne"
            >
              Neem contact op
            </Button>
            <Button href="/contact">Afspraak maken</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
