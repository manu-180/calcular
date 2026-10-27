import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.napsa-calculator",
  h1: "NAPSA calculator",
  title: "NAPSA calculator Zambia 2026: your pension contribution",
  description: "Work out the NAPSA contribution on your monthly pay: {{zm.napsa-rate}} from you and the same from your employer, up to the earnings ceiling.",
  intro: [
    "Enter your gross monthly pay and see what you and your employer pay into the national pension scheme.",
  ],
  comoSeCalcula: [
    "You pay {{zm.napsa-rate}} of your gross pay and your employer pays the same amount.",
    "Pay above the monthly earnings ceiling of {{zm.napsa-ceiling}} is left out, so the contribution stops growing there.",
  ],
  ejemplo: ["On gross pay of K10,000 you pay K500 and your employer pays K500."],
  faq: [
    {
      pregunta: "Is NAPSA taken off before PAYE?",
      respuesta: "No. PAYE is worked out on your gross pay, so NAPSA does not lower your tax.",
    },
    {
      pregunta: "When does my employer pay NAPSA?",
      respuesta: "Contributions are due by the 10th of the following month.",
    },
    {
      pregunta: "Does my employer's share come out of my pay?",
      respuesta: "No. The employer's share is an extra cost for the employer and does not reduce your pay.",
    },
  ],
  glosario: [
    { termino: "NAPSA", definicion: "National Pension Scheme Authority, which runs the national pension scheme." },
    { termino: "Earnings ceiling", definicion: "The highest monthly pay NAPSA contributions are worked out on." },
  ],
});
