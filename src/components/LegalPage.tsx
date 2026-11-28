import { business } from "@/lib/data";

/** Plain text page (privacy, terms): title + numbered sections. */
export default function LegalPage({
  title,
  accent,
  intro,
  sections,
}: {
  title: string;
  accent: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-28 pt-40 md:pt-48">
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-muted">Laatst bijgewerkt: november 2026</p>
      <h1 className="mt-4 text-4xl md:text-5xl">
        {title}
        <span className="accent text-gold-muted">{accent}</span>
      </h1>
      <p className="mt-6 leading-relaxed text-black/70">{intro}</p>

      <ol className="mt-12 space-y-10">
        {sections.map((s, i) => (
          <li key={s.h} className="border-t border-black/10 pt-8">
            <h2 className="flex items-baseline gap-4 text-xl">
              <span className="text-sm tabular-nums text-gold-muted">{String(i + 1).padStart(2, "0")}</span>
              {s.h}
            </h2>
            {s.p.map((t) => (
              <p key={t} className="mt-3 text-sm leading-relaxed text-black/65">
                {t}
              </p>
            ))}
          </li>
        ))}
      </ol>

      <p className="mt-14 rounded-2xl bg-ivory p-6 text-sm leading-relaxed text-black/70">
        Vragen? Neem contact op met {business.name}, {business.address}, via{" "}
        <a href={`mailto:${business.email}`} className="text-gold-muted underline underline-offset-4">
          {business.email}
        </a>{" "}
        of{" "}
        <a href={business.phoneHref} className="text-gold-muted underline underline-offset-4">
          {business.phone}
        </a>
        .
      </p>
    </section>
  );
}
