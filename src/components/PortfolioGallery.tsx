import ImageReveal from "./ImageReveal";
import { galleryImages } from "@/lib/data";

const aspectClass: Record<string, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

// CSS-columns masonry: mixed aspect ratios pack without gaps for any image count.
export default function PortfolioGallery() {
  return (
    <div className="columns-2 gap-4 md:columns-3">
      {galleryImages.map((img, i) => (
        <div key={img.src} className={`mb-4 break-inside-avoid ${aspectClass[img.aspect]}`}>
          <ImageReveal
            src={img.src}
            alt="Hair by Cill resultaat"
            className="h-full w-full rounded-2xl"
            sizes="(min-width: 768px) 33vw, 50vw"
            delay={(i % 3) * 0.08}
          />
        </div>
      ))}
    </div>
  );
}
