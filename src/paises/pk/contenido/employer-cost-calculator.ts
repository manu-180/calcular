import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.employer-cost-calculator",
  h1: "Employer cost calculator Pakistan",
  title: "Employer cost calculator Pakistan: salary plus EOBI",
  description: "See what an employee costs each month: salary, the employer's EOBI share of {{pk.eobi-employer}} of the minimum wage and any provident fund you pay.",
  intro: ["Enter the salary and, if your company runs a provident fund, the employer's share. You get the monthly and yearly cost."],
  comoSeCalcula: [
    "EOBI: the employer pays {{pk.eobi-employer}} of the minimum wage of {{pk.minimum-wage}} for each insured worker.",
    "Provident fund: only if your company has one. Enter the share of salary it pays in; the law does not fix one rate for all employers.",
    "Cost = salary + EOBI + provident fund.",
  ],
  ejemplo: ["A worker on Rs. 80,000 costs Rs. 82,035 a month with EOBI."],
  faq: [
    {
      pregunta: "Is provident fund compulsory?",
      respuesta: "It depends on the company's scheme and terms of employment. If there is no fund, leave it at 0.",
    },
    {
      pregunta: "Are there provincial social security contributions?",
      respuesta: "Provinces run their own employees' social security schemes with their own rules. This calculator covers EOBI only.",
    },
    {
      pregunta: "Does income tax add to the cost?",
      respuesta: "No. The employer deducts the employee's tax from the salary; it is not an extra cost.",
    },
  ],
  glosario: [{ termino: "Provident fund", definicion: "A savings fund where employer and employee put in a share of salary every month." }],
});
