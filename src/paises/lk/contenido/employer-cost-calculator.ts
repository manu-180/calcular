import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.employer-cost-calculator",
  h1: "Employer cost calculator Sri Lanka",
  title: "Employer cost calculator Sri Lanka: salary plus EPF and ETF",
  description:
    "See what an employee really costs: gross salary plus employer EPF at {{lk.epf-employer}} and ETF at {{lk.etf-employer}}, for one person or your whole team.",
  intro: [
    "Hiring someone costs more than the salary on the offer letter. On top of the gross pay, the employer pays its share of EPF and the full ETF contribution every month.",
    "Enter the gross monthly salary and how many people earn it.",
  ],
  comoSeCalcula: [
    "Employer EPF: {{lk.epf-employer}} of the employee's monthly earnings.",
    "ETF: {{lk.etf-employer}} of the same earnings.",
    "Monthly cost is the gross salary plus both. The employee's own EPF comes out of the gross salary, so it does not add to the cost.",
  ],
  ejemplo: [
    "For a salary of Rs. 150,000 you pay Rs. 18,000 of EPF and Rs. 4,500 of ETF. The employee costs Rs. 172,500 a month, or Rs. 2,070,000 a year.",
  ],
  faq: [
    {
      pregunta: "Does the employer pay the employee's APIT?",
      respuesta: "No. The employer deducts APIT from the employee's pay and sends it to the IRD by the 15th of the next month, but it is the employee's tax.",
    },
    {
      pregunta: "When is the ETF contribution due?",
      respuesta: "ETF contributions for a month have to reach the ETF Board by the last working day of the following month.",
    },
    {
      pregunta: "Are bonuses and gratuity included?",
      respuesta: "No. This calculator covers the regular monthly cost. Bonuses, overtime, gratuity and staff benefits are extra.",
    },
  ],
  glosario: [
    { termino: "Employer EPF", definicion: "The employer's share of the Employees' Provident Fund contribution." },
    { termino: "ETF", definicion: "Employees' Trust Fund, paid only by the employer." },
  ],
});
