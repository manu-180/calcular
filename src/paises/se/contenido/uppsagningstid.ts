import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.uppsagningstid",
  h1: "Räkna ut din uppsägningstid enligt LAS",
  title: "Uppsägningstid enligt LAS: räkna ut hur lång din är",
  description:
    "Räkna ut uppsägningstiden enligt lagen om anställningsskydd. Från {{se.uppsagningstid[under-2]}} upp till {{se.uppsagningstid[over-10]}} beroende på hur länge du har varit anställd.",
  intro: [
    "Hur lång uppsägningstiden är beror på vem som säger upp och hur länge du har varit anställd hos arbetsgivaren.",
    "Säger arbetsgivaren upp dig blir tiden längre ju längre du har arbetat där. Säger du upp dig själv gäller en månad enligt lagen.",
  ],
  comoSeCalcula: [
    "För både arbetsgivare och arbetstagare gäller minst {{se.uppsagningstid[under-2]}} uppsägningstid.",
    "Har du varit anställd minst två men kortare än fyra år har du rätt till {{se.uppsagningstid[2-4]}}, och fyra men kortare än sex år ger {{se.uppsagningstid[4-6]}}.",
    "Sex men kortare än åtta år ger {{se.uppsagningstid[6-8]}}, och åtta men kortare än tio år ger {{se.uppsagningstid[8-10]}}.",
    "Efter tio år eller mer är uppsägningstiden {{se.uppsagningstid[over-10]}}.",
  ],
  ejemplo: ["Har du arbetat hos samma arbetsgivare i fyra år och blir uppsagd har du tre månaders uppsägningstid. Säger du upp dig själv är den en månad."],
  faq: [
    {
      pregunta: "Får jag lön under uppsägningstiden?",
      respuesta: "Ja. Du behåller lön och andra förmåner under uppsägningstiden, även om arbetsgivaren inte ger dig några arbetsuppgifter.",
    },
    {
      pregunta: "Kan uppsägningstiden vara längre än i lagen?",
      respuesta: "Ja. Ett kollektivavtal eller ditt anställningsavtal kan ha andra regler. Kalkylatorn visar vad lagen om anställningsskydd säger.",
    },
    {
      pregunta: "Räknas tid hos en tidigare arbetsgivare?",
      respuesta: "Nej, det är den sammanlagda anställningstiden hos samma arbetsgivare som räknas.",
    },
    {
      pregunta: "Får jag söka nytt jobb under uppsägningstiden?",
      respuesta: "Ja. En uppsagd arbetstagare har rätt till skälig ledighet med lön för att besöka arbetsförmedlingen eller söka arbete på annat sätt.",
    },
  ],
  glosario: [
    { termino: "LAS", definicion: "Lagen om anställningsskydd, som bland annat reglerar uppsägningstid." },
    { termino: "Uppsägningstid", definicion: "Tiden från uppsägningen tills anställningen tar slut." },
  ],
});
