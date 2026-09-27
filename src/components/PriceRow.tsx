import { PriceItem } from "@/lib/data";

export default function PriceRow({ item }: { item: PriceItem }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4">
      <span className="text-base text-ink">{item.name}</span>
      <span className="whitespace-nowrap text-sm text-champagne">{item.price}</span>
    </div>
  );
}
