import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.cout-employeur",
  h1: "Employer cost calculator for Cameroon",
  title: "Employer cost Cameroon: payroll charges on a salary",
  description:
    "Work out the full cost of an employee: employer CNPS contributions, Housing Loan Fund of {{cm.cfc-taux[employeur]}} and National Employment Fund of {{cm.fne-taux}}.",
  intro: [
    "Hiring costs more than the gross salary. The employer pays its CNPS contributions and two payroll levies: the Housing Loan Fund and the National Employment Fund.",
    "Enter the monthly gross pay, the scheme and the risk group. You get the cost for the month and the year.",
  ],
  comoSeCalcula: [
    "CNPS: {{cm.cnps-pension[employeur]}} pension and family benefits on pay capped at {{cm.cnps-plafond}}, plus occupational injuries on all pay.",
    "Housing Loan Fund: {{cm.cfc-taux[employeur]}} of gross pay rounded down to the thousand. National Employment Fund: {{cm.fne-taux}} of the same base.",
    "Some employers are exempt from both levies, such as the State, councils and non-profit associations.",
  ],
  ejemplo: ["On 300,000 F in the general scheme, group A: 38,850 F CNPS, 4,500 F Housing Loan Fund and 3,000 F FNE. The total cost is 346,350 F a month."],
  faq: [
    {
      pregunta: "Does the employee also pay the Housing Loan Fund?",
      respuesta: "Yes. The employee pays {{cm.cfc-taux[salarie]}} and the employer {{cm.cfc-taux[employeur]}}. Only the employer share is part of the employer cost.",
    },
    {
      pregunta: "When are these levies paid?",
      respuesta: "The Housing Loan Fund and FNE are paid to the Treasury within the first twenty days of the month, for salaries paid the month before.",
    },
    {
      pregunta: "Does the cost include leave or bonuses?",
      respuesta: "No. It is based on the gross pay you enter. Add bonuses to gross pay to include them.",
    },
  ],
  glosario: [{ termino: "FNE", definicion: "National Employment Fund, financed by a levy on employers' payroll." }],
});
