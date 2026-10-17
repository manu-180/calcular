import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.quebec-vacation-pay",
  h1: "Quebec vacation pay calculator",
  title: "Quebec vacation pay: 4% or 6% of your wages",
  description: "Work out your minimum vacation pay under Quebec's Act respecting labour standards, from your gross wages and your years of continuous service.",
  intro: [
    "Enter your gross wages for the reference year and your years of continuous service to see the minimum vacation pay under Quebec law.",
    "Your employer can give more through your contract or a collective agreement, never less.",
  ],
  comoSeCalcula: [
    "Vacation pay is {{ca.qc-vacation-pay[rate-0]}} of the gross wages earned during the reference year.",
    "From {{ca.qc-vacation-pay[years-1]}} years of continuous service at the end of the reference year, it is {{ca.qc-vacation-pay[rate-1]}}.",
  ],
  faq: [
    {
      pregunta: "When does the rate go up?",
      respuesta: "When you reach {{ca.qc-vacation-pay[years-1]}} years of continuous service at the end of the reference year: from then on the rate is {{ca.qc-vacation-pay[rate-1]}}.",
    },
    {
      pregunta: "Which wages count?",
      respuesta: "The gross wages you earned during the reference year.",
    },
    {
      pregunta: "Does this cover jobs under the Canada Labour Code?",
      respuesta: "No. It follows Quebec's Act respecting labour standards. For federally regulated jobs, use the vacation pay calculator for Canada.",
    },
  ],
  glosario: [
    { termino: "Reference year", definicion: "The 12-month period used to count vacation time and pay." },
    { termino: "Continuous service", definicion: "The uninterrupted period during which you are bound to the same employer." },
  ],
});
