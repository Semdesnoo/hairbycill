import { PriceCategory, PriceIcon } from "@/lib/data";
import Reveal from "./Reveal";

/** Thin gold line icons matching the printed price list. */
const ICONS: Record<PriceIcon, React.ReactNode> = {
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
    </>
  ),
  dryer: (
    <>
      <path d="M3 9a6 6 0 0 1 6-6h9a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4l-2 3H9a6 6 0 0 1-6-2Z" />
      <path d="M10 11v4a2 2 0 0 0 2 2h1M20 4v3M6 16c-1 1-1 2 0 3M4 15c-1 1.5-1 3 0 4.5" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 11h18a9 9 0 0 1-18 0Z" />
      <path d="M14 11 20 3M17 2l4 3" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-3-2-4-5-4-8s2-6 4-8c2 2 4 5 4 8s-1 6-4 8Z" />
      <path d="M12 20c-4 0-8-2-9-7 3-1 5 0 6 1M12 20c4 0 8-2 9-7-3-1-5 0-6 1" />
    </>
  ),
  hair: <path d="M9 3c-3 2-4 6-3 10s1 7-1 8M12 3c-2 3-2 7-1 11s1 6 0 7M15 3c2 2 3 6 2 10s0 6 2 8" />,
};

export default function PriceList({ category, index }: { category: PriceCategory; index: number }) {
  return (
    <Reveal
      delay={(index % 2) * 0.08}
      className="mb-6 break-inside-avoid rounded-2xl border border-gold/35 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(127,99,41,0.35)] transition-shadow duration-300 hover:shadow-[0_14px_40px_-16px_rgba(210,174,98,0.55)] md:p-7"
    >
      <div className="flex items-center gap-4 border-b border-gold/45 pb-3">
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-gold-muted"
          aria-hidden
        >
          {ICONS[category.icon]}
        </svg>
        <h2 className="text-lg uppercase tracking-[0.18em] text-gold-muted md:text-xl">{category.title}</h2>
      </div>
      <ul className="mt-2">
        {category.items.map((item) => (
          <li
            key={item.name}
            className="group flex items-baseline gap-3 rounded-lg px-2 py-2.5 transition-colors duration-300 hover:bg-gold/10"
          >
            <span className="text-[15px] text-black/80 transition-colors duration-300 group-hover:text-black">{item.name}</span>
            {/* Dotted leader like a printed menu */}
            <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-gold/40" />
            <span className="price-glow whitespace-nowrap text-base tracking-wide text-gold-muted">{item.price}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
