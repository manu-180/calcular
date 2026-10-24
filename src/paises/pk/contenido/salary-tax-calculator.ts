import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.salary-tax-calculator",
  h1: "Salary tax calculator 2026-27",
  title: "Salary tax calculator 2026-27 (tax year 2027)",
  description: "Work out the income tax on your salary for tax year 2027 with the new FBR slabs of the Finance Act 2026, month by month and for the year.",
  intro: [
    "Enter your monthly taxable salary to see the tax your employer deducts each month and the total for the tax year from 1 July 2026 to 30 June 2027.",
    "These are the rates for salaried individuals, which apply when salary is more than 75% of your taxable income.",
  ],
  comoSeCalcula: [
    "Your yearly salary is the monthly salary times 12 plus any bonus.",
    "Up to Rs. 600,000 a year there is no tax. Then 1% up to Rs. 1.2 million, 11% up to Rs. 2.2 million, 20% up to Rs. 3.2 million, 25% up to Rs. 4.1 million, 29% up to Rs. 5.6 million, 32% up to Rs. 7 million and 35% above that.",
    "Each rate applies only to the part of the salary inside its slab. The monthly deduction is the yearly tax divided by 12.",
  ],
  ejemplo: ["On Rs. 300,000 a month, the yearly salary is Rs. 3.6 million and the tax is Rs. 416,000, or about Rs. 34,667 a month."],
  faq: [
    {
      pregunta: "Is there still a surcharge on high salaries?",
      respuesta: "No. The Finance Act 2026 withdrew the 9% surcharge for salaried individuals. Other individuals with income above Rs. 10 million still pay a 10% surcharge.",
    },
    {
      pregunta: "What is tax year 2027?",
      respuesta: "The year from 1 July 2026 to 30 June 2027. Tax deducted from salary in this period uses these slabs.",
    },
    {
      pregunta: "What if salary is less than 75% of my income?",
      respuesta: "Then the rates for other individuals apply instead of the salaried slabs, and this calculator does not cover your case.",
    },
  ],
  glosario: [
    { termino: "Taxable salary", definicion: "Salary after exempt allowances, on which tax is worked out." },
    { termino: "FBR", definicion: "Federal Board of Revenue." },
  ],
});
