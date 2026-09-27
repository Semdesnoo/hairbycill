import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TreatmentCard from "@/components/TreatmentCard";
import ProductCard from "@/components/ProductCard";
import ReviewSlider from "@/components/ReviewSlider";
import Gallery from "@/components/Gallery";
import CtaSection from "@/components/CtaSection";
import { treatments, products, galleryImages } from "@/lib/data";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-20 flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop"
          alt="Hair by Cill salon"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
        <div className="relative z-10 px-6 text-center">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.35em] text-champagne">
              HAIR • BEAUTY • CONFIDENCE
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-5xl leading-tight text-bone sm:text-6xl md:text-7xl">
              HAIR BY CILL
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 font-display text-2xl text-champagne md:text-3xl">
              Luxury hair, made personal.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mx-auto mt-6 max-w-md text-sm text-bone/70">
              Professionele haarbehandelingen met persoonlijke aandacht voor jouw haar, stijl en
              uitstraling.
            </p>
          </Reveal>
          <Reveal delay={400} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact">Afspraak maken</Button>
            <Button href="/prijslijst" variant="secondary">
              Bekijk prijslijst
            </Button>
          </Reveal>
        </div>
      </section>

      {/* INTRODUCTIE */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Welkom bij Hair by Cill"
              title="Jouw haar verdient persoonlijke aandacht."
            />
            <p className="mt-6 text-ink/70">
              Bij Hair by Cill draait het niet alleen om een nieuwe coupe. Samen kijken we naar
              wat past bij jouw haar, gezicht en persoonlijke stijl.
            </p>
            <p className="mt-4 text-ink/70">
              Met professionele producten, aandacht en passie creëren we een resultaat waar jij je
              goed bij voelt.
            </p>
            <Button href="/over-ons" variant="secondary" className="mt-8 !text-ink !border-ink/20 hover:!border-champagne hover:!text-champagne">
              Ontdek Hair by Cill
            </Button>
          </Reveal>
          <Reveal delay={150} className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
            <Image
              src="https://images.unsplash.com/photo-1522336572468-97b06e8ef143?q=80&w=1200&auto=format&fit=crop"
              alt="Hair by Cill styling"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* POPULAIRE BEHANDELINGEN */}
      <section className="bg-bone px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Behandelingen"
              title="Populaire behandelingen"
              align="center"
            />
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {treatments.map((t, i) => (
              <Reveal key={t.slug} delay={i * 100}>
                <TreatmentCard treatment={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY EXPERIENCE */}
      <section className="bg-ink px-6 py-28 text-bone">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
            <Image
              src="https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=1200&auto=format&fit=crop"
              alt="Hair by Cill experience"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={150}>
            <SectionHeading eyebrow="De ervaring" title="Meer dan alleen een kapsalon." dark />
            <div className="mt-10 grid grid-cols-2 gap-8">
              {[
                ["01", "Persoonlijk advies"],
                ["02", "Professionele producten"],
                ["03", "Aandacht voor detail"],
                ["04", "Een resultaat dat bij jou past"],
              ].map(([num, label]) => (
                <div key={num}>
                  <p className="font-display text-3xl text-champagne">{num}</p>
                  <p className="mt-2 text-sm text-bone/70">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTEN PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Haircare"
            title="Professional haircare at home"
            subtitle="Verleng het salonresultaat met onze zorgvuldig geselecteerde haarproducten."
            align="center"
          />
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button href="/producten" variant="secondary" className="!text-ink !border-ink/20 hover:!border-champagne hover:!text-champagne">
            Bekijk alle producten
          </Button>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className="bg-bone px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading eyebrow="Lookbook" title="Hair by Cill Results" align="center" />
          </Reveal>
          <Reveal delay={150} className="mt-16">
            <Gallery images={galleryImages} />
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-ink px-6 py-28">
        <Reveal>
          <ReviewSlider />
        </Reveal>
      </section>

      {/* AFSPRAAK CTA */}
      <CtaSection
        title="Ready for your next hair moment?"
        subtitle="Plan jouw afspraak bij Hair by Cill."
        image="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1920&auto=format&fit=crop"
      />
    </>
  );
}
