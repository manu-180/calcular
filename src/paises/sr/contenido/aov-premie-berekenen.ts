import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.aov-premie-berekenen",
  h1: "AOV-premie berekenen",
  title: "AOV-premie berekenen 2026: {{sr.aov-premie}} van je zuiver loon",
  description:
    "Hoeveel AOV-premie betaal je? Werknemers en zelfstandigen betalen {{sr.aov-premie}} over hun zuiver loon of zuiver inkomen, tot 60 jaar. Bereken het per maand en per jaar.",
  intro: [
    "Met de AOV-premie bouw je mee aan de Algemene Oudedagsvoorziening, de uitkering die iedereen in Suriname vanaf 60 jaar krijgt.",
    "Als werknemer houdt je werkgever de premie elke maand op je loon in. Als zelfstandige betaal je de premie via je aangifte of aanslag bij de Belastingdienst.",
  ],
  comoSeCalcula: [
    "Werknemer: van het brutoloon gaat de vaste aftrek beroepskosten af ({{sr.forfaitaire-aftrek}}, maximaal {{sr.forfaitaire-aftrek-max}} per jaar). Over het zuiver loon dat overblijft betaal je {{sr.aov-premie}}.",
    "Zelfstandige: je betaalt {{sr.aov-premie}} over je zuiver inkomen van het jaar.",
    "Ben je 60 of ouder, dan betaal je geen premie meer.",
  ],
  ejemplo: ["Met een brutoloon van SRD 15.000 per maand is het zuiver loon SRD 175.200 per jaar. De AOV-premie is SRD 7.008 per jaar, dat is SRD 584 per maand."],
  faq: [
    {
      pregunta: "Wie betaalt AOV-premie?",
      respuesta: "Iedereen die in Suriname woont, jonger is dan 60 jaar en loon of winst uit bedrijf of beroep geniet. Leden van diplomatieke missies en sommige werknemers van internationale organisaties zijn uitgezonderd.",
    },
    {
      pregunta: "Is er een maximum aan de AOV-premie?",
      respuesta: "De Wet AOV noemt geen maximum. De premie is {{sr.aov-premie}} van de hele grondslag.",
    },
    {
      pregunta: "Krijg ik mijn premie terug als ik naar het buitenland vertrek?",
      respuesta: "De Wet AOV kent geen regeling om betaalde premie terug te geven bij vertrek of bij het einde van je dienstverband.",
    },
  ],
  glosario: [
    { termino: "AOV", definicion: "Algemene Oudedagsvoorziening: het algemene ouderdomspensioen van de staat." },
    { termino: "Grondslag", definicion: "Het bedrag waarover de premie wordt berekend: het zuiver loon of het zuiver inkomen." },
  ],
});
