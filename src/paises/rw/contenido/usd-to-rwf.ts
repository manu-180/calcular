import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.usd-to-rwf",
  h1: "USD to RWF converter",
  title: "USD to RWF today: BNR exchange rate converter",
  description: "Convert US dollars or euros to Rwandan francs, and back, at the National Bank of Rwanda average rate: {{rw.usd}} per dollar on {{rw.usd#desde}}.",
  intro: [
    "Convert between Rwandan francs, US dollars and euros with the official average rate published by the National Bank of Rwanda (BNR).",
  ],
  comoSeCalcula: [
    "The BNR publishes a buying and a selling rate every working day. The average rate is the midpoint of the two.",
    "Today's average: {{rw.usd}} per US dollar and {{rw.eur}} per euro.",
  ],
  ejemplo: ["At 1,476.015 francs per dollar, US$100 is RWF 147,602."],
  faq: [
    {
      pregunta: "Why does my bank give a different rate?",
      respuesta: "Banks and forex bureaus set their own buying and selling prices around the market. The BNR rate is the reference.",
    },
    {
      pregunta: "How often is the rate updated?",
      respuesta: "The BNR publishes new rates every working day. This page takes the latest one.",
    },
    {
      pregunta: "Which rate do I use for customs and tax?",
      respuesta: "Check the rate your RRA declaration asks for. This page shows the BNR average rate for reference.",
    },
  ],
  glosario: [
    { termino: "BNR", definicion: "National Bank of Rwanda, the central bank." },
    { termino: "Average rate", definicion: "The midpoint between the BNR buying and selling rates." },
  ],
});
