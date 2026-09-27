import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";
import { business, openingHours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Hair by Cill of maak direct een afspraak.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink px-6 pb-16 pt-28 text-center text-bone">
        <Reveal>
          <h1 className="font-display text-5xl md:text-6xl">Let&apos;s talk hair</h1>
          <p className="mt-4 text-bone/70">Een vraag of klaar voor een nieuwe look?</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl">Hair by Cill</h2>
            <dl className="mt-6 space-y-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-widest text-champagne">Adres</dt>
                <dd className="mt-1 text-ink/70">{business.address}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-champagne">Telefoon</dt>
                <dd className="mt-1 text-ink/70">{business.phone}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-champagne">E-mail</dt>
                <dd className="mt-1 text-ink/70">{business.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-champagne">Instagram</dt>
                <dd className="mt-1 text-ink/70">@hairbycill</dd>
              </div>
            </dl>

            <h3 className="mt-10 font-display text-xl">Openingstijden</h3>
            <ul className="mt-4 space-y-1 text-sm">
              {openingHours.map((o) => (
                <li key={o.day} className="flex justify-between border-b border-ink/10 py-2">
                  <span>{o.day}</span>
                  <span className="text-ink/60">{o.hours}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={business.phoneHref}
                className="rounded-[8px] border border-champagne/60 px-5 py-2.5 text-sm hover:border-champagne hover:text-champagne"
              >
                Bel ons
              </a>
              <a
                href={business.whatsappHref}
                className="rounded-[8px] border border-champagne/60 px-5 py-2.5 text-sm hover:border-champagne hover:text-champagne"
              >
                WhatsApp
              </a>
              <a
                href={business.instagram}
                className="rounded-[8px] border border-champagne/60 px-5 py-2.5 text-sm hover:border-champagne hover:text-champagne"
              >
                Instagram
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[10px]">
          <iframe
            src={business.mapsEmbedSrc}
            width="100%"
            height="400"
            loading="lazy"
            className="border-0"
            title="Hair by Cill op de kaart"
          />
        </div>
      </section>
    </>
  );
}
