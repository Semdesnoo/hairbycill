import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";

/** Dark photo hero shared by every sub page: h1 with italic accent + intro. */
export default function PageHero({
  title,
  accent,
  intro,
  image,
}: {
  title: string;
  accent: string;
  intro?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[420px] items-end overflow-hidden bg-black px-6 pb-14 pt-40 md:min-h-[520px] md:px-14 md:pb-20">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      <div className="relative z-10 max-w-2xl">
        <AnimatedHeading
          as="h1"
          lines={[title]}
          accent={accent}
          className="text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1] text-offwhite"
        />
        {intro && <p className="mt-5 max-w-md text-sm leading-relaxed text-offwhite/75">{intro}</p>}
      </div>
    </section>
  );
}
