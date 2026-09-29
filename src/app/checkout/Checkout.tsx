"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { QtyStepper } from "@/components/CartDrawer";
import { DISCOUNT_CODE, WEB3FORMS_KEY } from "@/components/LaunchGate";
import { cart, cartLines, cartTotal, useCart } from "@/lib/cart";
import { business, formatEuro } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;
const DISCOUNT_RATE = 0.1; // waitlist code = 10% off

/** Short readable order number, e.g. HBC-MG4K2Q1A (called from the submit handler only). */
const orderRef = () => `HBC-${Date.now().toString(36).toUpperCase()}`;

type Done = { ref: string; total: number; name: string };

export default function Checkout() {
  const { items } = useCart();
  const lines = cartLines(items);
  const subtotal = cartTotal(items);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [code, setCode] = useState("");
  const [codeApplied, setCodeApplied] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<Done | null>(null);

  const discount = codeApplied ? Math.round(subtotal * DISCOUNT_RATE * 100) / 100 : 0;
  const total = subtotal - discount;

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
            `Totaal (betalen bij afhalen): ${formatEuro(total)}`,
            form.notes ? `Opmerking: ${form.notes}` : "",
          ].filter(Boolean).join("\n"),
        }),
      });
      const data = await res.json();
      if (!data.success) return setState("error");
      cart.clear();
      setDone({ ref, total, name: form.name.split(" ")[0] });
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
            Je bestelling <strong className="text-offwhite">{done.ref}</strong> is binnen. We zetten hem voor je klaar
            en laten je weten wanneer je hem kunt ophalen.
          </p>
          <p className="mt-6 text-sm text-offwhite/60">
            Te betalen bij afhalen: <strong className="text-gold">{formatEuro(done.total)}</strong>
            <br />
            {business.address}
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
      <p className="mt-3 text-sm text-black/55">Je haalt je bestelling op in de salon en betaalt daar, contant of met pin.</p>

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
            <legend className="mb-4 text-xl font-light">Ophalen</legend>
            <div className="rounded-2xl border border-black bg-offwhite p-5">
              <p className="font-medium">Afhalen in de salon · gratis</p>
              <p className="mt-1 text-sm text-black/60">{business.address}</p>
              <p className="mt-1 text-xs text-black/45">We laten je weten zodra je bestelling klaarstaat.</p>
            </div>
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
                <dt className="text-black/55">Afhalen</dt>
                <dd>Gratis</dd>
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
            <p className="mt-3 text-center text-[11px] text-black/45">Betalen doe je bij het ophalen in de salon.</p>
          </div>
        </aside>
      </form>
    </section>
  );
}
