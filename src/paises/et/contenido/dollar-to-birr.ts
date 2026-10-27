import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.dollar-to-birr",
  h1: "Dollar to birr converter",
  title: "Dollar to birr today: NBE indicative exchange rate",
  description:
    "Convert US dollars to Ethiopian birr and back with the National Bank of Ethiopia indicative rate: {{et.usd}} per dollar on {{et.usd#desde}}.",
  intro: [
    "Convert between US dollars and birr with the indicative daily exchange rate published by the National Bank of Ethiopia. The rate updates every working day.",
  ],
  comoSeCalcula: [
    "Dollars to birr: the amount times the NBE indicative rate. Birr to dollars: the amount divided by the rate.",
    "The rate in use is {{et.usd}} per dollar, published for {{et.usd#desde}}.",
  ],
  ejemplo: [
    "At a rate of 161 birr per dollar, US$100 is ETB 16,100.",
  ],
  faq: [
    {
      pregunta: "What is the indicative rate?",
      respuesta: "The NBE explains it as the weighted average rate of the foreign exchange deals banks made the previous day. It is a reference, not a rate banks must use.",
    },
    {
      pregunta: "Why does my bank give a different rate?",
      respuesta: "Each bank quotes its own buying and selling rates. The indicative rate is only a reference figure.",
    },
    {
      pregunta: "Is the rate published at weekends?",
      respuesta: "No. The NBE publishes it on working days, so at a weekend the calculator uses the last rate published.",
    },
  ],
  glosario: [
    { termino: "NBE", definicion: "National Bank of Ethiopia, the central bank." },
    { termino: "Birr", definicion: "The currency of Ethiopia (ETB)." },
  ],
});
