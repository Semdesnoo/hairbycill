import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/basePath";

export const dynamic = "force-static";

// ponytail: GitHub Pages serves this at /hairbycill/robots.txt, which crawlers ignore (they only read
// the host root). It starts working once the site runs on its own domain; the sitemap is still
// discoverable via Search Console.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
