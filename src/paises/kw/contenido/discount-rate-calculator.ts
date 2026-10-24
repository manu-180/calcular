import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "kw.discount-rate-calculator",
  h1: "CBK discount rate and your loan",
  title: "CBK discount rate calculator: your loan instalment",
  description: "See how a change in the Central Bank of Kuwait discount rate, now {{kw.discount-rate}}, would move the monthly instalment of your loan.",
  intro: [
    "The Central Bank of Kuwait sets the discount rate. Enter your loan and a change to test to see your new monthly instalment.",
    "The current discount rate comes from the CBK key figures.",
  ],
  comoSeCalcula: [
    "Your current instalment is worked out with the standard loan formula for the months left.",
    "Your new rate is your current rate plus the change you test.",
    "The new instalment uses the new rate over the same months, and the calculator shows the difference.",
  ],
  ejemplo: ["On KD 15,000 over 60 months at 5.5%, a cut of 0.25 points lowers the instalment from KD 286.517 to KD 284.790."],
  faq: [
    {
      pregunta: "What is the CBK discount rate now?",
      respuesta: "{{kw.discount-rate}}, as published by the Central Bank of Kuwait on {{kw.discount-rate#desde}}.",
    },
    {
      pregunta: "Does every loan change with the discount rate?",
      respuesta: "Fixed-rate loans do not change during their fixed period. This calculator assumes the whole change reaches your rate.",
    },
    {
      pregunta: "Where does the figure come from?",
      respuesta: "From the Key Figures panel on the Central Bank of Kuwait website.",
    },
  ],
  glosario: [
    { termino: "Discount rate", definicion: "The Central Bank of Kuwait's reference interest rate." },
    { termino: "Instalment", definicion: "The fixed monthly payment on a loan." },
  ],
});
