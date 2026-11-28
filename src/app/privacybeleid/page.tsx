import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Hoe Hair by Cill omgaat met jouw persoonsgegevens.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      accent="beleid"
      intro="Hair by Cill gaat zorgvuldig om met jouw gegevens. We verzamelen alleen wat nodig is om je te helpen en we verkopen nooit iets door. Hieronder lees je in gewone taal wat we doen."
      sections={[
        {
          h: "Welke gegevens we gebruiken",
          p: [
            "Als je een afspraak maakt via WhatsApp: je naam, telefoonnummer en wat je over je afspraak deelt.",
            "Als je ons mailt, belt of je aanmeldt voor de nieuwsbrief: je naam, e-mailadres en je bericht.",
            "In de salon noteren we soms wat we bij jou hebben gedaan, zoals een kleurrecept, zodat we je de volgende keer net zo goed helpen.",
          ],
        },
        {
          h: "Waarvoor we ze gebruiken",
          p: [
            "Om je afspraak te plannen, te bevestigen of te verzetten, om je vragen te beantwoorden en, alleen als je je hebt aangemeld, om je onze nieuwsbrief te sturen.",
          ],
        },
        {
          h: "Met wie we ze delen",
          p: [
            "Niet met anderen, behalve met diensten die we nodig hebben om contact met je te houden: WhatsApp (Meta) voor berichten en Web3Forms voor het versturen van formulieren en aanmeldingen naar onze mailbox. Zij gebruiken je gegevens alleen daarvoor.",
          ],
        },
        {
          h: "Hoe lang we ze bewaren",
          p: [
            "Niet langer dan nodig. Klantgegevens bewaren we zolang je bij ons klant bent en maximaal twee jaar na je laatste bezoek. Van de nieuwsbrief kun je je altijd afmelden; dan verwijderen we je e-mailadres.",
          ],
        },
        {
          h: "Cookies",
          p: [
            "Deze website gebruikt alleen functionele opslag in je browser, bijvoorbeeld om je cookiekeuze te onthouden. We gebruiken geen advertentie- of volgcookies. De kaart op de contactpagina komt van Google Maps; Google kan daarbij eigen cookies plaatsen.",
          ],
        },
        {
          h: "Jouw rechten",
          p: [
            "Je mag altijd vragen welke gegevens we van je hebben en je kunt ze laten aanpassen of verwijderen. Stuur ons een bericht, dan regelen we het binnen een maand. Ben je het ergens niet mee eens, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.",
          ],
        },
      ]}
    />
  );
}
