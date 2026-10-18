import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.dollar-to-pkr",
  h1: "Dollar to rupee at the State Bank rate",
  title: "Dollar to PKR today: State Bank of Pakistan rate",
  description: "Convert US dollars to Pakistani rupees and back with the M2M revaluation rate published by the State Bank of Pakistan.",
  intro: [
    "Enter an amount to convert between dollars and rupees at the latest rate the State Bank of Pakistan publishes.",
    "Banks and exchange companies buy and sell at their own prices, which can be different.",
  ],
  comoSeCalcula: [
    "The rate used is the SBP M2M revaluation rate for the day shown.",
    "Dollars to rupees: amount × rate. Rupees to dollars: amount ÷ rate.",
  ],
  ejemplo: ["At Rs. 276.91 per dollar, US$100 is Rs. 27,691.15."],
  faq: [
    {
      pregunta: "What is the M2M rate?",
      respuesta: "The mark-to-market revaluation rate the State Bank publishes each day for the dollar.",
    },
    {
      pregunta: "Why does my bank charge more?",
      respuesta: "Banks add their own margin when they sell dollars. The SBP rate is a reference, not a retail price.",
    },
  ],
  glosario: [{ termino: "SBP", definicion: "State Bank of Pakistan, the central bank." }],
});
