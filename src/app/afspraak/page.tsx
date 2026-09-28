import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookingWizard from "./BookingWizard";

export const metadata: Metadata = { title: "Afspraak maken" };

export default function AfspraakPage() {
  return (
    <>
      <PageHero
        title="Maak een"
        accent="afspraak"
        intro="Kies je behandeling, stylist en een moment dat jou uitkomt. Annuleren kan tot 12 uur van tevoren via de contactpagina."
        image="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1920&auto=format&fit=crop"
      />
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <BookingWizard />
      </section>
    </>
  );
}
