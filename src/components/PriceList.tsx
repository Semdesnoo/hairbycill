import { PriceCategory } from "@/lib/data";
import Reveal from "./Reveal";

export default function PriceList({ category, index }: { category: PriceCategory; index: number }) {
  return (
    <Reveal delay={index * 0.06} className="mb-20">
      <div className="mb-8 flex items-baseline gap-4">
        <span className="font-display text-xl text-gold-muted">0{index + 1}</span>
        <h2 className="font-display text-3xl md:text-4xl">{category.title}</h2>
      </div>
      <div>
        {category.items.map((item) => (
          <div
            key={item.name}
            className="flex items-baseline justify-between gap-6 border-b border-black/10 py-4"
          >
            <span className="text-base">{item.name}</span>
            <span className="whitespace-nowrap text-sm text-gold-muted">{item.price}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
