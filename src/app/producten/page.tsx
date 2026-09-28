import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Producten",
  description: "Professionele haarverzorging. Shop de haarproducten van Hair by Cill.",
};

export default function ProductenPage() {
  return (
    <>
      <PageHero
        title="Verzorging voor"
        accent="thuis"
        intro="Dezelfde professionele producten die we in de salon gebruiken, zodat je resultaat langer mooi blijft."
        image="https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1920&auto=format&fit=crop"
      />
      <section className="mx-auto max-w-[1300px] px-6 py-20 md:py-28">
        <ProductsClient />
      </section>
    </>
  );
}
