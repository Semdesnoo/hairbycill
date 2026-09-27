import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2 text-sm tracking-wide text-black ${className}`}
      >
        <span className="border-b border-black/30 pb-0.5 transition-colors group-hover:border-gold group-hover:text-gold-muted">
          {children}
        </span>
        <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-[6px] bg-black px-7 py-3.5 text-sm tracking-wide text-offwhite transition-colors duration-250 hover:bg-soft-black ${className}`}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
    </Link>
  );
}
