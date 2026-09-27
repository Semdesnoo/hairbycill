import Image from "next/image";
import Button from "./Button";

export default function CtaSection({
  title,
  subtitle,
  image,
  ctaLabel = "Afspraak maken",
  ctaHref = "/contact",
}: {
  title: string;
  subtitle?: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden py-32">
      <Image src={image} alt="" fill className="object-cover -z-10" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-ink/70" />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl md:text-6xl text-bone leading-tight">{title}</h2>
        {subtitle && <p className="mt-4 text-bone/70">{subtitle}</p>}
        <Button href={ctaHref} className="mt-8">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
