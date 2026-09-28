import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "ghost";
  className?: string;
};

/** Pill button with round arrow badge. */
export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  const tone =
    variant === "light"
      ? "bg-offwhite text-black"
      : variant === "ghost"
        ? "border border-black/20 text-black"
        : "bg-black text-offwhite";
  const dot = variant === "light" ? "bg-black text-gold" : "bg-gold text-black";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm transition-opacity hover:opacity-90 ${tone} ${className}`}
    >
      {children}
      <span
        aria-hidden
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${dot}`}
      >
        →
      </span>
    </Link>
  );
}
