import Image from "next/image";
import Link from "next/link";
import { Product, euroToNumber } from "@/lib/data";

export const discountPct = (p: Product) =>
  p.oldPrice ? Math.round((1 - euroToNumber(p.price) / euroToNumber(p.oldPrice)) * 100) : 0;

/** Shop card: tall soft-grey photo tile with badges + cart bubble, text below (Dore & Rose style). */
export default function ProductCard({ product }: { product: Product }) {
  const pct = discountPct(product);
  return (
    <Link href={`/producten/${product.slug}`} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-ivory">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-offwhite/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wide">
          {product.category}
        </span>
        {pct > 0 && (
          <span className="absolute right-3 top-3 rounded-md bg-black px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-offwhite">
            -{pct}%
          </span>
        )}
        <span
          aria-hidden
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-offwhite shadow-sm transition-transform duration-300 group-hover:scale-110"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2" />
            <circle cx="9" cy="20" r="1.3" />
            <circle cx="17" cy="20" r="1.3" />
          </svg>
        </span>
      </div>
      <p className="mt-4 text-lg font-medium leading-tight">{product.name}</p>
      <p className="mt-0.5 text-sm text-black/55">{product.brand}</p>
      <p className="mt-2 text-sm">
        {product.oldPrice && <span className="mr-2 text-red-700 line-through">{product.oldPrice}</span>}
        {product.price}
      </p>
    </Link>
  );
}
