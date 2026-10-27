import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.nis-nht-education-tax-calculator",
  h1: "NIS, NHT and Education Tax calculator",
  title: "NIS, NHT and Education Tax calculator Jamaica {{anio}}",
  description:
    "See your statutory deductions and your employer's share: NIS at {{jm.nis-employee-rate}}, NHT at {{jm.nht-employee-rate}} and Education Tax at {{jm.education-tax-employee-rate}}. Rates from TAJ.",
  intro: [
    "Enter your monthly gross pay to see the three statutory contributions that come off every Jamaican payslip, and what your employer adds on top.",
    "PAYE is not part of this page. Use the salary calculator to see it with your take-home pay.",
  ],
  comoSeCalcula: [
    "NIS: {{jm.nis-employee-rate}} from you and {{jm.nis-employer-rate}} from your employer, on gross pay up to {{jm.nis-ceiling}} a year.",
    "NHT: {{jm.nht-employee-rate}} from you and {{jm.nht-employer-rate}} from your employer, on all of your gross pay.",
    "Education Tax: {{jm.education-tax-employee-rate}} from you and {{jm.education-tax-employer-rate}} from your employer, on statutory income (gross pay less NIS and approved pension contributions).",
  ],
  ejemplo: [
    "On J$250,000 a month you pay NIS of J$7,500, NHT of J$5,000 and Education Tax of J$5,456.25. Your employer pays NIS of J$7,500, NHT of J$7,500 and Education Tax of J$8,487.50.",
  ],
  faq: [
    {
      pregunta: "Is there a limit on NIS?",
      respuesta: "Yes. NIS is only charged on pay up to {{jm.nis-ceiling}} a year. Above that the monthly deduction stays at the maximum.",
    },
    {
      pregunta: "Is there a limit on NHT or Education Tax?",
      respuesta: "No. NHT is charged on all of your gross pay and Education Tax on all of your statutory income.",
    },
    {
      pregunta: "Does my employer take these out of my salary?",
      respuesta: "Your share comes out of your pay. The employer share is an extra cost for the business and does not reduce what you take home.",
    },
  ],
  glosario: [
    { termino: "Statutory deductions", definicion: "The amounts the law says your employer must take from your pay: NIS, NHT, Education Tax and PAYE." },
    { termino: "Education Tax", definicion: "A tax on statutory income. Both you and your employer pay it, at different rates." },
  ],
});
