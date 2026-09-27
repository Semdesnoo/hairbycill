export default function SectionLabel({
  children,
  dark = false,
}: {
  children: string;
  dark?: boolean;
}) {
  return (
    <p
      className={`mb-4 text-xs tracking-[0.3em] uppercase ${
        dark ? "text-gold" : "text-gold-muted"
      }`}
    >
      {children}
    </p>
  );
}
