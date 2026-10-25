import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.feriepenge",
  h1: "Beregn feriepenge og ferietillæg",
  title: "Beregn feriepenge 2026: 12,5 % eller ferietillæg",
  description:
    "Beregn dine feriepenge på {{dk.feriegodtgoerelse}} af lønnen eller ferietillægget på {{dk.ferietillaeg}}. Se også hvor mange feriedage du har optjent efter ferieloven.",
  intro: [
    "Efter ferieloven optjener du {{dk.ferie-optjening}} feriedage for hver måned, du er ansat. Det giver 5 ugers betalt ferie om året.",
    "Har du timeløn, eller er du fratrådt, får du feriepenge på {{dk.feriegodtgoerelse}} af lønnen. Har du fast månedsløn, får du løn under ferien og et ferietillæg på {{dk.ferietillaeg}}.",
  ],
  comoSeCalcula: [
    "Feriepenge (feriegodtgørelse) er {{dk.feriegodtgoerelse}} af al skattepligtig løn i optjeningsperioden, også din egen pension og am-bidraget.",
    "Ferietillæg er {{dk.ferietillaeg}} af lønnen. Det kommer oven i din almindelige løn under ferien.",
    "Feriedagene er {{dk.ferie-optjening}} dage pr. måneds ansættelse, højst 5 uger om året.",
  ],
  ejemplo: ["Har du tjent 400.000 kr. på et ferieår med timeløn, er dine feriepenge 50.000 kr. før skat. Det er 2.003,21 kr. pr. feriedag."],
  faq: [
    {
      pregunta: "Hvor mange procent er feriepenge?",
      respuesta: "Feriepenge er {{dk.feriegodtgoerelse}} af lønnen før skat. Har du fast månedsløn med løn under ferie, får du i stedet et ferietillæg på {{dk.ferietillaeg}}.",
    },
    {
      pregunta: "Hvornår får jeg ferietillægget udbetalt?",
      respuesta: "Ferietillægget udbetales, når du holder ferien, eller samlet med lønnen for maj og august. Det står i ferielovens § 18.",
    },
    {
      pregunta: "Hvad sker der med mine feriepenge, når jeg stopper?",
      respuesta: "Fratræder du, får du feriepenge på {{dk.feriegodtgoerelse}} af lønnen for den ferie, du har optjent og ikke holdt. Det står i ferielovens § 16, stk. 4.",
    },
    {
      pregunta: "Hvor mange feriedage optjener jeg om måneden?",
      respuesta: "Du optjener {{dk.ferie-optjening}} dage for hver måneds ansættelse. Ferieåret går fra 1. september til 31. august.",
    },
  ],
  glosario: [
    { termino: "Feriegodtgørelse", definicion: "Feriepenge på {{dk.feriegodtgoerelse}} af lønnen. Gælder timelønnede og fratrådte." },
    { termino: "Ferietillæg", definicion: "Et tillæg på {{dk.ferietillaeg}} af lønnen til ansatte med løn under ferie." },
  ],
});
