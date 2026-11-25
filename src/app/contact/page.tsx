import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";
import CancelBooking from "@/components/CancelBooking";
import { business, openingHours } from "@/lib/data";
import { BASE_PATH } from "@/lib/basePath";

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
        image={`${BASE_PATH}/img/spiegel.jpg`}
        portrait
      />

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-8 pt-20 md:py-28 lg:grid-cols-[2fr_3fr]">
        <Reveal className="flex flex-col gap-5">
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
          <div className="flex-1 rounded-2xl bg-ivory p-7">
            <h2 className="text-2xl">
              Opening<span className="accent text-gold-muted">stijden</span>
            </h2>
            <ul className="mt-5 text-sm">
              {openingHours.map((o) => (
                <li key={o.day} className="flex justify-between border-t border-black/10 py-2.5">
                  <span>{o.day}</span>
                  <span className={`text-right ${o.hours === "Gesloten" ? "text-black/40" : "text-gold-muted"}`}>
                    {o.hours.split(" & ").map((h) => (
                      <span key={h} className="block">{h}</span>
                    ))}
                  </span>
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
            <p className="mb-5 mt-2 text-xs text-black/55">Vul je e-mailadres en de annuleringscode uit je bevestiging in.</p>
            <CancelBooking />
          </div>
        </Reveal>
      </section>

      <section className="px-4 pb-20 md:px-14">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
          <iframe
            src={business.mapsEmbedSrc}
            width="100%"
            height="420"
            loading="lazy"
            className="border-0 grayscale"
            title="Hair by Cill op de kaart"
          />
        </div>
      </section>
    </>
  );
}
