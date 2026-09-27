import Link from "next/link";

/** Wordmark placeholder — swap for the real Hair by Cill logo image when supplied. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-display leading-none ${className}`}>
      <span className="block text-2xl tracking-[0.08em] text-bone">
        HAIR <span className="text-champagne">BY</span> CILL
      </span>
    </Link>
  );
}
