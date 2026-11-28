import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "De afspraken die gelden bij een behandeling bij Hair by Cill.",
};

export default function VoorwaardenPage() {
  return (
    <LegalPage
      title="Algemene "
      accent="voorwaarden"
      intro="Deze voorwaarden gelden voor alle afspraken en behandelingen bij Hair by Cill. Kort en duidelijk, zodat we allebei weten waar we aan toe zijn."
      sections={[
        {
          h: "Afspraak maken",
          p: [
            "Je maakt een afspraak via WhatsApp, telefonisch of in de salon. Je afspraak staat vast zodra wij hem hebben bevestigd.",
          ],
        },
        {
          h: "Verzetten of annuleren",
          p: [
            "Lukt het je niet? Laat het ons uiterlijk 24 uur van tevoren weten, dan kost het niets. Bij later afzeggen of niet komen mogen we tot 50% van de behandeling in rekening brengen.",
          ],
        },
        {
          h: "Te laat",
          p: [
            "Ben je meer dan 15 minuten te laat, dan kunnen we de behandeling misschien niet helemaal uitvoeren of moeten we de afspraak verzetten. De volledige prijs blijft dan staan.",
          ],
        },
        {
          h: "Prijzen en betalen",
          p: [
            "De prijzen op onze prijslijst zijn inclusief btw. Bij extra lang of dik haar kan een toeslag gelden; dat bespreken we vooraf met je. Je betaalt na de behandeling in de salon, met pin of contant.",
          ],
        },
        {
          h: "Gezondheid en allergieën",
          p: [
            "Vertel het ons vooraf als je allergisch bent, zwanger bent of een gevoelige hoofdhuid hebt. Bij twijfel doen we eerst een allergietest. Als je informatie niet met ons deelt, kunnen we niet aansprakelijk zijn voor de gevolgen.",
          ],
        },
        {
          h: "Niet tevreden?",
          p: [
            "Laat het ons binnen 7 dagen weten. We kijken samen wat er mogelijk is en passen het, als dat redelijk is, kosteloos aan.",
          ],
        },
        {
          h: "Aansprakelijkheid",
          p: [
            "We werken altijd zorgvuldig. Wij zijn niet aansprakelijk voor schade die ontstaat doordat je onjuiste informatie hebt gegeven of de verzorgingsadviezen niet hebt opgevolgd. Ook voor het verlies van persoonlijke spullen in de salon zijn we niet aansprakelijk.",
          ],
        },
      ]}
    />
  );
}
