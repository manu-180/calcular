import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.minimum-wage",
  h1: "National minimum wage in Nigeria",
  title: "Nigeria minimum wage {{anio}}: {{ng.minimum-wage}} a month",
  description: "The national minimum wage is {{ng.minimum-wage}} a month. Check how your pay compares and what it means for income tax.",
  intro: [
    "The national minimum wage is {{ng.minimum-wage}} a month. Enter your pay to see how it compares.",
    "In his broadcast of 4 August 2024, President Tinubu said he had signed the new minimum wage into law the week before, so the lowest-earning workers earn at least ₦70,000 a month.",
  ],
  comoSeCalcula: [
    "The minimum is a monthly amount: {{ng.minimum-wage}}. Over a year that is 12 times as much.",
    "Under the Nigeria Tax Act, 2025, income from a job that pays the national minimum wage or less is exempt from income tax.",
  ],
  ejemplo: ["If you earn ₦85,000 a month, you are ₦15,000 above the minimum wage."],
  faq: [
    {
      pregunta: "When will the minimum wage be reviewed?",
      respuesta: "The government agreed with labour to review it after three years instead of five.",
    },
    {
      pregunta: "Do I pay PAYE on the minimum wage?",
      respuesta: "No. A job that pays the national minimum wage or less is exempt from income tax.",
    },
    {
      pregunta: "Does the minimum include allowances?",
      respuesta: "It is the least a worker must earn in a month. Check your contract and payslip for how your pay is made up.",
    },
  ],
  glosario: [
    { termino: "National minimum wage", definicion: "The lowest monthly pay an employer may lawfully pay a worker." },
  ],
});
