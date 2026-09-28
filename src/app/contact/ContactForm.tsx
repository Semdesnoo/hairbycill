"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // ponytail: no backend wired yet — swap for a real endpoint (Formspree/API route) when ready.
    const form = e.currentTarget;
    const required = ["name", "email", "message"];
    const ok = required.every((n) => (form.elements.namedItem(n) as HTMLInputElement)?.value.trim());
    setStatus(ok ? "success" : "error");
    if (ok) form.reset();
  }

  const fieldClass =
    "w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none focus:border-gold";
  const labelClass = "mb-1.5 block text-xs text-black/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Naam
          </label>
          <input id="name" name="name" type="text" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefoon
          </label>
          <input id="phone" name="phone" type="tel" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="subject" className={labelClass}>
            Onderwerp
          </label>
          <input id="subject" name="subject" type="text" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Bericht
        </label>
        <textarea id="message" name="message" rows={4} required className={fieldClass} />
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-3 text-sm text-offwhite transition-colors hover:bg-gold hover:text-black"
      >
        Verstuur bericht
        <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </button>

      {status === "success" && (
        <p className="text-sm text-green-700">
          Bedankt! Je bericht is verstuurd, we nemen snel contact op.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700">Vul alle verplichte velden in.</p>
      )}
    </form>
  );
}
