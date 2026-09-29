import Link from "next/link";

/** Text wordmark (user removed the round logo image here). */
export default function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={`inline-block text-2xl leading-none ${dark ? "text-offwhite" : "text-black"} ${className}`}>
      Hair <span className="accent text-gold">by</span> Cill
    </Link>
  );
}
