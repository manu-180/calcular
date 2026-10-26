import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.boerne-og-ungeydelse",
  h1: "Børne- og ungeydelse 2026: beregn din børnecheck",
  title: "Børnecheck 2026: beregn børne- og ungeydelse",
  description:
    "Se hvor meget du får i børne- og ungeydelse for hvert barn. Med deling mellem forældre og aftrapning ved indkomst over {{dk.boerneydelse-aftrapning-graense}}.",
  intro: [
    "Børne- og ungeydelsen, også kaldet børnechecken, udbetales for børn under 18 år. Beløbet afhænger af barnets alder.",
    "Skriv hvor mange børn du har i hver aldersgruppe. Beregneren viser ydelsen om året, pr. kvartal og pr. måned.",
  ],
  comoSeCalcula: [
    "0-2 år: {{dk.boerneydelse[0-2]}} om året. 3-6 år: {{dk.boerneydelse[3-6]}}. 7-14 år: {{dk.boerneydelse[7-14]}}. 15-17 år: {{dk.boerneydelse[15-17]}}.",
    "Børneydelsen til 0-14-årige udbetales hvert kvartal. Ungeydelsen til 15-17-årige udbetales hver måned.",
    "Ydelsen deles som udgangspunkt lige mellem barnets to forældre.",
    "Har du en indkomst over {{dk.boerneydelse-aftrapning-graense}}, nedsættes ydelsen med {{dk.boerneydelse-aftrapning-sats}} af det beløb, du ligger over grænsen.",
  ],
  ejemplo: ["Har du et barn på 1 år og deler ydelsen med den anden forælder, får du 10.740 kr. i 2026. Det er 2.685 kr. pr. kvartal."],
  faq: [
    {
      pregunta: "Hvor meget er børnechecken?",
      respuesta: "Fra {{dk.boerneydelse#desde}} er den {{dk.boerneydelse[0-2]}} om året for et barn på 0-2 år, for 3-6 år {{dk.boerneydelse[3-6]}} og for 7-14 år {{dk.boerneydelse[7-14]}}. Unge på 15-17 år giver {{dk.boerneydelse[15-17]}} om året.",
    },
    {
      pregunta: "Hvornår bliver børneydelsen sat ned?",
      respuesta: "Når din indkomst er over {{dk.boerneydelse-aftrapning-graense}} om året. Indkomsten er den samme som grundlaget for topskat, og ydelsen falder med {{dk.boerneydelse-aftrapning-sats}} af det, du tjener over grænsen.",
    },
    {
      pregunta: "Deles børnechecken mellem forældrene?",
      respuesta: "Ja. Fra og med 2022 deles børne- og ungeydelsen som udgangspunkt lige mellem barnets forældre.",
    },
  ],
  glosario: [
    { termino: "Børneydelse", definicion: "Ydelse til børn på 0-14 år. Udbetales kvartalsvis." },
    { termino: "Ungeydelse", definicion: "Ydelse til unge på 15-17 år. Udbetales månedsvis." },
    { termino: "Aftrapning", definicion: "Nedsættelse af ydelsen, når indkomsten er over grænsen." },
  ],
});
