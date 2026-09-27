import Image from "next/image";

export default function Gallery({ images }: { images: string[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
      {images.map((src, i) => (
        <div
          key={src}
          className={`relative shrink-0 w-[70vw] md:w-auto overflow-hidden rounded-[10px] ${
            i % 3 === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[3/4]"
          }`}
        >
          <Image
            src={src}
            alt="Hair by Cill result"
            fill
            sizes="(min-width: 768px) 20vw, 70vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  );
}
