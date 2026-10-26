import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.apit-calculator",
  h1: "APIT calculator",
  title: "APIT calculator 2026: tax on your monthly salary",
  description:
    "Find the APIT your employer deducts each month with the IRD Tax Table No. 01 for 2025/26. No tax on the first {{lk.apit-table-1[1].desde}} a month.",
  intro: [
    "APIT is the income tax taken from your salary before it is paid. This calculator uses Tax Table No. 01, the one the IRD tells employers to use for regular monthly pay from a primary employment.",
    "Enter your regular profits from employment for the month: salary, allowances, overtime and the value of any benefits.",
  ],
  comoSeCalcula: [
    "Up to {{lk.apit-table-1[0].hasta}} a month there is no tax.",
    "Above that, each slice of pay has its own rate: {{lk.apit-table-1[1].tasa}} up to {{lk.apit-table-1[1].hasta}}, {{lk.apit-table-1[2].tasa}} up to {{lk.apit-table-1[2].hasta}}, {{lk.apit-table-1[3].tasa}} up to {{lk.apit-table-1[3].hasta}}, {{lk.apit-table-1[4].tasa}} up to {{lk.apit-table-1[4].hasta}} and {{lk.apit-table-1[-1].tasa}} above that.",
    "The IRD writes each band as a percentage of your whole pay less a fixed relief. For pay between {{lk.apit-table-1[3].desde}} and {{lk.apit-table-1[3].hasta}} it is {{lk.apit-table-1[3].tasa}} of pay less Rs. 53,500. The result is the same.",
  ],
  ejemplo: [
    "On Rs. 300,000 a month the APIT is 24% of 300,000 less Rs. 53,500, so Rs. 18,500. That is about 6.2% of the salary.",
  ],
  faq: [
    {
      pregunta: "Which APIT table applies to me?",
      respuesta: "Table No. 01 is for resident employees, and non-resident employees who are citizens of Sri Lanka, who have given the primary declaration to their employer or have only one employment.",
    },
    {
      pregunta: "What if my pay is below the limit some months and above it in others?",
      respuesta: "If your monthly pay is under {{lk.apit-table-1[0].hasta}} but your total for the year so far goes over 12 times that amount, the IRD says your employer has to switch to Table No. 05 from that month.",
    },
    {
      pregunta: "Do benefits like a company car or housing count?",
      respuesta: "Yes. The IRD counts payments for housing, conveyance, electricity, telephone and entertainment, and the market value of other benefits from the job, as regular profits from employment.",
    },
  ],
  glosario: [
    { termino: "Regular profits from employment", definicion: "Salary, wages, allowances, overtime and benefits that arise in any pay period." },
    { termino: "Primary employment", definicion: "The job you have declared to that employer as your main one." },
  ],
});
