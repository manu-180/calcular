import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.paye-calculator",
  h1: "PAYE calculator Mauritius",
  title: "PAYE Mauritius {{anio}}: monthly tax on your salary",
  description:
    "Find the PAYE your employer withholds each month under the cumulative MRA system, with the {{mu.income-tax-bands[1].tasa}}, {{mu.income-tax-bands[2].tasa}} and {{mu.income-tax-bands[-1].tasa}} bands for 2026-27.",
  intro: [
    "PAYE is the income tax taken from your pay every month. Enter your monthly emoluments and the deductions in your Employee Declaration Form to see the amount.",
    "The calculator follows the income year from July 2026 to June 2027.",
  ],
  comoSeCalcula: [
    "MRA counts the income year as 13 pay periods: July to June plus the month the end of year bonus is paid.",
    "Your monthly emoluments are multiplied by 13. Your EDF deductions for the year are taken off, which gives your chargeable income.",
    "The bands apply to that income: {{mu.income-tax-bands[0].tasa}} on the first {{mu.income-tax-bands[0].hasta}}, {{mu.income-tax-bands[1].tasa}} up to {{mu.income-tax-bands[1].hasta}}, {{mu.income-tax-bands[2].tasa}} up to {{mu.income-tax-bands[2].hasta}} and {{mu.income-tax-bands[-1].tasa}} above.",
    "The tax is divided by 13 and rounded down to the nearest rupee. That is the PAYE for one month.",
  ],
  ejemplo: [
    "On Rs 75,000 a month with no deductions, chargeable income is Rs 975,000. The tax is Rs 47,500, so PAYE is Rs 3,653 a month.",
  ],
  faq: [
    {
      pregunta: "What are the deductions for dependents?",
      respuesta: "For the year: {{mu.dependent-deduction[1]}} for one dependent, {{mu.dependent-deduction[2]}} for two, {{mu.dependent-deduction[3]}} for three and {{mu.dependent-deduction[4]}} for four or more. You claim them in your EDF.",
    },
    {
      pregunta: "What if I have not submitted an EDF?",
      respuesta: "Your deductions are claimed in the EDF, so your employer needs it to apply them. You can submit it on the MRA website and your employer can download it from there.",
    },
    {
      pregunta: "Is the end of year bonus taxed?",
      respuesta: "Yes. It is the thirteenth pay period, so the bands and your deductions are spread over it as well.",
    },
  ],
  glosario: [
    { termino: "Emoluments", definicion: "Everything your employer pays you that is taxable, in cash or as a benefit." },
    { termino: "Chargeable income", definicion: "Your income after the deductions you are entitled to. The tax bands apply to it." },
  ],
});
