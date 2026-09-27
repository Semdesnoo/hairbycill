import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "group inline-flex items-center gap-2 rounded-[8px] px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300";

const variants = {
  primary: "bg-champagne text-ink hover:bg-gold-light",
  secondary:
    "border border-champagne/60 text-bone hover:border-champagne hover:text-champagne",
};

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}
