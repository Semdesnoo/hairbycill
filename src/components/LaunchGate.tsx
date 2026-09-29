"use client";

import HeroVideo from "@/components/HeroVideo";
import { ReactNode, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { BASE_PATH } from "@/lib/basePath";
import { business } from "@/lib/data";

// Pre-launch gate: visitors only see the waitlist. Owners unlock the real site with the login code
// (lock button bottom-left of the waitlist); remembered in this browser, ?preview=uit locks it again.
// ponytail: client-side check on a static site, so it hides the site from normal visitors but is not
// real security (the pages ship in the JS bundle). Real auth needs the backend. Launch = PRELAUNCH false.
const PRELAUNCH = true;
// SHA-256 of the login code (the code itself is not in the bundle). New code: sha256 hex of it.
const LOGIN_HASH = "56d00a287aaccb6cfbb52c335a41c3ed330f5c909fd6b030275c4ce654f873ae";
const PREVIEW_KEY = "hbc_preview";

// Web3Forms access key (public by design, it only lets you SEND to the owner's inbox).
// Get it at https://web3forms.com with the owner's email address; paste it here.
export const WEB3FORMS_KEY = "3ce21fd0-5daf-42fc-a05e-349ee2b5931c";

// Discount mail to the subscriber via EmailJS (free: 200/month), sent from info@hairbycill.nl
// over Mijndomein SMTP. Template = docs/emailjs-welkomstmail.html (welcome + discount code, one mail). Empty ids = step skipped,
// the signup itself (Web3Forms) still works.
const EMAILJS = { service: "service_ana3dki", template: "template_k80f7zl", publicKey: "nPF3Dcdcmjpvhe8SO" };
export const DISCOUNT_CODE = "HAIRBYCILL2026";

/** "28 november 2026": discount deadline, 2 months after signup. */
export function validUntil(from = new Date()): string {
  const d = new Date(from);
  d.setMonth(d.getMonth() + 2);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

const ease = [0.16, 1, 0.3, 1] as const;
const noop = () => () => {};

function readPreview(): boolean {
  if (new URLSearchParams(window.location.search).get("preview") === "uit") localStorage.removeItem(PREVIEW_KEY);
  return localStorage.getItem(PREVIEW_KEY) === "1";
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Small lock button bottom-left of the waitlist; opens a code field for the salon team. */
function OwnerLogin() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [wrong, setWrong] = useState(false);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    if ((await sha256(code.trim())) !== LOGIN_HASH) return setWrong(true);
    localStorage.setItem(PREVIEW_KEY, "1");
    window.location.reload();
  }

  return (
    <div className="absolute bottom-5 left-4 z-20 md:bottom-7 md:left-8">
      {open && (
        <motion.form
          onSubmit={unlock}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="absolute bottom-12 left-0 w-64 rounded-2xl border border-gold/30 bg-black/80 p-4 backdrop-blur-md"
        >
          <label htmlFor="owner-code" className="block text-xs text-offwhite/70">
            Inlogcode voor de salon
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="owner-code"
              type="password"
              autoFocus
              autoComplete="current-password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setWrong(false);
              }}
              className="min-w-0 flex-1 rounded-full border border-offwhite/20 bg-transparent px-4 py-2 text-sm text-offwhite focus:border-gold focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-gold px-4 text-sm text-black transition-colors hover:bg-offwhite">
              Open
            </button>
          </div>
          {wrong && (
            <p role="alert" className="mt-2 text-xs text-red-300">
              Onjuiste code.
            </p>
          )}
        </motion.form>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Inloggen voor de salon"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 bg-black/30 text-offwhite/60 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </button>
    </div>
  );
}

export default function LaunchGate({ children }: { children: ReactNode }) {
  // Server snapshot = gated, so the static HTML every visitor (and crawler) gets is the waitlist.
  const preview = useSyncExternalStore(noop, readPreview, () => false);
  if (!PRELAUNCH || preview) return <>{children}</>;
  return <Waitlist />;
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("botcheck")) return; // honeypot: bots fill hidden fields
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Nieuwe aanmelding wachtlijst Hair by Cill",
          from_name: "Wachtlijst hairbycill.nl",
          email,
          message: `${email} wil 10% openingskorting en een bericht zodra Hair by Cill opent.`,
        }),
      });
      const data = await res.json();
      if (!data.success) return setState("error");
      // The signup is in; a failed discount mail must not show an error to the visitor.
      if (EMAILJS.service) {
        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS.service,
            template_id: EMAILJS.template,
            user_id: EMAILJS.publicKey,
            template_params: { to_email: email, code: DISCOUNT_CODE, valid_until: validUntil() },
          }),
        }).catch(() => {});
      }
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black px-6 py-24 text-offwhite">
      <HeroVideo className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />


      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="relative z-10 w-full max-w-xl text-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, tiny logo */}
        <img
          src={`${BASE_PATH}/logo.jpg`}
          alt="Hair by Cill"
          width={120}
          height={120}
          className="mx-auto mb-7 h-24 w-24 rounded-full shadow-[0_0_40px_rgba(210,174,98,0.25)] ring-1 ring-gold/40 md:h-28 md:w-28"
        />
        <span className="inline-block rounded-full border border-gold/40 bg-black/30 px-4 py-1.5 text-xs text-gold backdrop-blur-sm">
          Binnenkort open in Rhoon
        </span>
        <h1 className="mt-6 text-[clamp(2.5rem,7vw,4.75rem)] font-light leading-[0.95]">
          Wees de eerste <span className="accent text-gold">in de stoel</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-offwhite/75">
          Schrijf je in voor de wachtlijst en ontvang <strong className="font-medium text-offwhite">10% korting</strong> op
          je eerste behandeling zodra we open zijn. We laten het je als eerste weten.
        </p>

        {state === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            role="status"
            className="mx-auto mt-9 max-w-md rounded-3xl bg-offwhite/10 p-6 backdrop-blur-md"
          >
            <p className="text-2xl font-light">
              Je staat <span className="accent text-gold">op de lijst</span>
            </p>
            <p className="mt-4 text-xs text-offwhite/60">Jouw kortingscode voor 10% korting</p>
            <p className="mt-2 select-all font-mono text-2xl tracking-[0.2em] text-gold">{DISCOUNT_CODE}</p>
            <p className="mt-3 text-sm text-offwhite/70">
              Geldig tot en met {validUntil()}.
              {EMAILJS.service ? ` We hebben de code ook gemaild naar ${email}.` : " Maak een screenshot of noteer de code."}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-9 max-w-md">
            <div className="flex flex-col gap-2 rounded-3xl bg-offwhite/10 p-2 backdrop-blur-md sm:flex-row sm:rounded-full">
              <label htmlFor="waitlist-email" className="sr-only">
                E-mailadres
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Jouw e-mailadres"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-sm placeholder:text-offwhite/50 focus:outline-none"
              />
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />
              <button
                type="submit"
                disabled={state === "sending"}
                className="rounded-full bg-offwhite px-7 py-3 text-sm text-black transition-colors hover:bg-gold disabled:opacity-60"
              >
                {state === "sending" ? "Even geduld..." : "Zet mij op de lijst"}
              </button>
            </div>
            {state === "error" && (
              <p role="alert" className="mt-3 text-sm text-red-300">
                Dat ging niet goed. Probeer het zo nog eens of stuur ons een berichtje via Instagram.
              </p>
            )}
            <p className="mt-4 text-[11px] leading-relaxed text-offwhite/50">
              We gebruiken je e-mailadres alleen om je te laten weten wanneer we open zijn en voor je
              openingskorting. Afmelden kan altijd.
            </p>
          </form>
        )}
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-xs text-offwhite/55 md:bottom-8">
        <p>{business.address}</p>
        <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
          Volg ons op Instagram
        </a>
      </div>
      <OwnerLogin />
    </section>
  );
}
