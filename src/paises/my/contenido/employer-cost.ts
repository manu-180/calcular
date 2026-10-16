import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.employer-cost",
  h1: "Employer cost calculator Malaysia",
  title: "Employer cost calculator: wages plus EPF, SOCSO and EIS",
  description: "See what an employee really costs each month: wages plus employer EPF, SOCSO and EIS from the PERKESO tables, and any other costs you add.",
  intro: [
    "Enter the wages and the employer EPF share to see the full monthly and yearly cost of a hire.",
    "SOCSO and EIS come from the PERKESO tables. Add other regular costs, such as allowances or insurance, in their own field.",
  ],
  comoSeCalcula: [
    "Employer EPF is the amount you enter from your contribution schedule.",
    "Employer SOCSO is read from the PERKESO table for the wage band: Employment Injury and Invalidity in the first category, Employment Injury only in the second.",
    "Employer EIS matches the employee's EIS for the same band.",
    "PERKESO contributions stop growing above {{my.socso-wage-ceiling}} a month.",
    "Everything is added to the wages to give the monthly cost.",
  ],
  ejemplo: [
    "For RM4,000 of wages and RM520 of employer EPF, SOCSO is RM69.15 and EIS RM7.90. The employer pays RM4,597.05 a month, about 14.9% on top of the wages.",
  ],
  faq: [
    {
      pregunta: "Does the employer pay LINDUNG 24 Jam?",
      respuesta: "No. In the PERKESO table the Non-Employment Injury Scheme is an employee share only, so it does not add to the employer's cost.",
    },
    {
      pregunta: "Is the HRD Corp levy included?",
      respuesta: "Not automatically. If your company pays the levy, add your monthly amount under other costs.",
    },
    {
      pregunta: "Why do I enter employer EPF myself?",
      respuesta:
        "Your EPF contribution schedule shows the exact employer share for each employee. Entering it keeps the result tied to what you actually pay.",
    },
  ],
  glosario: [
    { termino: "Employer EPF", definicion: "The employer's share of the EPF contribution, paid on top of wages." },
    { termino: "SOCSO category", definicion: "First category covers Employment Injury and Invalidity; second category covers Employment Injury only." },
  ],
});
