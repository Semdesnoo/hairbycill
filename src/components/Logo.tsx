import Link from "next/link";
import Image from "next/image";
import { BASE_PATH } from "@/lib/basePath";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Image
        src={`${BASE_PATH}/logo.jpg`}
        alt="Hair by Cill"
        width={44}
        height={44}
        className="rounded-full"
        priority
      />
      <span className="font-display leading-none text-lg tracking-[0.08em] text-bone hidden sm:block">
        HAIR <span className="text-champagne">BY</span> CILL
      </span>
    </Link>
  );
}
