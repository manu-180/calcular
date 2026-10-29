import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.su-beregner",
  h1: "SU-beregner: hvor meget SU får du i {{anio}}?",
  title: "SU {{anio}}: beregn din SU som ude- eller hjemmeboende",
  description:
    "Beregn din SU på en videregående uddannelse i {{anio}}. Udeboende får {{dk.su-udeboende}} om måneden. Hjemmeboende får grundsats plus tillæg efter forældrenes indkomst.",
  intro: [
    "SU'en på en videregående uddannelse afhænger af, om du bor hjemme. Bor du hjemme, betyder dine forældres indkomst også noget.",
    "Vælg hvor du bor. Bor du hjemme, så skriv dine forældres indkomst og antal søskende under 18 år.",
  ],
  comoSeCalcula: [
    "Udeboende får {{dk.su-udeboende}} pr. måned før skat, uanset forældrenes indkomst.",
    "Hjemmeboende får en grundsats på {{dk.su-hjemmeboende[grundsats]}} og et tillæg, der afhænger af forældrenes indkomst to år tilbage.",
    "Fuldt tillæg ({{dk.su-hjemmeboende[hoejst]}} i alt) får du, når forældrenes indkomst er højst {{dk.su-foraeldreindkomst[fuldt-tillaeg]}}. Fra {{dk.su-foraeldreindkomst[intet-tillaeg]}} er der intet tillæg.",
    "For hver søskende under 18 år trækkes {{dk.su-foraeldreindkomst[soeskendefradrag]}} fra forældrenes indkomst.",
  ],
  ejemplo: ["Bor du hjemme, og har dine forældre 700.000 kr. i indkomst, får du 1.225 kr. om måneden før skat."],
  faq: [
    {
      pregunta: "Hvor meget får man i SU som udeboende?",
      respuesta: "Som udeboende på en videregående uddannelse får du {{dk.su-udeboende}} om måneden før skat i 2026.",
    },
    {
      pregunta: "Hvad får man i SU, når man bor hjemme?",
      respuesta: "Grundsatsen er {{dk.su-hjemmeboende[grundsats]}} om måneden. Med tillæg kan du få op til {{dk.su-hjemmeboende[hoejst]}}, hvis dine forældre tjener lidt.",
    },
    {
      pregunta: "Hvilket år bruges mine forældres indkomst fra?",
      respuesta: "SU i 2026 bruger forældrenes indkomstgrundlag fra 2024, altså to år tilbage.",
    },
    {
      pregunta: "Gælder satserne for alle hjemmeboende?",
      respuesta: "Satserne gælder, når du er begyndt på din uddannelse 1. juli 2014 eller senere. Er du begyndt før, gælder andre satser.",
    },
  ],
  glosario: [
    { termino: "Udeboende", definicion: "Du bor ikke på samme adresse som dine forældre." },
    { termino: "Grundsats", definicion: "Den del af SU'en til hjemmeboende, som ikke afhænger af forældrenes indkomst." },
  ],
});
