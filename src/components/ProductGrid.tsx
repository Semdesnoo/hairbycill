import { Product } from "@/lib/data";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 4) * 0.08}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}
