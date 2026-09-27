import Link from "next/link";
import Logo from "./Logo";
import { business, navLinks, openingHours } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <Logo className="mb-4" />
          <p className="text-sm text-bone/60">Luxury hair, made personal.</p>
          <div className="mt-6 flex gap-4">
            <a href={business.instagram} className="text-sm text-bone/70 hover:text-champagne">
              Instagram
            </a>
            <a href={business.facebook} className="text-sm text-bone/70 hover:text-champagne">
              Facebook
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-champagne">Navigatie</h3>
          <ul className="space-y-2 text-sm text-bone/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-champagne">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-champagne">Contact</h3>
          <ul className="space-y-2 text-sm text-bone/70">
            <li>{business.address}</li>
            <li>
              <a href={business.phoneHref} className="hover:text-champagne">
                {business.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-champagne">
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-champagne">Openingstijden</h3>
          <ul className="space-y-1 text-sm text-bone/70">
            {openingHours.map((o) => (
              <li key={o.day} className="flex justify-between gap-4">
                <span>{o.day}</span>
                <span>{o.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bone/50">
          <p>© {new Date().getFullYear()} Hair by Cill. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <Link href="/privacybeleid" className="hover:text-champagne">
              Privacybeleid
            </Link>
            <Link href="/voorwaarden" className="hover:text-champagne">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
