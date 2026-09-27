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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-widest text-ink/50">
            Naam
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-[8px] border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-widest text-ink/50">
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-[8px] border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs uppercase tracking-widest text-ink/50">
            Telefoonnummer
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-[8px] border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne"
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-xs uppercase tracking-widest text-ink/50">
            Onderwerp
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="w-full rounded-[8px] border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-widest text-ink/50">
          Bericht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-[8px] border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-[8px] bg-champagne px-6 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-gold-light sm:w-auto"
      >
        Verstuur bericht
      </button>

      {status === "success" && (
        <p className="text-sm text-green-700">
          Bedankt! Je bericht is verstuurd, we nemen snel contact op.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700">Vul alstublieft alle verplichte velden in.</p>
      )}
    </form>
  );
}
