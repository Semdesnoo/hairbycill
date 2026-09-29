import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";
import CookieBanner from "@/components/CookieBanner";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LaunchGate from "@/components/LaunchGate";
import { business, openingHours } from "@/lib/data";
import { BASE_PATH, SITE_URL } from "@/lib/basePath";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: `${business.name} - Luxury Hair Salon`,
    template: `%s - ${business.name}`,
  },
  description:
    "Hair by Cill is een luxe kapsalon met persoonlijke aandacht voor jouw haar, stijl en uitstraling. Boek vandaag nog jouw afspraak.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: business.name,
  },
  // Round gold logo, transparent corners (favicon.ico in src/app is picked up automatically too).
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${BASE_PATH}/icon-192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
};

const DAY_EN: Record<string, string> = {
  Maandag: "Monday", Dinsdag: "Tuesday", Woensdag: "Wednesday", Donderdag: "Thursday",
  Vrijdag: "Friday", Zaterdag: "Saturday", Zondag: "Sunday",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: business.name,
  description: "Luxe kapsalon met persoonlijke aandacht voor haar, stijl en uitstraling.",
  telephone: business.phone,
  email: business.email,
  address: { "@type": "PostalAddress", streetAddress: business.address },
  openingHoursSpecification: openingHours.flatMap((o) =>
    [...o.hours.matchAll(/(\d{2}:\d{2})-(\d{2}:\d{2})/g)].map((m) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DAY_EN[o.day]}`,
      opens: m[1],
      closes: m[2],
    })),
  ),
  sameAs: [business.instagram, business.tiktok, business.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-offwhite text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LaunchGate>
          <Header />
          <main className="isolate flex-1 overflow-x-hidden bg-offwhite">{children}</main>
          <Footer />
          <MobileStickyCta />
          <CookieBanner />
          <CartDrawer />
        </LaunchGate>
        <WhatsAppButton />
      </body>
    </html>
  );
}
