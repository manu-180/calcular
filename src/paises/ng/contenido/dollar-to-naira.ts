import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.dollar-to-naira",
  h1: "Dollar to naira at the official NFEM rate",
  title: "Dollar to naira today: official CBN NFEM rate",
  description: "Convert US dollars to naira and back at the official rate of the Nigerian Foreign Exchange Market (NFEM) published by the Central Bank of Nigeria.",
  intro: [
    "Enter an amount to convert between US dollars and naira at the latest NFEM rate published by the Central Bank of Nigeria.",
    "Banks, bureaux de change and card payments use their own prices, which can be different.",
  ],
  comoSeCalcula: [
    "The NFEM rate is the volume-weighted average of the deals done in the official market on that day.",
    "Dollars to naira: amount × rate. Naira to dollars: amount ÷ rate.",
    "On days without trading, the last published rate is used.",
  ],
  ejemplo: ["At ₦1,331.61 per dollar, US$100 is ₦133,161.39."],
  faq: [
    {
      pregunta: "Why is this rate different from the street rate?",
      respuesta: "The NFEM rate comes from trades in the official market. Other channels set their own prices.",
    },
    {
      pregunta: "How often does the rate change?",
      respuesta: "The CBN publishes a new NFEM rate for each trading day.",
    },
    {
      pregunta: "Which rate does the CBN publish?",
      respuesta: "For each day it shows the NFEM rate, the highest, lowest and closing rates, and the turnover. This page uses the NFEM rate.",
    },
  ],
  glosario: [
    { termino: "NFEM", definicion: "Nigerian Foreign Exchange Market, the official market for naira and foreign currency." },
    { termino: "CBN", definicion: "Central Bank of Nigeria." },
  ],
});
