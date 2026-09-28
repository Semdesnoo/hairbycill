import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/producten/${product.slug}`} className="group block h-full rounded-2xl bg-ivory/70 p-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-ivory">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-offwhite/90 px-2.5 py-1 text-[10px]">
          {product.category}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1 pb-1">
        <div>
          <p className="text-[11px] text-black/45">{product.brand}</p>
          <p className="mt-0.5 text-base leading-tight">{product.name}</p>
        </div>
        <span className="whitespace-nowrap text-sm text-gold-muted">{product.price}</span>
      </div>
    </Link>
  );
}
