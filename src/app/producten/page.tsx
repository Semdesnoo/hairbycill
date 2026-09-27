import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Producten",
  description: "Salon quality, at home. Shop de professionele haarproducten van Hair by Cill.",
};

export default function ProductenPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="mb-16 text-center">
        <p className="mb-3 text-xs tracking-[0.25em] text-champagne uppercase">Shop Haircare</p>
        <h1 className="font-display text-5xl md:text-6xl">Salon quality, at home.</h1>
      </Reveal>
      <ProductsClient />
    </section>
  );
}
