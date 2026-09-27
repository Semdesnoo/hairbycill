import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <Link href={`/producten/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-[10px] bg-charcoal/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <p className="mt-4 text-xs uppercase tracking-widest text-ink/50">{product.brand}</p>
      <h3 className="font-display text-xl">{product.name}</h3>
      <p className="mt-1 text-sm text-ink/60">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{product.price}</span>
        <Link
          href={`/producten/${product.slug}`}
          className="text-xs uppercase tracking-widest text-champagne hover:text-gold"
        >
          Bekijk product
        </Link>
      </div>
    </div>
  );
}
