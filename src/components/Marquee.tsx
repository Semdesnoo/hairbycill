/** Slow, continuous horizontal marquee. Duplicated content for a seamless loop. */
export default function Marquee({ text }: { text: string }) {
  const item = (
    <span className="font-display text-3xl italic text-gold md:text-5xl px-8 whitespace-nowrap">
      {text}
    </span>
  );

  return (
    <div className="overflow-hidden bg-black py-10">
      <div className="flex w-max animate-marquee">
        {item}
        {item}
      </div>
    </div>
  );
}
