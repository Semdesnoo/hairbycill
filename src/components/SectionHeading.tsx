export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs tracking-[0.25em] uppercase ${
            dark ? "text-gold" : "text-champagne"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl md:text-5xl leading-tight ${
          dark ? "text-bone" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base ${dark ? "text-bone/70" : "text-ink/60"}`}>{subtitle}</p>
      )}
    </div>
  );
}
