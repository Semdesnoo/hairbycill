import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";

/** Full-bleed photo hero shared by every sub page (Dore & Rose style): title + intro bottom-left over a dark scrim. */
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
    <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-black md:min-h-[72svh]">
      <Image src={image} alt="" fill priority sizes="100vw" className="animate-[fade-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" />
      <div className="on-photo relative z-10 w-full px-6 pb-12 pt-32 md:px-14 md:pb-16">
        <AnimatedHeading
          as="h1"
          lines={[title]}
          accent={accent}
          className="text-[clamp(2.75rem,6vw,5rem)] leading-[1] text-offwhite [&_.accent]:text-gold"
        />
        {intro && <p className="mt-5 max-w-md text-base leading-relaxed text-offwhite/85">{intro}</p>}
      </div>
    </section>
  );
}
