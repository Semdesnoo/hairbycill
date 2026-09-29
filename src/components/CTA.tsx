import ImageReveal from "./ImageReveal";
import AnimatedHeading from "./AnimatedHeading";
import Button from "./Button";

/** Rounded dark photo band with heading + CTA, same as the homepage closer. */
export default function CTA({
  title,
  accent,
  image,
  text,
  ctaLabel = "Afspraak maken",
  ctaHref = "/afspraak",
}: {
  title: string;
  accent: string;
  image: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="px-4 pb-20 md:px-14">
      <div className="on-photo relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-24 text-center">
        <ImageReveal src={image} alt="" className="absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-black/65" />
        <AnimatedHeading
          lines={[title]}
          accent={accent}
          className="text-4xl leading-[1.05] text-offwhite md:text-5xl"
        />
        {text && <p className="mx-auto mt-4 max-w-md text-sm text-offwhite/90">{text}</p>}
        <div className="mt-8">
          <Button href={ctaHref} variant="light">{ctaLabel}</Button>
        </div>
      </div>
    </section>
  );
}
