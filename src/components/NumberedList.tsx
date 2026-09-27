import Reveal from "./Reveal";

export default function NumberedList({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <Reveal key={item} delay={i * 0.1} className="border-t border-black/15 py-8 last:border-b">
          <div className="flex items-baseline gap-6">
            <span className="font-display text-2xl text-gold-muted">0{i + 1}</span>
            <span className="font-display text-2xl md:text-3xl">{item}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
