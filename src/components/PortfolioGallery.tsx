import ImageReveal from "./ImageReveal";
import { galleryImages } from "@/lib/data";

const aspectClass: Record<string, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

// Editorial asymmetric grid: alternate column spans + a translateY offset on every
// other tile so nothing lines up into a neat card grid.
export default function PortfolioGallery() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-6">
      {galleryImages.map((img, i) => (
        <div
          key={img.src}
          className={`${aspectClass[img.aspect]} ${
            i % 5 === 1 ? "md:col-span-3" : i % 5 === 3 ? "md:col-span-3 md:translate-y-12" : "md:col-span-2"
          } ${i % 2 === 1 ? "translate-y-6 md:translate-y-0" : ""}`}
        >
          <ImageReveal
            src={img.src}
            alt="Hair by Cill resultaat"
            className="h-full w-full rounded-2xl"
            sizes="(min-width: 768px) 33vw, 50vw"
            delay={(i % 4) * 0.08}
          />
        </div>
      ))}
    </div>
  );
}
