import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductsClient from "./ProductsClient";
import { BASE_PATH } from "@/lib/basePath";

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
        image={`${BASE_PATH}/img/folies-licht.jpg`}
      />
      <section className="px-4 py-16 md:px-8 md:py-24">
        <ProductsClient />
      </section>
    </>
  );
}
