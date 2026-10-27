import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.vakantiegeld-berekenen",
  h1: "Vakantiegeld berekenen voor bedienden en arbeiders",
  title: "Vakantiegeld berekenen {{anio}}: dubbel, arbeiders en vertrek",
  description:
    "Bereken je vakantiegeld: dubbel vakantiegeld van {{be.vakantiegeld[dubbel-bediende]}} van je maandloon als bediende, {{be.vakantiegeld[arbeider]}} als arbeider, of je vertrekvakantiegeld.",
  intro: [
    "Hoe je vakantiegeld berekend wordt, hangt af van je statuut. Een bediende krijgt het van zijn werkgever, een arbeider van de RJV of van een vakantiefonds.",
    "Kies je situatie en vul je loon in. Je ziet je bruto vakantiegeld en, als bediende, ook de RSZ die erop ingehouden wordt.",
  ],
  comoSeCalcula: [
    "Bediende: het enkel vakantiegeld is je gewone loon tijdens je vakantiedagen. Het dubbel vakantiegeld is {{be.vakantiegeld[dubbel-bediende]}} van je brutomaandloon, in verhouding tot het aantal maanden dat je vorig jaar gewerkt hebt.",
    "Op het dubbel vakantiegeld gaat {{be.rsz-werknemer}} RSZ, berekend op 85/92 van het bedrag.",
    "Arbeider: {{be.vakantiegeld[arbeider]}} van je brutoloon van vorig jaar, verhoogd tot 108 %. Dat bedrag dekt enkel en dubbel vakantiegeld samen.",
    "Vertrek: ga je als bediende uit dienst, dan krijg je {{be.vakantiegeld[vertrek]}} van het brutoloon dat je dit jaar verdiende bij die werkgever.",
  ],
  ejemplo: [
    "Een bediende met € 3.100 bruto die vorig jaar het hele jaar werkte, krijgt € 2.852 dubbel vakantiegeld. Daarop gaat € 344,39 RSZ af.",
  ],
  faq: [
    {
      pregunta: "Waarom krijgt een arbeider zijn vakantiegeld van de RJV?",
      respuesta:
        "Voor arbeiders betaalt de werkgever bijdragen voor de vakantieregeling aan de RSZ. De Rijksdienst voor Jaarlijkse Vakantie of een vakantiefonds betaalt daarmee het vakantiegeld uit.",
    },
    {
      pregunta: "Waarom wordt de RSZ berekend op 85/92 van het dubbel vakantiegeld?",
      respuesta:
        "De RSZ int de bijdrage van {{be.rsz-werknemer}} niet op het deel dat overeenstemt met het loon vanaf de derde dag van de vierde vakantieweek. Dat deel valt weg door het bedrag te vermenigvuldigen met 85/92.",
    },
    {
      pregunta: "Wat is vertrekvakantiegeld?",
      respuesta:
        "Het vakantiegeld dat een bediende krijgt als zijn contract eindigt. Het bestaat uit een enkel en een dubbel deel en bedraagt samen {{be.vakantiegeld[vertrek]}} van het brutoloon.",
    },
  ],
  glosario: [
    { termino: "Enkel vakantiegeld", definicion: "Het gewone loon voor je wettelijke vakantiedagen." },
    { termino: "Dubbel vakantiegeld", definicion: "Een extra bedrag bovenop je loon, één keer per jaar." },
    { termino: "RJV", definicion: "Rijksdienst voor Jaarlijkse Vakantie, die het vakantiegeld van veel arbeiders uitbetaalt." },
    { termino: "Vakantiedienstjaar", definicion: "Het jaar waarin je werkt en zo vakantie en vakantiegeld opbouwt voor het jaar daarna." },
  ],
});
