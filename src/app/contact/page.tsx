import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";
import CancelBooking from "./CancelBooking";
import { business, openingHours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Hair by Cill of maak direct een afspraak.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:pt-52">
        <AnimatedHeading
          as="h1"
          lines={["LET'S TALK", "ABOUT YOUR HAIR."]}
          className="font-display text-5xl leading-[1.02] md:text-7xl"
        />
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:pb-48">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="mb-16">
              <h2 className="mb-6 text-xs uppercase tracking-[0.25em] text-gold-muted">Contact</h2>
              <dl className="space-y-4 text-lg">
                <div>
                  <dd>{business.address}</dd>
                </div>
                <div>
                  <dd>{business.phone}</dd>
                </div>
                <div>
                  <dd>{business.email}</dd>
                </div>
                <div>
                  <dd>@hairbycill</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="mb-6 text-xs uppercase tracking-[0.25em] text-gold-muted">
                Opening Hours
              </h2>
              <ul className="space-y-2 text-lg">
                {openingHours.map((o) => (
                  <li key={o.day} className="flex justify-between border-b border-black/10 py-2">
                    <span>{o.day}</span>
                    <span className="text-black/50">{o.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="mb-8 text-xs uppercase tracking-[0.25em] text-gold-muted">
              Contactformulier
            </h2>
            <ContactForm />
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-24 max-w-xl border-t border-black/10 pt-12">
          <h2 className="mb-6 text-xs uppercase tracking-[0.25em] text-gold-muted">
            Afspraak annuleren
          </h2>
          <CancelBooking />
        </Reveal>
      </section>

      <section className="px-6 pb-28 md:pb-40">
        <div className="mx-auto max-w-[1400px] overflow-hidden">
          <iframe
            src={business.mapsEmbedSrc}
            width="100%"
            height="480"
            loading="lazy"
            className="border-0 grayscale"
            title="Hair by Cill op de kaart"
          />
        </div>
      </section>
    </>
  );
}
