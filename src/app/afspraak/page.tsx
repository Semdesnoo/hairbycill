import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = { title: "Afspraak maken" };

export default function AfspraakPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-28 md:pb-32 md:pt-36">
      <AnimatedHeading
        as="h1"
        lines={["MAAK EEN", "AFSPRAAK."]}
        className="font-display text-5xl leading-[1.02] md:text-6xl"
      />
      <p className="mt-6 max-w-lg text-black/60">
        Kies je behandeling, stylist en een moment dat jou uitkomt. Annuleren kan tot 12 uur van
        tevoren via de contactpagina.
      </p>
      <div className="mt-12">
        <BookingWizard />
      </div>
    </section>
  );
}
