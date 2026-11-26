"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { WEB3FORMS_KEY } from "@/components/LaunchGate";
import { cart, cartLines, cartTotal, useCart } from "@/lib/cart";
import { createOrder, OutOfStockError } from "@/lib/bookingApi";
import { business, euroToNumber, formatEuro, SHIPPING, shippingCost } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

type Method = "pickup" | "delivery";
type Done = { ref: string; total: number; name: string; method: Method };

/** Shopify-style input: rectangular, label inside as placeholder. */
function Field({
  label,
  value,
  onChange,
  className = "",
  ...rest
}: { label: string; value: string; onChange: (v: string) => void; className?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <input
        {...rest}
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm placeholder:text-black/45 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
      />
    </label>
  );
}

export default function Checkout() {
  const { items } = useCart();
  const lines = cartLines(items);
  const subtotal = cartTotal(items);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [method, setMethod] = useState<Method>("delivery");
  const [addr, setAddr] = useState({ street: "", number: "", postcode: "", city: "" });
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [stockError, setStockError] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const delivery = method === "delivery";
  const shipping = delivery ? shippingCost(subtotal) : 0;
  const total = subtotal + shipping;
  const saved = lines.reduce((s, l) => s + euroToNumber(l.product.oldPrice ?? l.product.price) * l.qty - l.total, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setStockError("");
    // 1. Order + stock in the database (server recomputes prices, the dashboard shows it live).
    let ref: string;
    let serverTotal: number;
    try {
      ({ ref, total: serverTotal } = await createOrder({
        items: items.map(({ slug, qty }) => ({ slug, qty })),
        name: form.name, email: form.email, phone: form.phone, method,
        street: addr.street, number: addr.number, postcode: addr.postcode, city: addr.city,
        notes: form.notes,
      }));
    } catch (e) {
      if (e instanceof OutOfStockError) setStockError(`Sorry, van ${e.message} hebben we niet genoeg meer op voorraad. Pas het aantal aan.`);
      return setState("error");
    }
    // 2. Mail to the salon: best effort, the order is already safe in the dashboard.
    const order = lines.map((l) => `${l.qty}x ${l.product.brand} ${l.product.name} (${l.product.volume}) = ${formatEuro(l.total)}`).join("\n");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nieuwe bestelling ${ref}: ${formatEuro(serverTotal)}`,
          from_name: "Webshop hairbycill.nl",
          replyto: form.email,
          email: form.email,
          name: form.name,
          phone: form.phone,
          message: [
            `Bestelling ${ref}`,
            order,
            `Subtotaal: ${formatEuro(subtotal)}`,
            delivery
              ? [
                  `BEZORGEN naar: ${addr.street} ${addr.number}, ${addr.postcode.toUpperCase()} ${addr.city}`,
                  `Verzendkosten: ${shipping ? formatEuro(shipping) : "gratis"}`,
                  `Totaal: ${formatEuro(total)} (stuur de klant een betaalverzoek, verzenden na betaling)`,
                ].join("\n")
              : `AFHALEN in de salon. Totaal (betalen bij afhalen): ${formatEuro(total)}`,
            form.notes ? `Opmerking: ${form.notes}` : "",
          ].filter(Boolean).join("\n"),
        }),
      });
      await res.json();
    } catch {}
    cart.clear();
    setDone({ ref, total: serverTotal, name: form.name.split(" ")[0], method });
  }

  if (done) {
    return (
      <section className="flex min-h-[80svh] items-center justify-center px-6 pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease }}
          className="w-full max-w-xl rounded-3xl bg-black p-10 text-center text-offwhite md:p-14"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-2xl text-black">✓</div>
          <h1 className="mt-6 text-4xl font-light">
            Bedankt, <span className="accent text-gold">{done.name}</span>
          </h1>
          <p className="mt-4 text-offwhite/70">
            Je bestelling <strong className="text-offwhite">{done.ref}</strong> is binnen.{" "}
            {done.method === "delivery"
              ? "Je ontvangt van ons een betaalverzoek. Zodra dat betaald is, versturen we je pakket."
              : "We zetten hem voor je klaar en laten je weten wanneer je hem kunt ophalen."}
          </p>
          <p className="mt-6 text-sm text-offwhite/60">
            {done.method === "delivery" ? "Totaal incl. verzending" : "Te betalen bij afhalen"}:{" "}
            <strong className="text-gold">{formatEuro(done.total)}</strong>
            {done.method === "pickup" && (
              <>
                <br />
                {business.address}
              </>
            )}
          </p>
          <Link href="/producten" className="mt-8 inline-block rounded-full bg-offwhite px-7 py-3 text-sm text-black hover:bg-gold">
            Verder winkelen
          </Link>
        </motion.div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="flex min-h-[70svh] flex-col items-center justify-center gap-5 px-6 pb-20 pt-32 text-center">
        <h1 className="text-4xl font-light">
          Je winkelwagen is <span className="accent text-gold-muted">leeg</span>
        </h1>
        <Link href="/producten" className="rounded-full bg-black px-7 py-3 text-sm text-offwhite hover:bg-gold hover:text-black">
          Bekijk producten
        </Link>
      </section>
    );
  }

  const summary = (
    <>
      <ul className="space-y-4">
        {lines.map(({ product, qty, total: lt }) => (
          <li key={product.slug} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-lg border border-black/10 bg-white">
              <Image src={product.image} alt={product.name} fill sizes="64px" className="rounded-lg object-cover" />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-medium text-offwhite">
                {qty}
              </span>
            </div>
            <div className="min-w-0 flex-1 text-sm">
              <p className="truncate font-medium">{product.name}</p>
              <p className="text-xs text-black/55">
                {product.brand} · {product.volume}
              </p>
            </div>
            <span className="text-sm">{formatEuro(lt)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>Subtotaal · {count} {count === 1 ? "artikel" : "artikelen"}</dt>
          <dd>{formatEuro(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>{delivery ? "Verzending" : "Afhalen in de salon"}</dt>
          <dd>{shipping ? formatEuro(shipping) : "Gratis"}</dd>
        </div>
        <div className="flex items-baseline justify-between pt-3">
          <dt className="text-lg font-semibold">Totaal</dt>
          <dd className="text-lg font-semibold">
            <span className="mr-2 text-xs font-normal text-black/55">EUR</span>
            {formatEuro(total)}
          </dd>
        </div>
        {saved > 0.004 && (
          <div className="flex items-center gap-2 pt-1 font-semibold">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3 12V4h8l10 10-8 8L3 12Zm5-5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
            Totale besparing {formatEuro(saved)}
          </div>
        )}
      </dl>
    </>
  );

  const heading = "mb-3 text-xl font-semibold";

  return (
    <section className="pt-20 md:pt-24">
      {/* Mobile: collapsible order summary bar (Shopify) */}
      <div className="border-b border-black/10 bg-[#f5f5f5] lg:hidden">
        <button type="button" onClick={() => setSummaryOpen((o) => !o)} aria-expanded={summaryOpen} className="flex w-full items-center justify-between px-5 py-4 text-sm">
          <span className="flex items-center gap-1.5 text-gold-muted">
            {summaryOpen ? "Verberg" : "Toon"} besteloverzicht
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={summaryOpen ? "rotate-180" : ""} aria-hidden>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
          <span className="text-base font-semibold">{formatEuro(total)}</span>
        </button>
        {summaryOpen && <div className="px-5 pb-6">{summary}</div>}
      </div>

      <form onSubmit={submit} className="grid lg:min-h-[calc(100svh-6rem)] lg:grid-cols-2">
        {/* LEFT: form */}
        <div className="bg-white px-5 py-10 lg:flex lg:justify-end lg:border-r lg:border-black/10 lg:px-14">
          <div className="w-full max-w-[560px] space-y-10">
            <nav aria-label="Stappen" className="flex flex-wrap items-center gap-2 text-xs text-black/55">
              <Link href="/producten" className="text-gold-muted hover:underline">
                Winkelwagen
              </Link>
              <span>›</span>
              <span className="font-medium text-black">Gegevens</span>
              <span>›</span>
              <span>Bevestiging</span>
            </nav>

            <fieldset>
              <legend className={heading}>Contact</legend>
              <div className="space-y-3">
                <Field label="E-mailadres *" type="email" pattern={"[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}"} title="Bijvoorbeeld naam@gmail.com" autoComplete="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Field label="Telefoonnummer *" type="tel" pattern={"(\\D*\\d){10,}\\D*"} title="Minimaal 10 cijfers" autoComplete="tel" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              </div>
            </fieldset>

            <fieldset>
              <legend className={heading}>Bezorging</legend>
              <div role="radiogroup" aria-label="Afhalen of bezorgen" className="overflow-hidden rounded-2xl border border-black/20">
                {(
                  [
                    ["delivery", "Thuisbezorgen", "Binnen 2-4 werkdagen in huis (NL)", shippingCost(subtotal) ? formatEuro(SHIPPING.cost) : "Gratis"],
                    ["pickup", "Afhalen in de salon", business.address, "Gratis"],
                  ] as const
                ).map(([value, title, sub, price], i) => {
                  const active = method === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setMethod(value)}
                      className={`flex w-full items-center gap-3 px-4 py-4 text-left text-sm transition-colors ${i ? "border-t border-black/20" : ""} ${
                        active ? "rounded-2xl bg-gold/10 outline outline-1 -outline-offset-1 outline-black" : "hover:bg-black/[0.02]"
                      }`}
                    >
                      <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${active ? "border-black bg-black" : "border-black/30"}`}>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{title}</span>
                        <span className="block text-xs text-black/55">{sub}</span>
                      </span>
                      <span className="font-medium">{price}</span>
                    </button>
                  );
                })}
              </div>
              {delivery && shippingCost(subtotal) > 0 && (
                <p className="mt-2 text-xs text-black/55">Nog {formatEuro(SHIPPING.freeFrom - subtotal)} tot gratis verzending.</p>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Field label="Voor- en achternaam *" autoComplete="name" required minLength={2} className="col-span-2" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                {delivery && (
                  <>
                    <Field label="Straat *" autoComplete="address-line1" required value={addr.street} onChange={(v) => setAddr({ ...addr, street: v })} />
                    <Field label="Huisnummer *" autoComplete="address-line2" required value={addr.number} onChange={(v) => setAddr({ ...addr, number: v })} />
                    <Field
                      label="Postcode *"
                      autoComplete="postal-code"
                      required
                      // Dutch postcode, e.g. 3161 CD
                      pattern={"\\s*[1-9][0-9]{3}\\s?[A-Za-z]{2}\\s*"}
                      title="Bijvoorbeeld 3161 CD"
                      value={addr.postcode}
                      onChange={(v) => setAddr({ ...addr, postcode: v })}
                    />
                    <Field label="Plaats *" autoComplete="address-level2" required value={addr.city} onChange={(v) => setAddr({ ...addr, city: v })} />
                  </>
                )}
                <Field label="Opmerking *" autoComplete="off" required className="col-span-2" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} />
              </div>
            </fieldset>

            <fieldset>
              <legend className={heading}>Betaling</legend>
              <p className="-mt-1 mb-3 text-xs text-black/55">Alle transacties zijn beveiligd.</p>
              <div className="rounded-2xl border border-black bg-gold/10 px-5 py-4 text-sm">
                <p className="font-medium">{delivery ? "Betaalverzoek (iDEAL, Tikkie)" : "Betalen bij afhalen"}</p>
                <p className="mt-1 text-xs text-black/60">
                  {delivery
                    ? "Na je bestelling ontvang je een betaalverzoek. Zodra het betaald is, versturen we je pakket."
                    : "Je betaalt in de salon met pin of contant wanneer je je bestelling ophaalt."}
                </p>
              </div>
            </fieldset>

            <div>
              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full rounded-full bg-black py-4 text-base font-semibold text-offwhite transition-colors hover:bg-gold hover:text-black disabled:opacity-50"
              >
                {state === "sending" ? "Even geduld..." : `Bestelling plaatsen · ${formatEuro(total)}`}
              </button>
              {state === "error" && (
                <p role="alert" className="mt-3 text-sm text-red-700">
                  {stockError || "Er ging iets mis. Probeer het opnieuw of bel ons."}
                </p>
              )}
              <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t border-black/10 pt-4 text-xs text-gold-muted">
                <Link href="/voorwaarden" className="hover:underline">
                  Voorwaarden
                </Link>
                <Link href="/privacybeleid" className="hover:underline">
                  Privacybeleid
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: order summary (desktop), grey panel to the edge */}
        <aside className="hidden bg-[#f5f5f5] px-14 py-10 lg:block">
          <div className="sticky top-28 max-w-[440px]">{summary}</div>
        </aside>
      </form>
    </section>
  );
}
