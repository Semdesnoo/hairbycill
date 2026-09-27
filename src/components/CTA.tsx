import ImageReveal from "./ImageReveal";
import AnimatedHeading from "./AnimatedHeading";
import Button from "./Button";

export default function CTA({
  lines,
  image,
  ctaLabel = "AFSPRAAK MAKEN",
  ctaHref = "/contact",
}: {
  lines: string[];
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden py-40">
      <ImageReveal src={image} alt="" className="absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-black/65" />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <AnimatedHeading
          as="h2"
          lines={lines}
          className="font-display text-5xl leading-[1.05] text-offwhite md:text-7xl"
        />
        <div className="mt-10">
          <Button href={ctaHref} variant="primary" className="!bg-gold !text-black hover:!bg-gold-muted">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
