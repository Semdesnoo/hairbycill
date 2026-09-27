"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/Button";
import AnimatedHeading from "@/components/AnimatedHeading";
import ImageReveal from "@/components/ImageReveal";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import NumberedList from "@/components/NumberedList";
import TreatmentList from "@/components/TreatmentList";
import PortfolioGallery from "@/components/PortfolioGallery";
import Marquee from "@/components/Marquee";
import ReviewSlider from "@/components/ReviewSlider";
import ProductGrid from "@/components/ProductGrid";
import CTA from "@/components/CTA";
import { treatments, products, business } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  return (
    <>
      {/* HERO — full-screen centered, dominant photography */}
      <section className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden bg-black">
        <ImageReveal
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop"
          alt="Hair by Cill"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

        <div className="relative z-10 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mb-6 text-xs tracking-[0.4em] text-gold"
          >
            HAAR • BEAUTY • ZELFVERTROUWEN
          </motion.p>

          <AnimatedHeading
            as="h1"
            delay={0.25}
            lines={["BEAUTIFUL HAIR", "STARTS WITH YOU."]}
            className="mx-auto font-display text-[clamp(3rem,9vw,8rem)] leading-[0.98] text-offwhite"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            className="mx-auto mt-8 max-w-md text-base text-offwhite/70 md:text-lg"
          >
            Hair by Cill creëert kapsels die passen bij jouw haar, uitstraling en persoonlijke
            stijl.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
          >
            <Button href="/contact" variant="primary" className="!bg-gold !text-black hover:!bg-gold-muted">
              AFSPRAAK MAKEN
            </Button>
            <Link href="/over-ons" className="group inline-flex items-center gap-2 text-sm tracking-widest text-offwhite/80">
              <span className="border-b border-offwhite/30 pb-0.5 group-hover:border-gold group-hover:text-gold">
                ONTDEK HAIR BY CILL
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* THE SALON — asymmetric intro, large portrait + smaller offset image */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:py-48">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-5">
            <SectionLabel>The Salon</SectionLabel>
            <AnimatedHeading
              lines={["HAIR IS", "PERSONAL."]}
              className="font-display text-5xl leading-[1.02] md:text-7xl"
            />
            <Reveal delay={0.2} className="mt-8 max-w-sm text-black/60">
              <p>
                Bij Hair by Cill draait een behandeling niet alleen om knippen of kleuren. We
                kijken naar jouw haar, gezicht, wensen en persoonlijke stijl om een resultaat te
                creëren dat echt bij jou past.
              </p>
              <div className="mt-8">
                <Link href="/over-ons" className="group inline-flex items-center gap-2 text-sm">
                  <span className="border-b border-black/30 pb-0.5 group-hover:border-gold group-hover:text-gold-muted">
                    MEER OVER ONS
                  </span>
                  <span className="transition-transform group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:relative">
            <ImageReveal
              src="https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=1400&auto=format&fit=crop"
              alt="Hair by Cill salon"
              className="aspect-[4/5] w-full md:aspect-[16/11]"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
            <div className="mt-6 aspect-[3/4] w-40 md:absolute md:-bottom-14 md:-left-10 md:mt-0 md:w-56">
              <ImageReveal
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=700&auto=format&fit=crop"
                alt="Hair by Cill detail"
                className="h-full w-full shadow-2xl"
                sizes="220px"
                delay={0.15}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT — big serif typography */}
      <section className="bg-ivory px-6 py-32 md:py-48">
        <AnimatedHeading
          lines={["YOUR HAIR.", "YOUR STYLE.", "YOUR MOMENT."]}
          className="mx-auto max-w-5xl text-center font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.05]"
        />
      </section>

      {/* WHY HAIR BY CILL — numbered list, image left on desktop */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:py-48">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <ImageReveal
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop"
            alt="Hair by Cill behandeling"
            className="order-2 aspect-[4/5] w-full md:order-1"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
          <div className="order-1 md:order-2">
            <AnimatedHeading
              as="h2"
              lines={["WAAROM HAIR", "BY CILL?"]}
              className="font-display text-4xl leading-[1.02] md:text-5xl"
            />
            <NumberedList
              items={[
                "Persoonlijke aandacht",
                "Professionele producten",
                "Passie voor het vak",
                "Een resultaat dat bij jou past",
              ]}
            />
          </div>
        </div>
      </section>

      {/* SERVICES — horizontal rows, not cards */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:py-48">
        <div className="mb-16 max-w-xl">
          <SectionLabel>Services</SectionLabel>
          <AnimatedHeading
            lines={["WHAT CAN WE DO", "FOR YOUR HAIR?"]}
            className="font-display text-5xl leading-[1.02] md:text-6xl"
          />
        </div>
        <TreatmentList treatments={treatments} />
        <Reveal delay={0.2} className="mt-12">
          <Link href="/prijslijst" className="group inline-flex items-center gap-2 text-sm">
            <span className="border-b border-black/30 pb-0.5 group-hover:border-gold group-hover:text-gold-muted">
              BEKIJK DE VOLLEDIGE PRIJSLIJST
            </span>
            <span className="transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        </Reveal>
      </section>

      {/* PORTFOLIO — editorial masonry */}
      <section className="bg-soft-black px-6 py-28 text-offwhite md:py-48">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-xl">
            <AnimatedHeading
              lines={["HAIR WE'RE", "PROUD OF."]}
              className="font-display text-5xl leading-[1.02] text-offwhite md:text-6xl"
            />
          </div>
          <PortfolioGallery />
        </div>
      </section>

      <Marquee text="HAIR BY CILL • BEAUTY • CONFIDENCE • PERSONAL ATTENTION • HAIR BY CILL • BEAUTY • CONFIDENCE • PERSONAL ATTENTION •" />

      {/* REVIEWS */}
      <section className="bg-black py-28 md:py-40">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl text-offwhite md:text-5xl">
            What our clients say.
          </h2>
        </div>
        <ReviewSlider />
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:py-48">
        <div className="mb-16 max-w-xl">
          <SectionLabel>Haircare</SectionLabel>
          <AnimatedHeading
            lines={["SALON HAIR", "AT HOME."]}
            className="font-display text-5xl leading-[1.02] md:text-6xl"
          />
          <p className="mt-6 max-w-sm text-black/60">
            Behoud jouw salonresultaat langer met professionele haarverzorging.
          </p>
        </div>
        <ProductGrid products={products.slice(0, 3)} />
        <Reveal delay={0.2} className="mt-16">
          <Link href="/producten" className="group inline-flex items-center gap-2 text-sm">
            <span className="border-b border-black/30 pb-0.5 group-hover:border-gold group-hover:text-gold-muted">
              SHOP ALL PRODUCTS
            </span>
            <span className="transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        </Reveal>
      </section>

      <CTA
        lines={["READY FOR", "YOUR NEXT LOOK?"]}
        image="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1920&auto=format&fit=crop"
      />
    </>
  );
}
