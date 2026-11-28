import { whatsappBooking } from "@/lib/data";
import { WHATSAPP_ICON } from "./WhatsAppButton";

const SPARKS = [
  { x: 6, y: 18, s: 1.1, d: 1 },
  { x: 22, y: 86, s: 1.3, d: 2 },
  { x: 52, y: 10, s: 0.9, d: 3 },
  { x: 80, y: 88, s: 1.1, d: 2 },
  { x: 96, y: 24, s: 0.8, d: 4 },
];

const TONES = {
  gold: "bg-gold text-black [--spark:#fff]",
  light: "bg-offwhite text-black hover:bg-gold",
  dark: "bg-black text-offwhite hover:bg-soft-black",
};

/** The one way to book: opens WhatsApp with a ready-made message (optionally for a treatment). */
export default function BookButton({
  treatment,
  label = "Afspraak via WhatsApp",
  tone = "gold",
  className = "",
  tabIndex,
}: {
  treatment?: string;
  label?: string;
  tone?: keyof typeof TONES;
  className?: string;
  tabIndex?: number;
}) {
  return (
    <a
      href={whatsappBooking(treatment)}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      aria-label={`${label} (opent WhatsApp)`}
      className={`book-btn group inline-flex items-center justify-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-medium transition-colors duration-300 ${TONES[tone]} ${className}`}
    >
      {SPARKS.map((p, i) => (
        <svg
          key={i}
          aria-hidden
          viewBox="0 0 96 96"
          className="spark"
          style={{ left: `${p.x}%`, top: `${p.y}%`, "--s": p.s, "--d": p.d } as React.CSSProperties}
        >
          <path d="M93.8 51.6C95 51 96 49.4 96 48s-1-3-2.2-3.6c0 0-22.9-1.5-31.8-10.4C53.1 25.1 51.6 2.2 51.6 2.2 51 1 49.4 0 48 0s-3 1-3.6 2.2c0 0-1.5 22.9-10.4 31.8C25.1 42.9 2.2 44.4 2.2 44.4 1 45 0 46.6 0 48s1 3 2.2 3.6c0 0 22.9 1.5 31.8 10.4 8.9 8.9 10.4 31.8 10.4 31.8C45 95 46.6 96 48 96s3-1 3.6-2.2c0 0 1.5-22.9 10.4-31.8 8.9-8.9 31.8-10.4 31.8-10.4Z" />
        </svg>
      ))}
      {label}
      <span
        aria-hidden
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105 ${
          tone === "dark" ? "bg-gold text-black" : "bg-black text-gold"
        }`}
      >
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
          <path d={WHATSAPP_ICON} />
        </svg>
      </span>
    </a>
  );
}
