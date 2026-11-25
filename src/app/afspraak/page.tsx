import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import CancelBooking from "@/components/CancelBooking";
import Reveal from "@/components/Reveal";
import BookingHero from "./BookingHero";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = { title: "Afspraak maken" };

export default function AfspraakPage() {
  return (
    <>
      <BookingHero />

      <section id="boeken" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16 md:px-10 md:py-24">
        <BookingWizard />
      </section>

      <section id="annuleren" className="scroll-mt-24 border-t border-black/10 bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedHeading
            lines={["Afspraak"]}
            accent="annuleren"
            className="text-4xl leading-[1.05] md:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-md text-sm text-black/60">
            Vul het e-mailadres van je boeking en je annuleringscode in. Kosteloos tot 12 uur voor je afspraak.
          </p>
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl rounded-3xl border border-black/10 bg-offwhite p-6 shadow-sm md:p-8">
          <CancelBooking />
        </Reveal>
      </section>
    </>
  );
}
