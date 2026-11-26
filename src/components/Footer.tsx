"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { WEB3FORMS_KEY } from "./LaunchGate";
import { BASE_PATH } from "@/lib/basePath";
import { business, products, treatments } from "@/lib/data";

// Official brand glyphs (Simple Icons, CC0).
const SOCIALS = [
  { label: "Instagram", href: business.instagram, path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" },
  { label: "TikTok", href: business.tiktok, path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
  { label: "Facebook", href: business.facebook, path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" },
];

const CAT_NL: Record<string, string> = { Shampoo: "Shampoo", Conditioner: "Conditioner", Treatment: "Haarmaskers", Styling: "Styling" };
const categories = [...new Set(products.map((p) => p.category))];

// Every link lands on a real page (treatments prefill the booking form, categories prefilter the shop).
const COLUMNS = [
  {
    title: "Salon",
    links: [
      { href: "/over-ons", label: "Over ons" },
      { href: "/prijslijst", label: "Prijslijst" },
      { href: "/blog", label: "Haartips" },
      { href: "/contact", label: "Contact & route" },
    ],
  },
  {
    title: "Behandelingen",
    links: [
      ...treatments.map((t) => ({ href: `/afspraak?treatment=${t.slug}`, label: t.name })),
      { href: "/prijslijst", label: "Alle prijzen" },
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/producten", label: "Alle producten" },
      ...categories.map((c) => ({ href: `/producten?categorie=${encodeURIComponent(c)}`, label: CAT_NL[c] ?? c })),
      { href: "/checkout", label: "Winkelwagen" },
    ],
  },
  {
    title: "Klantenservice",
    links: [
      { href: "/afspraak", label: "Afspraak maken" },
      { href: "/afspraak#annuleren", label: "Afspraak annuleren" },
      { href: "/contact", label: "Openingstijden" },
      { href: "/privacybeleid", label: "Privacybeleid" },
      { href: "/voorwaarden", label: "Algemene voorwaarden" },
    ],
  },
];

// Accepted at the salon's pin terminal and for webshop payment requests.
const PAY = [
  { file: "ideal", label: "iDEAL" },
  { file: "maestro", label: "Maestro" },
  { file: "mastercard", label: "Mastercard" },
  { file: "visa", label: "Visa" },
  { file: "applepay", label: "Apple Pay" },
  { file: "googlepay", label: "Google Pay" },
];

function Newsletter() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("busy");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: "Nieuwe aanmelding nieuwsbrief", from_name: business.name, email, message: `Nieuwsbrief-aanmelding: ${email}` }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") return <p className="mt-6 text-sm text-gold">Bedankt, je bent aangemeld.</p>;
  return (
    <form onSubmit={submit} className="mt-6">
      <label htmlFor="footer-email" className="sr-only">E-mailadres</label>
      <div className="flex items-center border-b border-offwhite/30 focus-within:border-gold">
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          placeholder="jouw@email.nl"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-offwhite placeholder:text-offwhite/45 focus:outline-none"
        />
        <button type="submit" disabled={state === "busy"} aria-label="Aanmelden" className="px-2 text-xl text-offwhite transition-colors hover:text-gold disabled:opacity-40">
          →
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-xs text-red-300">Dat lukte niet. Probeer het later opnieuw.</p>}
    </form>
  );
}

const heading = "border-b border-offwhite/15 pb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-gold";
const link = "text-sm text-offwhite/70 transition-colors hover:text-gold";

/** Dore & Rose style footer: round logo on the top edge, four link columns, newsletter panel, payment icons. */
export default function Footer() {
  return (
    <footer className="relative mt-20 bg-black text-offwhite max-md:[body:has([data-sticky-cta])_&]:pb-24">
      {/* Logo sits on the top edge, half above the footer */}
      <Link href="/" aria-label={`${business.name} home`} className="absolute left-1/2 top-0 z-10 block h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-offwhite md:h-28 md:w-28">
        <Image src={`${BASE_PATH}/icon-512.png`} alt={business.name} fill sizes="112px" className="rounded-full object-cover" />
      </Link>

      <div className="grid lg:grid-cols-[2fr_1fr]">
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-12 px-6 pb-14 pt-24 md:grid-cols-4 md:px-14 md:pt-28">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className={heading}>{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={link}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="bg-soft-black px-6 py-14 md:px-14 lg:pt-28">
          <h3 className={heading}>Blijf op de hoogte</h3>
          <p className="mt-5 text-lg leading-snug">
            Haartips, acties en nieuwe producten. <span className="accent text-gold">Als eerste</span> in je inbox.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-offwhite/55">
            Door je aan te melden ga je akkoord met e-mails van ons. Afmelden kan altijd. Lees ons{" "}
            <Link href="/privacybeleid" className="underline hover:text-gold">privacybeleid</Link>.
          </p>
          <Newsletter />

          <div className="mt-10 space-y-1.5 text-sm text-offwhite/70">
            <p>{business.address}</p>
            <p><a href={business.phoneHref} className="hover:text-gold">{business.phone}</a></p>
            <p><a href={`mailto:${business.email}`} className="hover:text-gold">{business.email}</a></p>
          </div>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${business.name} op ${s.label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/15 transition-colors hover:border-gold hover:bg-gold hover:text-black"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-offwhite/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:pl-14 md:pr-28">
        <p className="text-xs uppercase tracking-[0.15em] text-offwhite/50">© {new Date().getFullYear()} {business.name}</p>
        <ul aria-label="Betaalmethoden" className="flex flex-wrap gap-2">
          {PAY.map((p) => (
            <li key={p.file} className="flex h-8 w-12 items-center justify-center rounded-md bg-white px-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE_PATH}/pay/${p.file}.svg`} alt={p.label} title={p.label} className="max-h-5 w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
