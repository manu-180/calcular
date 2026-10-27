import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.bonus-tax-calculator",
  h1: "Bonus tax calculator Trinidad and Tobago",
  title: "How much tax on my bonus? Trinidad and Tobago {{anio}}",
  description: "See the income tax on a bonus or incentive payment and what you keep, using the IRD rates and the {{tt.personal-allowance}} personal allowance.",
  intro: [
    "A bonus is taxed as part of your income for the year. What it costs you in tax depends on how much of the personal allowance your salary has already used.",
    "Enter the bonus and your yearly salary to see the tax on the bonus alone.",
  ],
  comoSeCalcula: [
    "Income tax is worked out on your salary for the year, with and without the bonus.",
    "Both include the personal allowance of {{tt.personal-allowance}} and {{tt.nis-deductible-share}} of your NIS with your pension contributions.",
    "The difference is the tax on the bonus. Most bonuses pay {{tt.income-tax-rate}}; any part above {{tt.income-tax-higher-band}} of chargeable income pays {{tt.income-tax-higher-rate}}.",
  ],
  ejemplo: ["On a TT$180,000 salary, a TT$20,000 bonus pays TT$5,000 of income tax and you keep TT$15,000."],
  faq: [
    {
      pregunta: "Is my bonus taxed at a higher rate?",
      respuesta: "Not usually. It is added to your income for the year. Only chargeable income above {{tt.income-tax-higher-band}} pays the higher rate of {{tt.income-tax-higher-rate}}.",
    },
    {
      pregunta: "Why did my employer deduct more PAYE in the bonus month?",
      respuesta: "PAYE in the month of the bonus can be higher than the final tax. Any difference is settled when you file your return for the year.",
    },
    {
      pregunta: "Is NIS charged on a bonus?",
      respuesta: "NIS follows the earnings class of the pay period. A bonus paid with a month's salary can move that month into a higher class.",
    },
  ],
  glosario: [{ termino: "Chargeable income", definicion: "Income after the personal allowance and deductions, which is what the tax rates apply to." }],
});
