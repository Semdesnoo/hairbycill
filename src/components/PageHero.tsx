import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";

/** Light split hero shared by every sub page: h1 with italic accent + intro left, rounded photo right. */
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
    <section className="bg-white px-3 pb-3 pt-24 md:px-6">
      <div className="grid gap-3 md:grid-cols-[1fr_1.1fr] md:gap-6">
        <div className="flex flex-col justify-end rounded-3xl bg-ivory px-6 py-12 md:px-12 md:py-16">
          <AnimatedHeading
            as="h1"
            lines={[title]}
            accent={accent}
            className="text-[clamp(2.5rem,5vw,4.25rem)] leading-[1]"
          />
          {intro && <p className="mt-5 max-w-md text-sm leading-relaxed text-black/60">{intro}</p>}
        </div>
        <div className="relative h-[260px] animate-[fade-up_0.9s_cubic-bezier(0.16,1,0.3,1)_both] overflow-hidden rounded-3xl bg-ivory md:h-[440px]">
          <Image src={image} alt="" fill priority sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
