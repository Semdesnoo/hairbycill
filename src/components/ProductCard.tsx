import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/producten/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-warm-grey">{product.brand}</p>
          <p className="font-display text-xl transition-transform duration-300 group-hover:translate-x-1">
            {product.name}
          </p>
        </div>
        <span className="text-sm">{product.price}</span>
      </div>
    </Link>
  );
}
