import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.folkepension",
  h1: "Folkepension: hvornår og hvor meget?",
  title: "Folkepension 2026: beregn alder og beløb",
  description:
    "Se din folkepensionsalder ud fra din fødselsdato, og beregn folkepensionen i 2026: grundbeløb på {{dk.folkepension-grundbeloeb}} plus pensionstillæg.",
  intro: [
    "Folkepensionen består af et grundbeløb og et pensionstillæg. Pensionstillægget bliver mindre, hvis du har anden indkomst.",
    "Skriv din fødselsdato, om du bor alene, og din anden indkomst. Beregneren viser din folkepensionsalder og pensionen før skat.",
  ],
  comoSeCalcula: [
    "Folkepensionsalderen afhænger af, hvornår du er født. Født 1. januar 1971 eller senere giver {{dk.folkepensionsalder[1971-01-01]}}.",
    "Grundbeløbet er {{dk.folkepension-grundbeloeb}} om året.",
    "Pensionstillægget er {{dk.pensionstillaeg[enlig]}} om året for enlige og {{dk.pensionstillaeg[gift]}} for gifte og samlevende.",
    "Har du anden indkomst over fradragsbeløbet ({{dk.pensionstillaeg-fradrag[enlig]}} plus en midlertidig forhøjelse på {{dk.pensionstillaeg-fradrag[enlig-midlertidig]}} for enlige), nedsættes tillægget med {{dk.pensionstillaeg-nedsaettelse[enlig]}} af det overskydende beløb.",
  ],
  ejemplo: ["Bor du alene og har ingen anden indkomst, får du 195.276 kr. om året i 2026. Det er 16.273 kr. om måneden før skat."],
  faq: [
    {
      pregunta: "Hvornår kan jeg gå på folkepension?",
      respuesta: "Er du født 1963-1966, er alderen {{dk.folkepensionsalder[1963-01-01]}}. Født 1967-1970 giver {{dk.folkepensionsalder[1967-01-01]}}, og født fra 1971 giver {{dk.folkepensionsalder[1971-01-01]}}. Alderen kan blive sat op, fordi den følger levetiden.",
    },
    {
      pregunta: "Hvor meget er folkepensionen om måneden?",
      respuesta: "For en enlig uden anden indkomst er den 16.273 kr. om måneden før skat i 2026. Gifte og samlevende får et lavere pensionstillæg.",
    },
    {
      pregunta: "Kan jeg få folkepension, hvis jeg har boet i udlandet?",
      respuesta: "Som hovedregel skal du have boet i Danmark i mindst tre år fra du fyldte 15, til du når folkepensionsalderen. Beregneren regner med fuld pension.",
    },
  ],
  glosario: [
    { termino: "Grundbeløb", definicion: "Den faste del af folkepensionen: {{dk.folkepension-grundbeloeb}} om året." },
    { termino: "Pensionstillæg", definicion: "Et tillæg oven i grundbeløbet, som afhænger af din anden indkomst og om du bor alene." },
    { termino: "Indtægtsgrundlag", definicion: "Den indkomst, Udbetaling Danmark bruger, når pensionstillægget beregnes." },
  ],
});
