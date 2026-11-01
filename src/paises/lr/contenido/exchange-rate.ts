import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.exchange-rate",
  h1: "US dollar to Liberian dollar exchange rate",
  title: "USD to LRD today: Central Bank of Liberia rates",
  description: "Convert US dollars to Liberian dollars and back with the market buying and selling rates published by the Central Bank of Liberia, updated every working day.",
  intro: [
    "Convert between US dollars and Liberian dollars with the latest Central Bank of Liberia (CBL) rates.",
    "On {{lr.usd-lrd-buying#desde}} the CBL market buying rate was {{lr.usd-lrd-buying}} per US dollar and the selling rate {{lr.usd-lrd-selling}}.",
  ],
  comoSeCalcula: [
    "US dollars to Liberian dollars: amount × the CBL market buying rate.",
    "Liberian dollars to US dollars: amount ÷ the CBL market selling rate.",
  ],
  ejemplo: ["At a buying rate of L$169.2950, US$100 is worth L$16,929.50."],
  faq: [
    {
      pregunta: "Why are there two rates?",
      respuesta: "The buying rate is what the market pays for a US dollar and the selling rate is what it charges. The gap between them is the margin.",
    },
    {
      pregunta: "How often does the CBL publish the rates?",
      respuesta: "Every working day, including most Saturdays, on its Daily Exchange Rates page.",
    },
    {
      pregunta: "Which rate do I use for income tax on a US dollar salary?",
      respuesta: "The LRA PIT calculator for US dollar salaries asks you to enter the exchange rate and does not fix one. Use the rate your employer applies.",
    },
  ],
  glosario: [
    { termino: "CBL", definicion: "Central Bank of Liberia, which publishes the daily market buying and selling rates." },
    { termino: "L$", definicion: "The Liberian dollar (LRD)." },
  ],
});
