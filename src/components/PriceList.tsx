import { PriceCategory } from "@/lib/data";
import Reveal from "./Reveal";

export default function PriceList({ category, index }: { category: PriceCategory; index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.08} className="rounded-2xl bg-ivory/70 p-6 md:p-8">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-xs text-gold-muted">0{index + 1}</span>
        <h2 className="text-2xl md:text-3xl">{category.title}</h2>
      </div>
      {category.items.map((item) => (
        <div key={item.name} className="flex items-baseline justify-between gap-6 border-t border-black/10 py-3.5">
          <span className="text-sm">{item.name}</span>
          <span className="whitespace-nowrap text-sm text-gold-muted">{item.price}</span>
        </div>
      ))}
    </Reveal>
  );
}
