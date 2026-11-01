import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.income-tax-calculator",
  h1: "Income tax calculator Mauritius",
  title: "Income tax calculator Mauritius 2026-27",
  description:
    "Work out your income tax for the year with the MRA bands: {{mu.income-tax-bands[0].tasa}} up to {{mu.income-tax-bands[0].hasta}}, then {{mu.income-tax-bands[1].tasa}}, {{mu.income-tax-bands[2].tasa}} and {{mu.income-tax-bands[-1].tasa}}.",
  intro: [
    "Enter your net income for the income year and the deductions you can claim. You get the tax due, the rate on your next rupee and what is left to pay after PAYE.",
    "The income year runs from 1 July to 30 June. These are the bands for July 2026 to June 2027.",
  ],
  comoSeCalcula: [
    "Your deductions are taken off your net income. What remains is your chargeable income.",
    "The first {{mu.income-tax-bands[0].hasta}} is taxed at {{mu.income-tax-bands[0].tasa}}. Income up to {{mu.income-tax-bands[1].hasta}} pays {{mu.income-tax-bands[1].tasa}}, income up to {{mu.income-tax-bands[2].hasta}} pays {{mu.income-tax-bands[2].tasa}} and the rest pays {{mu.income-tax-bands[-1].tasa}}.",
    "Each rate applies only to the slice of income inside its band.",
  ],
  ejemplo: [
    "With Rs 2,000,000 of income and three dependents, chargeable income is Rs 1,725,000 and the tax is Rs 195,000.",
  ],
  faq: [
    {
      pregunta: "When is the 35% rate charged?",
      respuesta: "On chargeable income above {{mu.income-tax-bands[2].hasta}}, from the income year that started on 1 July 2026. It was set by the Finance Act 2026.",
    },
    {
      pregunta: "Do I still pay the Fair Share Contribution?",
      respuesta: "Not for 2026-27. The Finance Act 2026 limited the individual Fair Share Contribution to the 2025-26 income year, and the {{mu.income-tax-bands[-1].tasa}} band takes its place.",
    },
    {
      pregunta: "How much can I deduct for dependents?",
      respuesta: "{{mu.dependent-deduction[1]}} for one dependent, {{mu.dependent-deduction[2]}} for two, {{mu.dependent-deduction[3]}} for three and {{mu.dependent-deduction[4]}} for four or more.",
    },
    {
      pregunta: "When do I file my return?",
      respuesta: "Individual returns for an income year are filed online with MRA after it ends. MRA announces the deadline each year in a communiqué.",
    },
  ],
  glosario: [
    { termino: "Net income", definicion: "Your income after the expenses the law allows, before personal deductions." },
    { termino: "Marginal rate", definicion: "The rate that applies to the next rupee you earn." },
  ],
});
