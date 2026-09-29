import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import CancelBooking from "@/components/CancelBooking";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = { title: "Afspraak maken" };

export default function AfspraakPage() {
  return (
    <>
      <PageHero
        title="Maak een"
        accent="afspraak"
        intro="Kies je behandeling, stylist en een moment dat jou uitkomt. Binnen een minuut geregeld."
        image="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <BookingWizard />
      </section>

      <section id="annuleren" className="scroll-mt-24 bg-black px-6 pt-20 text-offwhite md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedHeading
            lines={["Afspraak"]}
            accent="annuleren"
            className="text-4xl leading-[1.05] md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-md text-sm text-offwhite/60">
            Vul het e-mailadres van je boeking en je annuleringscode in. Kosteloos tot 12 uur voor je afspraak.
          </p>
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <CancelBooking dark />
        </Reveal>
        {/* Gold divider between the cancel section and the footer */}
        <div aria-hidden className="mx-auto mt-20 h-px max-w-6xl bg-gradient-to-r from-transparent via-gold to-transparent md:mt-28" />
      </section>
    </>
  );
}
