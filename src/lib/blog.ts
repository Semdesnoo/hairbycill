// SEO blog. Linked only from the footer + the homepage "Tips uit de salon" cards, not the main menu.
// Each post targets one search intent + local terms (kapper/kapsalon Rhoon, Albrandswaard,
// Barendrecht, Rotterdam-Zuid). Add a post = add an object; routes, sitemap and JSON-LD follow.

export type BlogPost = {
  slug: string;
  /** Card title + italic accent (homepage/blog index). */
  title: string;
  accent: string;
  /** Card excerpt. */
  text: string;
  read: string;
  image: string;
  /** <title> and meta description: primary keyword first, ~60 / ~155 chars. */
  metaTitle: string;
  metaDescription: string;
  /** Visible H1 (full keyword phrase). */
  h1: string;
  date: string; // YYYY-MM-DD
  intro: string;
  sections: { h2: string; p: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
  /** Treatment slug for the booking CTA (prefills /afspraak). */
  treatment?: string;
};

const img = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=1400&auto=format&fit=crop`;

export const posts: BlogPost[] = [
  {
    slug: "balayage-langer-mooi-houden",
    title: "Zo houd je balayage",
    accent: "langer mooi",
    text: "Met een paar kleine aanpassingen in je routine blijft je kleur weken frisser en warmer.",
    read: "4 min lezen",
    image: img("1522337360788-8b13dee7a37e"),
    metaTitle: "Balayage onderhouden: 6 tips om je kleur langer mooi te houden",
    metaDescription:
      "Hoe houd je balayage mooi? Onze stylisten uit Rhoon delen 6 praktische tips over wassen, toner, hittebescherming en wanneer je terug moet voor een refresh.",
    h1: "Balayage onderhouden: zo blijft je kleur langer mooi",
    date: "2026-09-01",
    intro:
      "Balayage is geliefd omdat het zacht uitgroeit en weinig onderhoud vraagt. Toch bepaalt je routine thuis hoe lang de kleur fris, warm en glanzend blijft. Met deze tips van onze stylisten in Rhoon haal je weken meer uit je balayage.",
    sections: [
      {
        h2: "Wacht 48 uur met de eerste wasbeurt",
        p: [
          "Direct na het kleuren is de schubbenlaag van je haar nog wat open. Door de eerste twee dagen niet te wassen, krijgt de kleur de tijd om zich te hechten. Zo voorkom je dat je de eerste keer al kleur uitspoelt.",
        ],
      },
      {
        h2: "Kies een sulfaatvrije shampoo",
        p: [
          "Sulfaten reinigen krachtig, maar trekken ook kleurpigment en natuurlijke oliën uit je haar. Een sulfaatvrije, kleurbeschermende shampoo reinigt milder, waardoor je balayage minder snel dof en koperkleurig wordt.",
          "Was je haar liefst twee tot drie keer per week, met lauw in plaats van heet water. Heet water opent de schubbenlaag en laat kleur sneller los.",
        ],
      },
      {
        h2: "Gebruik een zilvershampoo, maar met mate",
        p: [
          "Blonde en lichte balayage kan door zon, kalk en chloor geel of oranje gaan kleuren. Een zilver- of paarse shampoo neutraliseert die warme tinten. Gebruik hem eens per week of per twee weken: vaker maakt lichte lengtes grauw.",
        ],
      },
      {
        h2: "Bescherm tegen hitte en zon",
        p: ["Hitte en uv-licht zijn de grootste kleurvreters. Een paar gewoontes maken veel verschil:"],
        list: [
          "Gebruik altijd een hittebeschermer voor föhnen, stijlen of krullen.",
          "Zet je stijltang niet hoger dan 180 graden.",
          "Draag in de zomer een pet of gebruik een spray met uv-filter.",
          "Spoel je haar na het zwemmen direct uit met kraanwater.",
        ],
      },
      {
        h2: "Plan een toner tussen je afspraken",
        p: [
          "Een toner is een snelle, betaalbare behandeling die de tint van je balayage opfrist zonder opnieuw te hoeven lichten. Veel klanten combineren om de zes tot acht weken een toner met een knipbeurt, en laten de balayage zelf pas na drie tot vier maanden bijwerken.",
        ],
      },
      {
        h2: "Voed je haar wekelijks",
        p: [
          "Gelicht haar is poreuzer en verliest sneller vocht. Een wekelijks masker of hair treatment houdt de lengtes soepel en zorgt dat de kleur meer licht weerkaatst. Glanzend haar laat balayage altijd mooier zien.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hoe vaak moet balayage bijgewerkt worden?",
        a: "Meestal om de drie tot vier maanden. Met een toner tussendoor, rond zes tot acht weken, blijft de tint langer fris.",
      },
      {
        q: "Waarom wordt mijn balayage oranje of geel?",
        a: "Door zon, kalk, chloor en het natuurlijke pigment in je haar komen warme tinten naar boven. Een zilvershampoo of een toner in de salon neutraliseert dat.",
      },
      {
        q: "Kan ik balayage laten zetten in Rhoon?",
        a: "Ja. Bij Hair by Cill aan de Dorpsdijk in Rhoon plannen we balayage altijd met een adviesgesprek, zodat de kleur past bij jouw haar en huidtint.",
      },
    ],
    treatment: "balayage",
  },
  {
    slug: "fohnen-zonder-hitteschade",
    title: "Föhnen zonder",
    accent: "hitteschade",
    text: "De juiste volgorde van producten en temperatuur maakt het verschil voor glans.",
    read: "3 min lezen",
    image: img("1580618672591-eb180b1a973f"),
    metaTitle: "Föhnen zonder hitteschade: zo doe je het als een kapper",
    metaDescription:
      "Föhnen zonder je haar te beschadigen? Leer de juiste temperatuur, volgorde van producten en techniek van onze stylisten. Voor glanzend haar zonder pluis.",
    h1: "Föhnen zonder hitteschade: de techniek van de kapper",
    date: "2026-09-08",
    intro:
      "Een salonföhnbeurt ziet er glad en glanzend uit, maar thuis eindigt het vaak in pluis of droge punten. Het verschil zit zelden in de föhn zelf, maar in de voorbereiding, de temperatuur en de richting van de luchtstroom.",
    sections: [
      {
        h2: "Laat je haar eerst deels aan de lucht drogen",
        p: [
          "Nat haar is het kwetsbaarst. Dep het met een microvezel handdoek of katoenen T-shirt in plaats van te wrijven, en laat het tot zo'n zeventig procent aan de lucht drogen. Zo hoeft de föhn minder lang op je haar te staan.",
        ],
      },
      {
        h2: "Altijd eerst een hittebeschermer",
        p: [
          "Een hittebeschermer legt een dun laagje over de haarvezel dat de warmte verdeelt. Spray hem gelijkmatig op de lengtes en kam hem door met een grove kam, zodat elk plukje bedekt is.",
        ],
      },
      {
        h2: "Middelhoge stand en altijd het mondstuk erop",
        p: ["De hoogste stand is zelden nodig. Zo föhn je slim:"],
        list: [
          "Gebruik de middelste warmtestand en een hoge luchtsnelheid.",
          "Klik het smalle mondstuk erop, zodat de lucht gericht blijft.",
          "Houd de föhn zo'n 15 centimeter van je haar en blijf bewegen.",
          "Föhn van de wortel naar de punten mee met de schubbenlaag.",
          "Sluit af met de koude knop voor extra glans.",
        ],
      },
      {
        h2: "Werk in delen",
        p: [
          "Zet je haar vast in vier tot zes delen en föhn deel voor deel volledig droog. Half droog haar dat weer vocht opneemt, gaat pluizen. Begin in de nek en werk naar boven toe.",
        ],
      },
      {
        h2: "Hoe vaak is te vaak?",
        p: [
          "Dagelijks föhnen is prima zolang je bovenstaande stappen volgt en je haar wekelijks voedt met een masker. Merk je droge, splitsende punten? Laat ze dan bijknippen: beschadigde punten herstellen niet meer, ook niet met verzorging.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is föhnen slechter dan aan de lucht drogen?",
        a: "Niet per se. Lang nat blijven laat de haarvezel opzwellen. Kort föhnen op middelhoge stand met hittebescherming is vaak beter dan urenlang nat haar.",
      },
      {
        q: "Welke temperatuur is veilig voor mijn haar?",
        a: "Houd de middelste stand aan en vermijd de heetste stand. Voor stijltangen geldt: niet boven 180 graden, fijn haar nog lager.",
      },
    ],
    treatment: "styling",
  },
  {
    slug: "welk-haarmasker-past-bij-jouw-haar",
    title: "Welk masker past",
    accent: "bij jouw haar",
    text: "Droog, fijn of gekleurd: zo kies je een verzorging die echt iets doet.",
    read: "5 min lezen",
    image: img("1595476108010-b4d1f102b1b1"),
    metaTitle: "Welk haarmasker past bij jouw haar? Advies per haartype",
    metaDescription:
      "Droog, fijn, gekleurd of krullend haar: welk haarmasker kies je? Onze kappers leggen per haartype uit wat werkt en hoe vaak je een masker gebruikt.",
    h1: "Welk haarmasker past bij jouw haar? Advies per haartype",
    date: "2026-09-15",
    intro:
      "Een haarmasker is de snelste weg naar zachter en gezonder haar, maar alleen als het bij je haartype past. Een rijk masker op fijn haar maakt het slap, een licht masker doet weinig voor droog haar. Zo kies je het juiste.",
    sections: [
      {
        h2: "Droog en beschadigd haar: kies voor olie en herstel",
        p: [
          "Droog haar heeft vooral vet en vocht nodig. Kies een masker met oliën zoals argan- of kokosolie en ingrediënten als keratine. Laat het vijf tot tien minuten intrekken, eventueel onder een warme handdoek.",
        ],
      },
      {
        h2: "Fijn haar: licht en hydraterend",
        p: [
          "Fijn haar wordt snel zwaar. Kies een lichte, vochtinbrengende formule en breng hem alleen aan op de lengtes en punten, nooit op de hoofdhuid. Spoel goed uit voor meer volume.",
        ],
      },
      {
        h2: "Gekleurd of geblondeerd haar: bescherm de kleur",
        p: [
          "Na kleuren of blonderen zijn de verbindingen in de haarvezel verzwakt. Een bond-building of repair-masker herstelt die verbindingen en houdt de kleur langer vast. Kies een formule die sulfaatvrij en kleurveilig is.",
        ],
      },
      {
        h2: "Krullend haar: veel vocht",
        p: [
          "Krullen zijn van nature droger, omdat talg moeilijker langs de krul naar beneden komt. Een rijk, vochtinbrengend masker geeft definitie en minder pluis. Laat een klein beetje in de lengtes zitten als leave-in.",
        ],
      },
      {
        h2: "Hoe vaak gebruik je een haarmasker?",
        p: ["Een richtlijn per haartype:"],
        list: [
          "Normaal haar: een keer per week.",
          "Droog, gekleurd of krullend haar: een tot twee keer per week.",
          "Fijn of snel vettend haar: eens per twee weken, alleen in de punten.",
        ],
      },
      {
        h2: "Thuis of in de salon?",
        p: [
          "Een masker thuis onderhoudt, een hair treatment in de salon gaat dieper. In de salon werken we met warmte en professionele producten die thuis moeilijk na te doen zijn. Veel klanten combineren een treatment met hun knip- of kleurafspraak.",
        ],
      },
    ],
    faqs: [
      {
        q: "Wat is het verschil tussen een conditioner en een haarmasker?",
        a: "Een conditioner werkt kort in en sluit vooral de schubbenlaag. Een masker is geconcentreerder, werkt langer in en voedt dieper.",
      },
      {
        q: "Kan ik een haarmasker te vaak gebruiken?",
        a: "Ja. Te vaak een rijk masker maakt haar slap en vet. Houd je aan de richtlijn voor jouw haartype.",
      },
    ],
  },
  {
    slug: "eerste-afspraak-kapsalon-rhoon",
    title: "Je eerste afspraak",
    accent: "bij ons",
    text: "Wat je kunt verwachten, van het adviesgesprek tot de laatste finishing touch.",
    read: "2 min lezen",
    image: img("1633681926022-84c23e8cb2d6"),
    metaTitle: "Kapper in Rhoon: wat je kunt verwachten bij je eerste afspraak",
    metaDescription:
      "Op zoek naar een kapper in Rhoon? Zo verloopt je eerste afspraak bij Hair by Cill: van adviesgesprek en wassen tot knippen, kleuren en stylingtips.",
    h1: "Je eerste afspraak bij onze kapsalon in Rhoon",
    date: "2026-09-22",
    intro:
      "Een nieuwe kapper kiezen voelt spannend. Daarom nemen we bij Hair by Cill de tijd om je te leren kennen. Dit kun je verwachten als je voor het eerst bij ons in de stoel zit, aan de Dorpsdijk in Rhoon.",
    sections: [
      {
        h2: "Een persoonlijk adviesgesprek",
        p: [
          "We beginnen altijd met een gesprek. Wat wil je graag, wat bevalt je niet aan je huidige haar, en hoeveel tijd besteed je 's ochtends aan je haar? Neem gerust inspiratiefoto's mee. Samen kijken we wat past bij je gezichtsvorm, haarstructuur en levensstijl.",
        ],
      },
      {
        h2: "Wassen en even ontspannen",
        p: [
          "Daarna wassen we je haar met producten die passen bij jouw haartype. Een rustig moment voor jezelf, met een massage van de hoofdhuid.",
        ],
      },
      {
        h2: "Knippen, kleuren of stylen",
        p: [
          "Tijdens de behandeling leggen we uit wat we doen en waarom. Zo weet je precies hoe je de look thuis zelf onderhoudt. Bij kleurbehandelingen doen we indien nodig vooraf een allergietest.",
        ],
      },
      {
        h2: "De finishing touch en tips voor thuis",
        p: [
          "We föhnen en stylen je haar en geven je concrete tips mee: welke producten je nodig hebt, hoe vaak je terugkomt en hoe je je haar thuis in model brengt.",
        ],
      },
      {
        h2: "Handig om te weten",
        p: ["Een paar praktische zaken voor je eerste bezoek:"],
        list: [
          "Je vindt ons aan de Dorpsdijk 114 in Rhoon, goed bereikbaar vanuit Albrandswaard, Barendrecht en Rotterdam-Zuid.",
          "Plan je afspraak online, dan zie je direct de vrije tijden.",
          "Annuleren kan kosteloos tot 12 uur van tevoren.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hoe lang duurt een eerste afspraak?",
        a: "Reken voor knippen op ongeveer 45 minuten tot een uur. Voor een kleurbehandeling of balayage plannen we meer tijd in, dat zie je bij het boeken.",
      },
      {
        q: "Moet ik met gewassen haar komen?",
        a: "Nee, wassen hoort bij de behandeling. Kom gerust zoals je bent.",
      },
      {
        q: "Waar zit Hair by Cill?",
        a: "Aan de Dorpsdijk 114, 3161 CD Rhoon.",
      },
    ],
    treatment: "knippen",
  },
  {
    slug: "krullen-verzorgen-zonder-pluis",
    title: "Krullen verzorgen",
    accent: "met rust",
    text: "Minder wassen, meer vocht: de basis voor definitie zonder pluis.",
    read: "4 min lezen",
    image: img("1519699047748-de8e457a634e"),
    metaTitle: "Krullen verzorgen: zo krijg je definitie zonder pluis",
    metaDescription:
      "Krullen verzorgen zonder pluis? Onze stylisten leggen uit hoe je krullend haar wast, voedt, stylt en droogt voor mooie definitie. Met routine per stap.",
    h1: "Krullen verzorgen: definitie zonder pluis",
    date: "2026-09-26",
    intro:
      "Krullend haar vraagt een andere aanpak dan steil haar. Het is droger, gevoeliger voor pluis en reageert sterk op wrijving. Met de juiste routine krijg je veerkrachtige krullen met definitie.",
    sections: [
      {
        h2: "Was minder vaak",
        p: [
          "Krullen hebben hun natuurlijke oliën hard nodig. Was je haar twee keer per week met een milde, sulfaatvrije shampoo, en kies tussendoor voor co-washen met alleen conditioner.",
        ],
      },
      {
        h2: "Ontwar alleen met conditioner in je haar",
        p: [
          "Kam krullen nooit droog. Breng een ruime hoeveelheid conditioner aan en ontwar met je vingers of een grove kam, van de punten naar boven. Zo breek je zo min mogelijk krullen.",
        ],
      },
      {
        h2: "Breng styling aan op nat haar",
        p: ["Vocht vasthouden is het geheim van definitie. De basisroutine:"],
        list: [
          "Leave-in conditioner voor vocht.",
          "Krulcrème voor definitie en zachtheid.",
          "Gel of mousse voor houvast.",
          "Kneed de producten in je haar met je handen, van onder naar boven.",
        ],
      },
      {
        h2: "Droog zonder wrijven",
        p: [
          "Dep je haar met een microvezel handdoek of katoenen T-shirt. Laat het aan de lucht drogen of gebruik een diffuser op lage warmte en lage luchtsnelheid. Raak je krullen niet aan tot ze helemaal droog zijn.",
        ],
      },
      {
        h2: "Bescherm je krullen 's nachts",
        p: [
          "Slaap op een zijden of satijnen kussensloop, of draag je haar in een losse knot bovenop je hoofd. Zo wordt je haar minder platgedrukt en ontstaat er minder pluis.",
        ],
      },
      {
        h2: "Laat krullen knippen door een specialist",
        p: [
          "Krullen vallen anders dan steil haar en springen op na het drogen. Een kapper die krullen droog of per krul knipt, houdt rekening met die opspringing, zodat je vorm en balans krijgt in plaats van een driehoek.",
        ],
      },
    ],
    faqs: [
      {
        q: "Waarom pluizen mijn krullen zo?",
        a: "Pluis ontstaat door droogte en wrijving. Meer vocht, minder wassen en drogen zonder te wrijven maakt het grootste verschil.",
      },
      {
        q: "Hoe vaak moet ik krullend haar laten knippen?",
        a: "Om de 10 tot 12 weken, zodat de punten gezond blijven en de vorm in balans blijft.",
      },
    ],
    treatment: "knippen",
  },
];

export const findPost = (slug: string) => posts.find((p) => p.slug === slug);
