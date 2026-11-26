import type { Metadata } from "next";
import AnimatedHeading from "@/components/AnimatedHeading";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BASE_PATH } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Van een salonnetje op zolder naar een eigen salon in Rhoon: het verhaal achter Hair by Cill.",
};

// The road from school to the salon in Rhoon, told in the owner's own words.
const JOURNEY = [
  { step: "De kappersschool", text: "Uitgeloot voor het ondernemingsgedeelte. Toch begon daar alles." },
  { step: "Kapster, salonmanager, regiomanager", text: "Jaren vol ervaring, mooie momenten én uitdagingen. Steeds sterker groeide het gevoel: dit wil ik voor mezelf." },
  { step: "Een salonnetje op zolder", text: "Klein begonnen, eerst helemaal alleen. Daarna kwam lieve Cecil erbij en groeide de droom stap voor stap." },
  { step: "Onze eigen salon in Rhoon", text: "Een eigen plek, een eigen visie en een eigen team. Van dromen naar doen." },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        title="Van zolder"
        accent="naar Rhoon"
        intro="Mijn grootste droom komt uit."
        image={`${BASE_PATH}/img/knippen-rood.jpg`}
      />

      {/* WHY: the story in her own words */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-muted">Ons verhaal</p>
          <p className="mt-6 text-3xl font-light leading-snug md:text-4xl">
            Ik miste het om écht met mijn handen bezig te zijn. Om mensen <span className="accent text-gold">mooi en zelfverzekerd</span> de deur uit te
            zien gaan.
          </p>
          <span aria-hidden className="mx-auto mt-8 block h-0.5 w-16 rounded-full bg-gold" />
          <p className="mt-8 leading-relaxed text-black/65">
            Om dat blije gezicht te zien wanneer iemand weer helemaal tevreden naar buiten stapt. Dat gevoel heeft me nooit losgelaten, van de
            kappersschool tot vandaag.
          </p>
        </Reveal>
      </section>

      {/* JOURNEY: gold timeline on black */}
      <section className="bg-black px-6 py-24 text-offwhite md:py-32">
        <div className="mx-auto max-w-4xl">
          <AnimatedHeading lines={["Van dromen"]} accent="naar doen" className="text-center text-4xl leading-[1.05] md:text-5xl [&_.accent]:text-gold" />
          <ol className="relative mt-16 space-y-12 border-l border-gold/40 pl-8 md:pl-12">
            {JOURNEY.map((j, i) => (
              <li key={j.step} className="relative">
                <Reveal delay={i * 0.1}>
                  <span
                    aria-hidden
                    className={`absolute -left-[calc(2rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full md:-left-[calc(3rem+7px)] ${
                      i === JOURNEY.length - 1 ? "bg-gold shadow-[0_0_0_6px_rgba(232,176,75,0.25)]" : "border-2 border-gold bg-black"
                    }`}
                  />
                  <p className="font-serif text-lg italic text-gold">0{i + 1}</p>
                  <h3 className="mt-1 text-2xl font-light md:text-3xl">{j.step}</h3>
                  <p className="mt-2 max-w-xl text-offwhite/65">{j.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GRATITUDE */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <p className="text-2xl font-light leading-relaxed md:text-3xl">
            Dit heeft bloed, zweet, tranen en heel veel uren gekost. Maar juist daardoor voelt dit moment <span className="accent text-gold">zó bijzonder</span>.
          </p>
          <p className="mt-8 leading-relaxed text-black/65">
            Het is het bewijs dat wanneer je in jezelf blijft geloven, je passie volgt en nooit opgeeft, er zoveel moois kan ontstaan. Lieve klanten,
            familie en vrienden: bedankt voor jullie vertrouwen, jullie steun en omdat jullie steeds opnieuw in mij zijn blijven geloven.
          </p>
          <p className="mt-10 font-serif text-3xl italic text-gold-muted">Priscilla</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-black/45">Eigenaar Hair by Cill</p>
        </Reveal>
      </section>

      <CTA
        title="Een nieuw"
        accent="hoofdstuk"
        text="Met ontzettend veel trots, liefde en dankbaarheid heten we je welkom in onze salon in Rhoon."
        image={`${BASE_PATH}/img/spiegel.jpg`}
      />
    </>
  );
}
