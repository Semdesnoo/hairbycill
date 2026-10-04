"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { QtyStepper } from "@/components/CartDrawer";
import { WEB3FORMS_KEY } from "@/components/LaunchGate";
import { cart, cartLines, cartTotal, useCart } from "@/lib/cart";
import { createOrder, OutOfStockError } from "@/lib/bookingApi";
import { business, formatEuro, SHIPPING, shippingCost } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

type Method = "pickup" | "delivery";
type Done = { ref: string; total: number; name: string; method: Method };

export default function Checkout() {
  const { items } = useCart();
  const lines = cartLines(items);
  const subtotal = cartTotal(items);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [method, setMethod] = useState<Method>("pickup");
  const [addr, setAddr] = useState({ street: "", number: "", postcode: "", city: "" });
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [stockError, setStockError] = useState("");
  const [done, setDone] = useState<Done | null>(null);

  const delivery = method === "delivery";
  const shipping = delivery ? shippingCost(subtotal) : 0;
  const total = subtotal + shipping;

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

  const field = "w-full rounded-full border border-black/15 bg-offwhite px-5 py-3 text-sm focus:border-black focus:outline-none";

  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-32 md:pt-40">
      <h1 className="text-4xl font-light md:text-5xl">
        <span className="accent text-gold-muted">Afrekenen</span>
      </h1>
      <p className="mt-3 text-sm text-black/55">Haal je bestelling op in de salon of laat hem thuisbezorgen.</p>

      <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        <div className="space-y-8">
          <fieldset>
            <legend className="mb-4 text-xl font-light">Jouw gegevens</legend>
            <div className="grid gap-4 md:grid-cols-2">
              {(
                [
                  ["name", "Naam", "text", "name", true],
                  ["email", "E-mailadres", "email", "email", true],
                  ["phone", "Telefoon", "tel", "tel", true],
                  ["notes", "Opmerking (optioneel)", "text", "off", false],
                ] as const
              ).map(([key, label, type, ac, required]) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block text-xs text-black/55">{label}</span>
                  <input
                    type={type}
                    autoComplete={ac}
                    required={required}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className={field}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 text-xl font-light">Afhalen of bezorgen</legend>
            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Afhalen of bezorgen">
              {(
                [
                  ["pickup", "Afhalen in de salon", "Gratis · betalen in de salon", business.address],
                  [
                    "delivery",
                    "Thuisbezorgen",
                    shippingCost(subtotal)
                      ? `${formatEuro(SHIPPING.cost)} · gratis vanaf ${formatEuro(SHIPPING.freeFrom)}`
                      : "Gratis bezorging",
                    "Binnen 2-4 werkdagen in huis (NL)",
                  ],
                ] as const
              ).map(([value, title, price, sub]) => {
                const active = method === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMethod(value)}
                    className={`rounded-2xl border p-5 text-left transition-colors ${
                      active ? "border-black bg-offwhite shadow-md shadow-black/5" : "border-black/15 hover:border-black/40"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${active ? "border-black" : "border-black/30"}`}>
                        {active && <span className="h-2 w-2 rounded-full bg-black" />}
                      </span>
                      {title}
                    </span>
                    <span className="mt-1 block text-sm text-gold-muted">{price}</span>
                    <span className="mt-1 block text-xs text-black/50">{sub}</span>
                  </button>
                );
              })}
            </div>

            {delivery && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="mt-5 grid gap-4 md:grid-cols-[1fr_160px]"
              >
                {(
                  [
                    ["street", "Straat", "address-line1"],
                    ["number", "Huisnummer", "address-line2"],
                    ["postcode", "Postcode", "postal-code"],
                    ["city", "Plaats", "address-level2"],
                  ] as const
                ).map(([key, label, ac]) => (
                  <label key={key} className="block">
                    <span className="mb-1.5 block text-xs text-black/55">{label}</span>
                    <input
                      required
                      autoComplete={ac}
                      // Dutch postcode, e.g. 3161 CD
                      pattern={key === "postcode" ? "\\s*[1-9][0-9]{3}\\s?[A-Za-z]{2}\\s*" : undefined}
                      title={key === "postcode" ? "Bijvoorbeeld 3161 CD" : undefined}
                      value={addr[key]}
                      onChange={(e) => setAddr({ ...addr, [key]: e.target.value })}
                      className={field}
                    />
                  </label>
                ))}
                <p className="text-xs text-black/50 md:col-span-2">
                  Je ontvangt na je bestelling een betaalverzoek. We versturen je pakket zodra het betaald is.
                </p>
              </motion.div>
            )}
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-ivory p-7">
            <p className="text-xl font-light">
              Jouw <span className="accent text-gold-muted">bestelling</span>
            </p>
            <ul className="mt-5 space-y-4">
              {lines.map(({ product, qty, total: lt }) => (
                <li key={product.slug} className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-offwhite">
                    <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col text-sm">
                    <span className="leading-tight">{product.name}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <QtyStepper slug={product.slug} qty={qty} />
                      <span>{formatEuro(lt)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2 border-t border-black/10 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-black/55">Subtotaal</dt>
                <dd>{formatEuro(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/55">{delivery ? "Verzending" : "Afhalen"}</dt>
                <dd>{shipping ? formatEuro(shipping) : "Gratis"}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-black/10 pt-3">
                <dt>Totaal</dt>
                <dd className="text-2xl">{formatEuro(total)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-6 w-full rounded-xl bg-black py-4 text-sm uppercase tracking-wider text-offwhite transition-colors hover:bg-gold hover:text-black disabled:opacity-50"
            >
              {state === "sending" ? "Even geduld..." : `Bestelling plaatsen · ${formatEuro(total)}`}
            </button>
            {state === "error" && (
              <p role="alert" className="mt-3 text-sm text-red-700">
                {stockError || "Er ging iets mis. Probeer het opnieuw of bel ons."}
              </p>
            )}
            <p className="mt-3 text-center text-[11px] text-black/45">
              {delivery ? "Je ontvangt een betaalverzoek, daarna versturen we." : "Betalen doe je bij het ophalen in de salon."}
            </p>
          </div>
        </aside>
      </form>
    </section>
  );
}
