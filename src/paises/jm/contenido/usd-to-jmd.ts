import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.usd-to-jmd",
  h1: "USD to JMD converter",
  title: "USD to JMD today: Bank of Jamaica exchange rate",
  description:
    "Convert US dollars to Jamaican dollars and back with the Bank of Jamaica weighted average rates. Selling rate of {{jm.usd-sell#desde}}: {{jm.usd-sell}}.",
  intro: [
    "The Bank of Jamaica publishes the weighted average rates at which banks and cambios bought and sold US dollars on the last trading day.",
    "Enter an amount to convert it. US dollars into Jamaican dollars use the buying rate, and Jamaican dollars into US dollars use the selling rate.",
  ],
  comoSeCalcula: [
    "US$ to J$: amount × the BOJ weighted average buying rate ({{jm.usd-buy}} per US dollar).",
    "J$ to US$: amount ÷ the BOJ weighted average selling rate ({{jm.usd-sell}} per US dollar).",
    "The rates are those of {{jm.usd-sell#desde}}.",
  ],
  ejemplo: ["With a buying rate of J$158.1879, US$100 is J$15,818.79."],
  faq: [
    {
      pregunta: "Why is my bank's rate different?",
      respuesta: "Each bank and cambio sets its own rate and margin. The BOJ figure is the average of the trades in the market, so it is a fair reference.",
    },
    {
      pregunta: "What is the difference between the buying and selling rate?",
      respuesta: "The buying rate is what dealers pay you for US dollars. The selling rate is what you pay them to buy US dollars. The selling rate is higher.",
    },
    {
      pregunta: "How often is the rate updated?",
      respuesta: "The Bank of Jamaica posts the weighted average rates for each trading day. This page updates when a new rate is posted.",
    },
  ],
  glosario: [
    { termino: "Weighted average rate", definicion: "The average rate of all the trades in the day, giving more weight to the larger ones." },
    { termino: "Cambio", definicion: "A licensed foreign exchange bureau." },
  ],
});
