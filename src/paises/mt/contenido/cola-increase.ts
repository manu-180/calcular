import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.cola-increase",
  h1: "COLA calculator Malta 2026",
  title: "COLA Malta 2026: {{mt.cola}} a week on your wage",
  description:
    "See your new wage after the cost of living increase of {{mt.cola}} a week in Malta, for whole-time and part-time work, and the top-up to the minimum wage.",
  intro: [
    "From {{mt.cola#desde}} the wages of whole-time employees go up by {{mt.cola}} a week. This is the cost of living increase, or COLA.",
    "Enter last year's basic wage or hourly rate. You get your new pay for this year.",
  ],
  comoSeCalcula: [
    "Whole-time: add {{mt.cola}} to your basic weekly wage.",
    "Part-time: your hourly rate goes up by the same amount as the hourly rate of a comparable whole-time employee. If there is none and no Wage Regulation Order applies, it goes up by one fortieth of {{mt.cola}}.",
    "If the result is still under the minimum wage for your age, your pay has to be raised to the minimum.",
  ],
  ejemplo: ["A wage of €222 a week becomes €226.66 with the COLA, which is under the 2026 minimum, so it is raised to {{mt.minimum-wage[age-18-plus]}}."],
  faq: [
    {
      pregunta: "Who gets the COLA?",
      respuesta: "Every whole-time employee gets it on the basic weekly wage, and part-time employees get it on their hourly rate.",
    },
    {
      pregunta: "Which law sets it?",
      respuesta: "The Wage Increase (Employees) National Standard Order, 2025, Legal Notice 290 of 2025, which came into force on {{mt.cola#desde}}.",
    },
    {
      pregunta: "Is the COLA paid on top of the statutory bonuses?",
      respuesta: "The COLA goes into your weekly wage. The statutory bonuses and weekly allowance are separate fixed payments.",
    },
  ],
  glosario: [
    { termino: "COLA", definicion: "Cost of living adjustment, the increase added to wages for the rise in prices." },
    { termino: "Basic weekly wage", definicion: "Your weekly wage before overtime, bonuses and allowances." },
  ],
});
