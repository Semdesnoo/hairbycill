import Image from "next/image";
import Link from "next/link";
import { Product, euroToNumber } from "@/lib/data";
import { QuickAddButton } from "@/components/CartDrawer";

export const discountPct = (p: Product) =>
  p.oldPrice
    ? Math.round((1 - euroToNumber(p.price) / euroToNumber(p.oldPrice)) * 100)
    : 0;

/** Shop card: tall soft-grey photo tile with badges + cart bubble, text below (Dore & Rose style). */
export default function ProductCard({ product }: { product: Product }) {
  const pct = discountPct(product);
  return (
    <div className="group">
      <div className="relative">
        <Link
          href={`/producten/${product.slug}`}
          tabIndex={-1}
          aria-hidden
          className="relative block aspect-[2/3] overflow-hidden rounded-2xl bg-ivory"
        >
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
        </Link>
        <QuickAddButton slug={product.slug} name={product.name} />
      </div>
      <Link href={`/producten/${product.slug}`} className="block">
        <p className="mt-4 text-lg font-medium leading-tight">{product.name}</p>
        <p className="mt-0.5 text-sm text-black/55">{product.brand}</p>
        <p className="mt-2 text-sm">
          {product.oldPrice && (
            <span className="mr-2 text-red-700 line-through">
              {product.oldPrice}
            </span>
          )}
          {product.price}
        </p>
      </Link>
    </div>
  );
}
