import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Producten",
  description: "Professional haircare. Shop de haarproducten van Hair by Cill.",
};

export default function ProductenPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-28 pt-40 md:pb-48 md:pt-52">
      <AnimatedHeading
        as="h1"
        lines={["PROFESSIONAL", "HAIRCARE."]}
        className="mb-16 font-display text-5xl leading-[1.02] md:text-7xl"
      />
      <ProductsClient />
    </section>
  );
}
