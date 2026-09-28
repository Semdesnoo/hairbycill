import Link from "next/link";
import Image from "next/image";
import { BASE_PATH } from "@/lib/basePath";

export default function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image
        src={`${BASE_PATH}/logo.jpg`}
        alt="Hair by Cill"
        width={40}
        height={40}
        className="rounded-full"
        priority
      />
      <span
        className={`font-display leading-none text-base text-lg hidden sm:block ${
          dark ? "text-offwhite" : "text-black"
        }`}
      >
        Hair <span className="accent text-gold">by</span> Cill
      </span>
    </Link>
  );
}
