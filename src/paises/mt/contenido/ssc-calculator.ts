import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.ssc-calculator",
  h1: "Social security contributions calculator Malta",
  title: "SSC calculator Malta: Class 1 contributions {{anio}}",
  description: "See the Class 1 social security you and your employer pay each week in Malta, from your basic weekly wage, age and year of birth.",
  intro: [
    "Enter your basic weekly wage. You get the weekly Class 1 contribution you pay, the same amount your employer pays and the yearly total.",
    "Class 1 contributions are {{mt.ssc-rate}} of the basic wage, with a fixed amount for low wages and a weekly cap.",
  ],
  comoSeCalcula: [
    "If your basic weekly wage is at or below the minimum wage, you pay a fixed weekly amount: category A under 18 and category B from 18.",
    "Above that you pay {{mt.ssc-rate}} of the basic weekly wage, up to the weekly cap for your year of birth.",
    "Your employer pays the same amount and the State adds half of both together.",
  ],
  ejemplo: ["On a basic wage of €600 a week you pay €60 a week and your employer pays another €60."],
  faq: [
    {
      pregunta: "Is social security paid on overtime and bonuses?",
      respuesta: "No. Class 1 contributions are worked out on the basic wage only.",
    },
  ],
  glosario: [
    { termino: "Class 1", definicion: "The social security contributions paid on wages by employees and their employers." },
    { termino: "Basic weekly wage", definicion: "Your weekly wage before overtime, bonuses and allowances, or the weekly equivalent of a monthly salary." },
  ],
});
