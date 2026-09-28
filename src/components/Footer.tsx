import Link from "next/link";
import Logo from "./Logo";
import { business, navLinks, openingHours } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-6 pt-20 pb-8 text-offwhite">
      <div className="relative z-10 mx-auto max-w-[1300px]">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-offwhite/60">
              Wij geloven dat mooi haar geen haast kent. Het is iets wat je samen opbouwt, afspraak
              na afspraak.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { href: business.instagram, label: "Instagram", short: "IG" },
                { href: business.facebook, label: "Facebook", short: "f" },
                { href: business.whatsappHref, label: "WhatsApp", short: "WA" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-offwhite/10 text-xs transition-colors hover:bg-gold hover:text-black"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm text-offwhite">Navigatie</h3>
            <ul className="space-y-2.5 text-sm text-offwhite/60">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm text-offwhite">Overig</h3>
            <ul className="space-y-2.5 text-sm text-offwhite/60">
              <li><Link href="/privacybeleid" className="hover:text-gold">Privacybeleid</Link></li>
              <li><Link href="/voorwaarden" className="hover:text-gold">Voorwaarden</Link></li>
              <li><a href={business.phoneHref} className="hover:text-gold">{business.phone}</a></li>
              <li><a href={`mailto:${business.email}`} className="hover:text-gold">{business.email}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm text-offwhite">Openingstijden</h3>
            <ul className="space-y-1.5 text-sm text-offwhite/60">
              {openingHours.map((o) => (
                <li key={o.day} className="flex justify-between gap-4 border-b border-offwhite/10 pb-1.5">
                  <span>{o.day}</span>
                  <span>{o.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="accent pointer-events-none mt-16 select-none text-center text-[clamp(4rem,17vw,15rem)] leading-[0.8] text-offwhite/[0.07]"
        >
          Hair by Cill
        </p>

        <div className="mt-6 flex flex-col gap-3 text-xs text-offwhite/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}. Alle rechten voorbehouden.</p>
          <p>{business.address}</p>
        </div>
      </div>
    </footer>
  );
}
