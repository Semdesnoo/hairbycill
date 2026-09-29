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
    <Reveal delay={(index % 2) * 0.08} className="mb-6 break-inside-avoid rounded-3xl bg-ivory/70 p-6 md:p-8">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-gold">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            {ICONS[category.icon]}
          </svg>
        </span>
        <h2 className="text-2xl md:text-[1.7rem]">{category.title}</h2>
      </div>
      <ul className="mt-6 divide-y divide-black/10 border-t border-black/10">
        {category.items.map((item) => (
          <li key={item.name} className="flex items-baseline justify-between gap-6 py-3.5 text-[15px]">
            <span className="text-black/75">{item.name}</span>
            <span className="whitespace-nowrap tabular-nums text-black">{item.price}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
