import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.shif-calculator",
  h1: "SHIF contribution calculator",
  title: "SHIF calculator Kenya: your monthly SHA contribution",
  description: "SHIF is {{ke.shif-rate}} of gross monthly income with a minimum of {{ke.shif-minimum}}. See what you pay a month and a year, salaried or self-employed.",
  intro: [
    "The Social Health Insurance Fund (SHIF) replaced NHIF. Every household contributes, and the Social Health Authority (SHA) runs it.",
    "Enter your gross monthly income to see your contribution. There is no upper limit, so it grows with your pay.",
  ],
  comoSeCalcula: [
    "Salaried workers pay {{ke.shif-rate}} of gross salary. Your employer deducts it and sends it to SHA.",
    "If you are not salaried, SHA works out your household income through means testing and charges the same {{ke.shif-rate}}.",
    "Whatever the income, the contribution is at least {{ke.shif-minimum}} a month.",
  ],
  ejemplo: ["On a salary of KSh 50,000 a month, SHIF is KSh 1,375, or KSh 16,500 a year."],
  faq: [
    {
      pregunta: "Is there a maximum SHIF contribution?",
      respuesta: "No. SHA applies {{ke.shif-rate}} with no upper limit for any group.",
    },
    {
      pregunta: "Does SHIF reduce my PAYE?",
      respuesta: "Yes. KRA treats SHIF contributions as an allowable deduction, so they come off your pay before tax.",
    },
    {
      pregunta: "What if I earn very little?",
      respuesta: "You still pay the minimum of {{ke.shif-minimum}} a month.",
    },
  ],
  glosario: [
    { termino: "SHA", definicion: "Social Health Authority, the body that runs SHIF." },
    { termino: "Means testing", definicion: "How SHA estimates the income of households without a salary." },
  ],
});
