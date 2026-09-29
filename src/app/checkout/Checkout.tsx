"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { QtyStepper } from "@/components/CartDrawer";
import { DISCOUNT_CODE, WEB3FORMS_KEY } from "@/components/LaunchGate";
import { cart, cartLines, cartTotal, useCart } from "@/lib/cart";
import { business, formatEuro, SHIPPING, shippingCost } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;
const DISCOUNT_RATE = 0.1; // waitlist code = 10% off

/** Short readable order number, e.g. HBC-MG4K2Q1A (called from the submit handler only). */
const orderRef = () => `HBC-${Date.now().toString(36).toUpperCase()}`;

type Method = "pickup" | "delivery";
type Done = { ref: string; total: number; name: string; method: Method };

export default function Checkout() {
  const { items } = useCart();
  const lines = cartLines(items);
  const subtotal = cartTotal(items);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [method, setMethod] = useState<Method>("pickup");
  const [addr, setAddr] = useState({ street: "", number: "", postcode: "", city: "" });
  const [code, setCode] = useState("");
  const [codeApplied, setCodeApplied] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<Done | null>(null);

  const discount = codeApplied ? Math.round(subtotal * DISCOUNT_RATE * 100) / 100 : 0;
  const delivery = method === "delivery";
  const shipping = delivery ? shippingCost(subtotal - discount) : 0;
  const total = subtotal - discount + shipping;

  function applyCode() {
    const ok = code.trim().toUpperCase() === DISCOUNT_CODE;
    setCodeApplied(ok);
    setCodeError(!ok);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const ref = orderRef();
    const order = lines.map((l) => `${l.qty}x ${l.product.brand} ${l.product.name} (${l.product.volume}) = ${formatEuro(l.total)}`).join("\n");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nieuwe bestelling ${ref}: ${formatEuro(total)}`,
          from_name: "Webshop hairbycill.nl",
          replyto: form.email,
          email: form.email,
          name: form.name,
          phone: form.phone,
          message: [
            `Bestelling ${ref}`,
            order,
            `Subtotaal: ${formatEuro(subtotal)}`,
            codeApplied ? `Kortingscode ${DISCOUNT_CODE}: -${formatEuro(discount)}` : "Geen kortingscode",
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
      const data = await res.json();
      if (!data.success) return setState("error");
      cart.clear();
      setDone({ ref, total, name: form.name.split(" ")[0], method });
    } catch {
      setState("error");
    }
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
                    shippingCost(subtotal - discount)
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
                    ["number", "Huisnummer", "off"],
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

            <div className="mt-6 flex gap-2">
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setCodeError(false);
                }}
                placeholder="Kortingscode"
                aria-label="Kortingscode"
                className="min-w-0 flex-1 rounded-full border border-black/15 bg-offwhite px-4 py-2.5 text-sm uppercase focus:border-black focus:outline-none"
              />
              <button type="button" onClick={applyCode} className="rounded-full border border-black px-4 text-sm hover:bg-black hover:text-offwhite">
                Toepassen
              </button>
            </div>
            {codeError && <p className="mt-2 text-xs text-red-700">Deze code is niet geldig.</p>}
            {codeApplied && <p className="mt-2 text-xs text-gold-muted">Code {DISCOUNT_CODE} toegepast: 10% korting.</p>}

            <dl className="mt-6 space-y-2 border-t border-black/10 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-black/55">Subtotaal</dt>
                <dd>{formatEuro(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-gold-muted">
                  <dt>Korting</dt>
                  <dd>-{formatEuro(discount)}</dd>
                </div>
              )}
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
                Er ging iets mis. Probeer het opnieuw of bel ons.
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
