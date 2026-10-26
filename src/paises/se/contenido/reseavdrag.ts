import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.reseavdrag",
  h1: "Räkna ut reseavdrag för resor till jobbet",
  title: "Reseavdrag 2026: räkna ut avdraget för resor till jobbet",
  description:
    "Räkna ut ditt reseavdrag för 2026. Egen bil ger {{se.reseavdrag[egen-bil]}} per mil, och du får dra av kostnaden över {{se.reseavdrag[grans]}}.",
  intro: [
    "Reser du långt till jobbet kan du få göra avdrag för resorna i deklarationen. Avdraget gäller bara den del av kostnaden som är högre än beloppsgränsen.",
    "För inkomståret 2026 höjdes gränsen till {{se.reseavdrag[grans]}}. Kalkylatorn räknar ut avdraget med Skatteverkets schablon för bil eller med vad kollektivtrafiken kostar.",
  ],
  comoSeCalcula: [
    "Med bil räknar du hur många mil du kör till och från jobbet under året: avstånd enkel väg × 2 × antal arbetsdagar / 10.",
    "Milen gånger schablonbeloppet är kostnaden: {{se.reseavdrag[egen-bil]}} per mil för egen bil, {{se.reseavdrag[formansbil]}} för förmånsbil och {{se.reseavdrag[formansbil-el]}} för förmånsbil som drivs helt med el.",
    "Med kollektivtrafik är kostnaden det du betalar för biljetterna.",
    "Avdraget är kostnaden minus {{se.reseavdrag[grans]}}.",
  ],
  ejemplo: ["Kör du 40 kilometer enkel väg 200 dagar om året blir det 1 600 mil. Med egen bil är kostnaden 40 000 kronor och avdraget 25 000 kronor."],
  faq: [
    {
      pregunta: "När får jag göra avdrag för bilresor till jobbet?",
      respuesta:
        "När du regelbundet sparar minst två timmar per dag jämfört med kollektivtrafik och har minst fem kilometer mellan bostaden och arbetsplatsen. Regelbundet betyder minst 160 dagar om året vid heltid.",
    },
    {
      pregunta: "Hur mycket får man dra av per mil?",
      respuesta: "{{se.reseavdrag[egen-bil]}} per mil med egen bil, även el- och hybridbil, och {{se.reseavdrag[motorcykel]}} per mil med motorcykel.",
    },
    {
      pregunta: "Hur mycket sänker avdraget skatten?",
      respuesta: "Avdraget minskar den inkomst du betalar skatt på. Skatten sjunker med ungefär din kommunalskatt på avdragets belopp, och mer om du betalar statlig skatt.",
    },
  ],
  glosario: [
    { termino: "Reseavdrag", definicion: "Avdrag i deklarationen för resor mellan bostaden och arbetsplatsen." },
    { termino: "Mil", definicion: "Tio kilometer." },
  ],
});
