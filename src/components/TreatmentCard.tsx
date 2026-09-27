import Image from "next/image";
import Link from "next/link";
import { Treatment } from "@/lib/data";

export default function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <Link href="/prijslijst" className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
        <Image
          src={treatment.image}
          alt={treatment.name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 font-display text-2xl">{treatment.name}</h3>
      <p className="mt-1 text-sm text-ink/60">{treatment.description}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-champagne">
        Bekijk prijzen
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
