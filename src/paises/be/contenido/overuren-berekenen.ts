import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.overuren-berekenen",
  h1: "Overuren berekenen: je overloon in België",
  title: "Overuren berekenen: {{be.overloon[week]}} of {{be.overloon[zondag-feestdag]}} overloon",
  description:
    "Bereken wat je overuren bruto opbrengen: je gewone uurloon plus {{be.overloon[week]}} overloon in de week of {{be.overloon[zondag-feestdag]}} op zondag en feestdagen.",
  intro: [
    "Werk je langer dan de normale grenzen van de arbeidsduur, dan heb je recht op overloon bovenop je gewone loon. Op weekdagen, zaterdag inbegrepen, is dat {{be.overloon[week]}}. Op zondag en feestdagen {{be.overloon[zondag-feestdag]}}.",
    "Vul je maandloon, je contracturen en het aantal overuren in. Je ziet je uurloon, de toeslag en het totaal.",
  ],
  comoSeCalcula: [
    "Uurloon: maandloon × 3 ÷ 13 (de weken in een kwartaal) ÷ je uren per week.",
    "Overuren in de week: uurloon × uren × (1 + {{be.overloon[week]}}).",
    "Overuren op zondag of feestdag: uurloon × uren × (1 + {{be.overloon[zondag-feestdag]}}).",
  ],
  ejemplo: [
    "Met € 3.250 bruto en 38 uur per week is je uurloon € 19,74. Vijf overuren in de week leveren € 98,70 plus € 49,35 overloon op.",
  ],
  faq: [
    {
      pregunta: "Wanneer heb ik recht op overloon?",
      respuesta:
        "Voor elk uur boven 9 uur per dag of boven 40 uur per week, of boven de lagere grens die een cao vastlegt. Sinds 2003 is de arbeidsduur in principe 38 uur per week.",
    },
    {
      pregunta: "Op welk loon wordt het overloon berekend?",
      respuesta:
        "Op je gewone loon, met de premies die rechtstreeks bij je prestaties horen en samen met het loon betaald worden, zoals een ploegenpremie of nachtpremie. Een eindejaarspremie telt niet mee.",
    },
    {
      pregunta: "Krijg ik naast overloon ook inhaalrust?",
      respuesta:
        "Vaak wel. Overuren geven in veel gevallen recht op inhaalrust: je krijgt dan het overloon bij het volgende loon en je gewone loon wanneer je de rust opneemt.",
    },
  ],
  glosario: [
    { termino: "Overloon", definicion: "De wettelijke toeslag bovenop je gewone uurloon voor overuren." },
    { termino: "Inhaalrust", definicion: "Vrije tijd die je krijgt om gepresteerde overuren te compenseren." },
  ],
});
