import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.employer-cost",
  h1: "Employer cost calculator Malta",
  title: "Cost of an employee in Malta {{anio}}",
  description: "See what an employee costs in Malta: basic salary, statutory bonuses, employer social security and the Maternity Leave Trust Fund.",
  intro: [
    "Enter the gross basic salary. You get the yearly and monthly cost of the employee to the business.",
    "On top of the salary an employer pays the statutory bonuses and weekly allowance, its Class 1 social security share and a contribution to the Maternity Leave Trust Fund.",
  ],
  comoSeCalcula: [
    "The employer pays the same Class 1 contribution as the employee: {{mt.ssc-rate}} of the basic weekly wage, up to the weekly cap.",
    "The Maternity Leave Trust Fund contribution is {{mt.maternity-fund-rate}} of the basic wage.",
  ],
  ejemplo: ["For a salary of €30,000 the employer also pays the four statutory payments and 10% Class 1 social security on €576.92 a week."],
  faq: [
    {
      pregunta: "Does the cost include holiday pay?",
      respuesta: "Paid annual leave and public holidays are already part of the yearly salary, so they are not added again.",
    },
  ],
  glosario: [
    { termino: "Maternity Leave Trust Fund", definicion: "A fund that employers pay into to cover maternity leave." },
  ],
});
