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
  /** Visible H1: the question people actually type into Google. */
  h1: string;
  /** "Kort antwoord": the direct answer, shown right under the H1 so readers have it at once. */
  answer: string;
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
    h1: "Hoe houd je balayage langer mooi?",
    answer:
      "Was je haar twee tot drie keer per week lauw met een sulfaatvrije shampoo, gebruik altijd een hittebeschermer en laat tussen je afspraken door een toner zetten. Dan blijft je balayage drie tot vier maanden mooi voordat hij bijgewerkt hoeft te worden.",
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
    treatment: "folies",
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
    h1: "Hoe föhn je je haar zonder hitteschade?",
    answer:
      "Laat je haar eerst voor zo'n zeventig procent aan de lucht drogen, spray een hittebeschermer, föhn op de middelste warmtestand met het mondstuk erop en houd de föhn zo'n 15 centimeter van je haar. Sluit af met de koude knop voor glans.",
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
    accent: "bij jouw haar?",
    text: "Droog, fijn of gekleurd: zo kies je een verzorging die echt iets doet.",
    read: "5 min lezen",
    image: img("1595476108010-b4d1f102b1b1"),
    metaTitle: "Welk haarmasker past bij jouw haar? Advies per haartype",
    metaDescription:
      "Droog, fijn, gekleurd of krullend haar: welk haarmasker kies je? Onze kappers leggen per haartype uit wat werkt en hoe vaak je een masker gebruikt.",
    h1: "Welk haarmasker past bij jouw haar?",
    answer:
      "Droog of beschadigd haar: een rijk masker met olie en keratine. Fijn haar: een licht, hydraterend masker, alleen in de punten. Gekleurd haar: een repair- of bond-building masker. Krullen: veel vocht. Gebruik het een tot twee keer per week.",
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
    h1: "Wat kun je verwachten bij je eerste afspraak bij de kapper?",
    answer:
      "We beginnen met een persoonlijk adviesgesprek, daarna wassen we je haar en volgt de behandeling. We leggen uit wat we doen en geven tips mee voor thuis. Reken voor knippen op 45 minuten tot een uur, voor kleur op meer tijd.",
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
    accent: "zonder pluis",
    text: "Minder wassen, meer vocht: de basis voor definitie zonder pluis.",
    read: "4 min lezen",
    image: img("1519699047748-de8e457a634e"),
    metaTitle: "Krullen verzorgen: zo krijg je definitie zonder pluis",
    metaDescription:
      "Krullen verzorgen zonder pluis? Onze stylisten leggen uit hoe je krullend haar wast, voedt, stylt en droogt voor mooie definitie. Met routine per stap.",
    h1: "Hoe verzorg je krullen zonder pluis?",
    answer:
      "Was krullen maar twee keer per week met een milde shampoo, ontwar alleen met conditioner in je haar, breng styling aan op nat haar en dep in plaats van te wrijven. Slaap op zijde of satijn tegen pluis in de nacht.",
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
  {
    slug: "hoe-vaak-haar-wassen",
    title: "Hoe vaak moet je",
    accent: "je haar wassen?",
    text: "Elke dag, twee keer per week of nog minder? Het hangt af van je hoofdhuid en haartype.",
    read: "3 min lezen",
    image: img("1634449571010-02389ed0f9b0"),
    metaTitle: "Hoe vaak moet je je haar wassen? Advies per haartype",
    metaDescription:
      "Hoe vaak je je haar moet wassen hangt af van je hoofdhuid en haartype. Onze kappers uit Rhoon geven advies voor fijn, droog, krullend en gekleurd haar.",
    h1: "Hoe vaak moet je je haar wassen?",
    answer:
      "Voor de meeste mensen is twee tot drie keer per week genoeg. Heb je fijn haar of een snel vettende hoofdhuid, dan mag het om de dag. Droog, gekleurd of krullend haar was je beter maar een tot twee keer per week.",
    date: "2026-09-29",
    intro:
      "Het is een van de vragen die we in de salon het vaakst horen. Het eerlijke antwoord: er is geen vast getal dat voor iedereen klopt. Je hoofdhuid, je haartype en je dag bepalen samen wat goed is. Zo kom je achter jouw ritme.",
    sections: [
      {
        h2: "Advies per haartype",
        p: ["Een richtlijn om mee te beginnen:"],
        list: [
          "Fijn of snel vettend haar: om de dag, met een milde shampoo.",
          "Normaal haar: twee tot drie keer per week.",
          "Droog of beschadigd haar: een tot twee keer per week.",
          "Gekleurd haar: twee keer per week, met een kleurbeschermende shampoo.",
          "Krullend of kroeshaar: een keer per week, tussendoor eventueel alleen conditioner.",
        ],
      },
      {
        h2: "Is elke dag wassen slecht?",
        p: [
          "Niet per se, maar met een krachtige shampoo haal je ook de natuurlijke oliën weg die je haar soepel houden. Je hoofdhuid kan daar juist op reageren door meer talg aan te maken. Wil je toch dagelijks wassen, kies dan een milde shampoo en gebruik weinig product.",
        ],
      },
      {
        h2: "Kun je je hoofdhuid 'wennen' aan minder wassen?",
        p: [
          "Veel mensen merken dat hun haar minder snel vet wordt als ze de tijd tussen twee wasbeurten stap voor stap met een dag verlengen. Een droogshampoo helpt je de tussenliggende dag door. Gebruik die wel met mate en spoel hem bij de volgende wasbeurt goed uit.",
        ],
      },
      {
        h2: "Zo was je je haar goed",
        p: ["Hoe vaak is belangrijk, hoe je wast minstens zo:"],
        list: [
          "Gebruik lauw water, geen heet water.",
          "Masseer de shampoo alleen in op je hoofdhuid, het schuim reinigt de lengtes.",
          "Breng conditioner aan op de lengtes en punten, niet op de hoofdhuid.",
          "Dep je haar droog in plaats van te wrijven.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is het slecht om je haar maar een keer per week te wassen?",
        a: "Voor droog, krullend of kroeshaar is een keer per week vaak juist goed. Jeukt je hoofdhuid of ruikt je haar, dan is het tijd om vaker te wassen.",
      },
      {
        q: "Moet je na het sporten altijd je haar wassen?",
        a: "Niet altijd. Spoel je haar na het sporten met lauw water en gebruik alleen conditioner, dan hoeft er niet telkens shampoo aan te pas te komen.",
      },
      {
        q: "Hoe vaak mag ik droogshampoo gebruiken?",
        a: "Een tot twee dagen achter elkaar is prima. Daarna is een echte wasbeurt nodig, anders blijven resten op je hoofdhuid achter.",
      },
    ],
    treatment: "knippen",
  },
  {
    slug: "hoe-vaak-naar-de-kapper",
    title: "Hoe vaak moet je",
    accent: "naar de kapper?",
    text: "Kort, halflang of lang, met of zonder kleur: zo lang kun je tussen twee afspraken.",
    read: "3 min lezen",
    image: img("1562322140-8baeececf3df"),
    metaTitle: "Hoe vaak moet je naar de kapper? Advies per lengte en kleur",
    metaDescription:
      "Hoe vaak moet je naar de kapper? Onze stylisten uit Rhoon geven per haarlengte, kleurbehandeling en haartype aan hoeveel weken je tussen afspraken kunt.",
    h1: "Hoe vaak moet je naar de kapper?",
    answer:
      "Kort haar om de vier tot zes weken, halflang haar om de zes tot acht weken en lang haar om de acht tot twaalf weken. Met kleur kom je voor je uitgroei meestal om de vier tot zes weken, balayage kan drie tot vier maanden.",
    date: "2026-09-28",
    intro:
      "Hoe lang je tussen twee kappersbezoeken kunt, hangt vooral af van je haarlengte, je model en of je haar gekleurd is. Laat je het te lang gaan, dan verliest je haar zijn vorm en gaan de punten splijten. Dit is een goede richtlijn.",
    sections: [
      {
        h2: "Per haarlengte",
        p: ["Hoe korter het model, hoe sneller je ziet dat het uitgroeit:"],
        list: [
          "Kort haar en pixie cuts: om de vier tot zes weken.",
          "Bob en halflang haar: om de zes tot acht weken.",
          "Lang haar: om de acht tot twaalf weken, om de punten gezond te houden.",
          "Pony: om de drie tot vier weken even bijknippen.",
        ],
      },
      {
        h2: "Met een kleurbehandeling",
        p: [
          "Bij een volledige kleur zie je na vier tot zes weken uitgroei. Balayage en highlights groeien zachter uit, daar kun je drie tot vier maanden mee. Een toner tussendoor houdt de tint fris zonder dat je opnieuw hoeft te kleuren.",
        ],
      },
      {
        h2: "Wil je je haar laten groeien?",
        p: [
          "Juist dan is knippen belangrijk. Door om de tien tot twaalf weken alleen de punten bij te werken, voorkom je dat splitte punten verder in de haarschacht omhoog scheuren. Zo groeit je haar gezonder en voller.",
        ],
      },
      {
        h2: "Signalen dat het tijd is",
        p: ["Let op deze tekenen:"],
        list: [
          "Je haar laat zich moeilijk in model brengen.",
          "De punten voelen droog, dun of rafelig aan.",
          "Je ziet duidelijk uitgroei of de kleur is dof geworden.",
          "Je pony hangt in je ogen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Wordt je haar sneller lang als je het vaak laat knippen?",
        a: "Nee, knippen heeft geen invloed op hoe snel je haar groeit. Het houdt je punten wel gezond, waardoor je haar er langer en voller uitziet.",
      },
      {
        q: "Kan ik tussendoor alleen mijn pony laten bijknippen?",
        a: "Ja. Plan gewoon een korte afspraak, dan knippen we je pony weer in model.",
      },
    ],
    treatment: "knippen",
  },
  {
    slug: "verschil-balayage-highlights",
    title: "Balayage of highlights:",
    accent: "wat is het verschil?",
    text: "Allebei lichte accenten, maar de techniek, het resultaat en het onderhoud verschillen flink.",
    read: "4 min lezen",
    image: img("1492106087820-71f1a00d2b11"),
    metaTitle: "Verschil tussen balayage en highlights: welke past bij jou?",
    metaDescription:
      "Balayage of highlights? Onze kappers in Rhoon leggen het verschil uit in techniek, resultaat, uitgroei en onderhoud, zodat je weet welke kleur bij jou past.",
    h1: "Wat is het verschil tussen balayage en highlights?",
    answer:
      "Balayage wordt met de hand op je haar geschilderd en loopt zacht en natuurlijk uit, zonder harde uitgroei. Highlights worden met folies aangebracht, van de wortel tot de punt, en geven een gelijkmatiger en lichter resultaat dat wel vaker bijgewerkt moet worden.",
    date: "2026-09-27",
    intro:
      "Balayage en highlights worden vaak door elkaar gehaald. Beide geven je haar lichte accenten, maar de techniek is anders en dat zie je terug in het resultaat en in hoe vaak je terug moet. Zo weet je wat je in de salon vraagt.",
    sections: [
      {
        h2: "Wat is balayage?",
        p: [
          "Balayage komt van het Franse woord voor vegen. De kleur wordt met een kwast uit de losse hand op de buitenkant van je haar geschilderd, vooral op de lengtes en punten. Het resultaat is zacht en natuurlijk, alsof de zon je haar heeft gelicht.",
        ],
      },
      {
        h2: "Wat zijn highlights?",
        p: [
          "Bij highlights worden dunne plukken haar in folie gelegd en van de wortel tot de punt gelicht. De folie houdt de warmte vast, waardoor je haar lichter kan worden. Het effect is gelijkmatiger en opvallender dan bij balayage.",
        ],
      },
      {
        h2: "Het verschil op een rij",
        p: ["De belangrijkste verschillen:"],
        list: [
          "Techniek: balayage uit de losse hand, highlights met folies.",
          "Resultaat: balayage zacht en natuurlijk, highlights egaler en lichter.",
          "Uitgroei: balayage groeit bijna onzichtbaar uit, bij highlights zie je een uitgroeirand.",
          "Onderhoud: balayage na drie tot vier maanden, highlights na zes tot tien weken.",
        ],
      },
      {
        h2: "Welke past bij jou?",
        p: [
          "Wil je weinig onderhoud en een natuurlijke look, dan past balayage vaak beter. Wil je een duidelijk lichter resultaat, of heb je donker haar dat flink omhoog moet, dan zijn highlights met folies de beste keus. In het adviesgesprek kijken we samen naar je haar, je huidtint en hoe vaak je naar de salon wilt komen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is balayage slechter voor je haar dan highlights?",
        a: "Nee. Bij balayage wordt vaak minder haar gelicht, en met een goede verzorging en een bond-building behandeling blijven beide technieken goed voor je haar.",
      },
      {
        q: "Kan ik balayage en highlights combineren?",
        a: "Ja. Veel stylisten combineren een paar folies rond het gezicht met balayage in de lengtes, zodat je gezicht extra oplicht.",
      },
    ],
    treatment: "folies",
  },
];

posts.sort((a, b) => b.date.localeCompare(a.date));

export const findPost = (slug: string) => posts.find((p) => p.slug === slug);
