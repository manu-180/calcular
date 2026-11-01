import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "om-en.employee-cost-calculator",
  h1: "Oman employee cost calculator",
  title: "Employee cost in Oman: wage plus employer contributions",
  description:
    "Work out what an employee costs your business in Oman each month and year: the total wage, employer Social Protection Fund contributions and your other costs.",
  intro: [
    "An employee costs more than their wage, because the employer pays contributions to several Social Protection Fund branches for Omani staff.",
    "Enter the total wage, the nationality and any other monthly costs to see the cost per month and per year.",
  ],
  comoSeCalcula: [
    "For Omani staff the employer pays {{om.spf-old-age[employer]}} to the old age branch and {{om.spf-injury}} to work injuries, on a wage of up to {{om.spf-cap}}.",
    "On the whole wage it pays {{om.spf-job-security[employer]}} for job security, {{om.spf-maternity}} for maternity leave and {{om.spf-sick}} for sick leave.",
    "The monthly cost is the wage plus these contributions and the other costs you entered.",
  ],
  ejemplo: [
    "For an Omani employee earning OMR 800 in total, employer contributions are OMR 116, so the cost is OMR 916 a month and OMR 10,992 a year.",
  ],
  faq: [
    {
      pregunta: "How much does a company pay for an Omani employee?",
      respuesta: "The employer shares today are {{om.spf-old-age[employer]}}, {{om.spf-injury}}, {{om.spf-job-security[employer]}}, {{om.spf-maternity}} and {{om.spf-sick}} of the wage, with the cap on old age and work injuries.",
    },
    {
      pregunta: "Does a company pay contributions for expats?",
      respuesta: "No Fund contributions are paid for them today, but the employer owes the end-of-service gratuity under article 61 of the Labour Law.",
    },
    {
      pregunta: "What goes in other costs?",
      respuesta: "Anything the business pays each month for the employee outside the wage, such as private health insurance, a monthly share of permit fees or travel tickets.",
    },
  ],
  glosario: [
    { termino: "Employee cost", definicion: "The total wage plus the contributions and other costs the employer pays." },
  ],
});
