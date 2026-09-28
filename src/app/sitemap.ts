import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/basePath";
import { posts } from "@/lib/blog";
import { products } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/afspraak", "/prijslijst", "/producten", "/over-ons", "/contact", "/blog"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.date, priority: 0.6 })),
    ...products.map((p) => ({ url: `${SITE_URL}/producten/${p.slug}`, priority: 0.5 })),
  ];
}
