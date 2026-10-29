import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.nhima-calculator",
  h1: "NHIMA contribution calculator",
  title: "NHIMA calculator Zambia: health insurance on your pay",
  description: "Work out your NHIMA contribution: {{zm.nhima-rate}} of basic pay from you and the same from your employer.",
  intro: [
    "Enter your basic monthly pay and see what you and your employer pay to the National Health Insurance Scheme.",
  ],
  comoSeCalcula: [
    "In the formal sector you pay {{zm.nhima-rate}} of your basic salary.",
    "Your employer adds another {{zm.nhima-rate}} of your basic salary.",
    "Allowances, overtime and bonuses are not part of the calculation.",
  ],
  ejemplo: ["On basic pay of K10,000 you pay K100 and your employer pays K100, K200 in total."],
  faq: [
    {
      pregunta: "When are NHIMA premiums due?",
      respuesta: "Premiums are due for remittance by the 10th of each month.",
    },
    {
      pregunta: "What happens if my employer pays late?",
      respuesta: "NHIMA charges a penalty of 10% of the outstanding monthly contribution, up to K60,000.",
    },
    {
      pregunta: "How soon can I use NHIMA services?",
      respuesta: "Fully paid members can use NHIMA services four months after registration.",
    },
  ],
  glosario: [
    { termino: "NHIMA", definicion: "National Health Insurance Management Authority." },
    { termino: "Basic salary", definicion: "Your pay before allowances, overtime and bonuses." },
  ],
});
