import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.employer-cost-calculator",
  h1: "Employer cost calculator Jamaica",
  title: "Employer cost calculator Jamaica: NIS, NHT, Ed Tax, HEART",
  description:
    "Find the full cost of an employee in Jamaica. Adds the employer's NIS, NHT at {{jm.nht-employer-rate}}, Education Tax at {{jm.education-tax-employer-rate}} and HEART/NSTA Trust at {{jm.heart-rate}}.",
  intro: [
    "Hiring someone costs more than the salary. On top of gross pay the employer pays four statutory contributions to TAJ every month.",
    "Enter the monthly salary to see each contribution and the total cost to your business.",
  ],
  comoSeCalcula: [
    "NIS: {{jm.nis-employer-rate}} of gross pay, on pay up to {{jm.nis-ceiling}} a year.",
    "NHT: {{jm.nht-employer-rate}} of gross pay.",
    "Education Tax: {{jm.education-tax-employer-rate}} of the employee's statutory income (gross pay less the employee's NIS and approved pension contributions).",
    "HEART/NSTA Trust: {{jm.heart-rate}} of gross pay when your total payroll is above {{jm.heart-payroll-threshold}} a year.",
  ],
  ejemplo: ["A salary of J$250,000 a month costs the employer J$280,987.50, with J$30,987.50 in contributions."],
  faq: [
    {
      pregunta: "Who pays HEART/NSTA Trust?",
      respuesta: "Only the employer, and only when total payroll is above {{jm.heart-payroll-threshold}} a year. Nothing is taken from the employee for it.",
    },
    {
      pregunta: "Does the employer also pay PAYE?",
      respuesta: "No. The employer deducts PAYE from the employee's pay and sends it to TAJ, but it is the employee's tax.",
    },
    {
      pregunta: "Is the employer's NIS capped too?",
      respuesta: "Yes. Like the employee's share, it is charged on pay up to {{jm.nis-ceiling}} a year.",
    },
  ],
  glosario: [
    { termino: "HEART/NSTA Trust", definicion: "The national training agency, funded by an employer contribution on payroll." },
    { termino: "Gross emoluments", definicion: "All pay from the job, in cash or in kind, before deductions." },
  ],
});
