import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
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
      <PageHero
        title="Laten we"
        accent="kennismaken"
        intro="Een vraag, een idee of gewoon even overleggen? Bel, mail of laat een bericht achter."
        image="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-20 md:py-28 lg:grid-cols-[2fr_3fr]">
        <Reveal className="space-y-5">
          <div className="rounded-2xl bg-black p-7 text-offwhite">
            <h2 className="text-2xl">
              Kom <span className="accent text-gold">langs</span>
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-offwhite/75">
              <li className="border-b border-offwhite/15 pb-3">{business.address}</li>
              <li className="border-b border-offwhite/15 pb-3">
                <a href={business.phoneHref} className="hover:text-gold">{business.phone}</a>
              </li>
              <li className="border-b border-offwhite/15 pb-3">
                <a href={`mailto:${business.email}`} className="hover:text-gold">{business.email}</a>
              </li>
              <li>
                <a href={business.instagram} className="hover:text-gold">@hairbycill</a>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-ivory/70 p-7">
            <h2 className="text-2xl">
              Opening<span className="accent text-gold-muted">stijden</span>
            </h2>
            <ul className="mt-5 text-sm">
              {openingHours.map((o) => (
                <li key={o.day} className="flex justify-between border-t border-black/10 py-2.5">
                  <span>{o.day}</span>
                  <span className={o.hours === "Gesloten" ? "text-black/40" : "text-gold-muted"}>{o.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-black/10 p-7 md:p-10">
          <h2 className="text-3xl">
            Stuur ons een <span className="accent text-gold-muted">bericht</span>
          </h2>
          <div className="mt-8">
            <ContactForm />
          </div>
          <div className="mt-14 border-t border-black/10 pt-10">
            <h2 className="text-2xl">
              Afspraak <span className="accent text-gold-muted">annuleren</span>
            </h2>
            <p className="mb-5 mt-2 text-xs text-black/55">Vul je boekingsnummer en e-mailadres in.</p>
            <CancelBooking />
          </div>
        </Reveal>
      </section>

      <section className="px-4 pb-20 md:px-14">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl">
          <iframe
            src={business.mapsEmbedSrc}
            width="100%"
            height="420"
            loading="lazy"
            className="border-0 sepia-[.35]"
            title="Hair by Cill op de kaart"
          />
        </div>
      </section>
    </>
  );
}
