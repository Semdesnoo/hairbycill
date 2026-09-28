import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import ImageReveal from "@/components/ImageReveal";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import PortfolioGallery from "@/components/PortfolioGallery";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Maak kennis met Hair by Cill: passie voor haar, persoonlijke aandacht en professionele technieken.",
};

export default function OverOnsPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-black pb-16 pt-40">
        <ImageReveal
          src="https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=1920&auto=format&fit=crop"
          alt="Hair by Cill salon"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
          <AnimatedHeading
            as="h1"
            lines={["THIS IS", "HAIR BY CILL."]}
            className="font-display text-5xl leading-[1.02] text-offwhite md:text-7xl"
          />
        </div>
      </section>

      {/* OUR STORY — asymmetric */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:py-48">
        <div className="grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <AnimatedHeading
              lines={["PASSION FOR", "BEAUTIFUL HAIR."]}
              className="font-display text-5xl leading-[1.02] md:text-6xl"
            />
            <Reveal delay={0.2} className="mt-8 max-w-md space-y-4 text-black/60">
              <p>
                Hair by Cill is ontstaan vanuit een passie voor haar, schoonheid en persoonlijke
                aandacht.
              </p>
              <p>
                Iedere klant is anders. Daarom nemen we de tijd om samen te kijken naar jouw
                wensen, haartype en persoonlijke stijl.
              </p>
            </Reveal>
          </div>
          <ImageReveal
            src="https://images.unsplash.com/photo-1522336572468-97b06e8ef143?q=80&w=1200&auto=format&fit=crop"
            alt="Hair by Cill styling"
            className="aspect-[4/5] w-full md:col-span-6"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        </div>
      </section>

      {/* MEET CILL */}
      <section className="bg-ivory px-6 py-28 md:py-48">
        <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-12 md:items-center">
          <ImageReveal
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop"
            alt="Cill, eigenaresse Hair by Cill"
            className="order-2 aspect-[4/5] w-full md:order-1 md:col-span-5"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
          <div className="order-1 md:order-2 md:col-span-7">
            <Reveal delay={0.15}>
              <p className="font-display text-3xl leading-snug italic md:text-4xl">
                “Het mooiste resultaat is haar waarin iemand zichzelf herkent.”
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-gold-muted">
                Cill, eigenaresse
              </p>
              <p className="mt-8 max-w-md text-black/60">
                Al jaren draait mijn werk om meer dan alleen haar knippen of kleuren. Het gaat om
                vertrouwen, luisteren en het beste resultaat neerzetten voor iedere klant die bij
                mij in de stoel zit. Elke dag opnieuw zet ik mijn vakmanschap en passie in om jou
                met een goed gevoel de salon uit te laten lopen.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SALON PHOTOGRAPHY */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:py-48">
        <PortfolioGallery />
      </section>

      <CTA
        lines={["READY FOR", "YOUR NEXT LOOK?"]}
        image="https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=1920&auto=format&fit=crop"
      />
    </>
  );
}
