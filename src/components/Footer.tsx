import Link from "next/link";
import Logo from "./Logo";
import { business, navLinks, openingHours } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-black px-6 pt-24 pb-10 text-offwhite">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo dark className="mb-6" />
            <p className="max-w-xs text-sm text-offwhite/50">Hair that feels like you.</p>
          </div>

          <div>
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-gold">Navigatie</h3>
            <ul className="space-y-3 text-sm text-offwhite/70">
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
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-gold">Contact</h3>
            <ul className="space-y-3 text-sm text-offwhite/70">
              <li>{business.address}</li>
              <li>
                <a href={business.phoneHref} className="hover:text-gold">
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="hover:text-gold">
                  {business.email}
                </a>
              </li>
              <li>
                <a href={business.instagram} className="hover:text-gold">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-gold">Openingstijden</h3>
            <ul className="space-y-1.5 text-sm text-offwhite/70">
              {openingHours.map((o) => (
                <li key={o.day} className="flex justify-between gap-4">
                  <span>{o.day}</span>
                  <span>{o.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-offwhite/10 pt-8 text-xs text-offwhite/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hair by Cill. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <Link href="/privacybeleid" className="hover:text-gold">
              Privacybeleid
            </Link>
            <Link href="/voorwaarden" className="hover:text-gold">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
