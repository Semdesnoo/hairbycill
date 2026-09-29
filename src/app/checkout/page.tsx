import type { Metadata } from "next";
import Checkout from "./Checkout";

export const metadata: Metadata = { title: "Afrekenen", robots: { index: false } };

export default function CheckoutPage() {
  return <Checkout />;
}
