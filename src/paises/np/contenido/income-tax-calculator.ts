import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "np.income-tax-calculator",
  h1: "Income tax calculator Nepal {{anio}}",
  title: "Income tax calculator Nepal {{anio}}: slabs up to {{np.income-tax-bands[-1].tasa}}",
  description:
    "Work out your income tax for the 2083/84 income year: {{np.income-tax-bands[0].tasa}} up to {{np.income-tax-bands[0].hasta}}, rising to {{np.income-tax-bands[-1].tasa}}. Add the allowances and deductions the Income Tax Act gives you.",
  intro: [
    "Enter your monthly pay and the calculator gives the income tax you owe for the Nepali income year 2083/84, which began on {{np.income-tax-bands#desde}}. You see the tax for the year and the share to withhold each month.",
    "The Inland Revenue Department now publishes the same slabs for a single person and for a couple, so there is no marital status to choose. What changes your bill is what you deduct: retirement contributions, insurance premiums and the remote area allowance.",
  ],
  comoSeCalcula: [
    "Income for the year is twelve months of pay plus any bonus. The retirement contribution you deduct is the smaller of {{np.retirement-deduction-cap}} and one third of your assessable income. A Fund contributor deducts the {{np.ssf-provident-rate}} provident fund share of basic pay.",
    "Insurance premiums come off too: life up to {{np.life-insurance-cap}}, health up to {{np.health-insurance-cap}} and your own house up to {{np.house-insurance-cap}} a year. If you work in a remote area, you also deduct the allowance for your category, from {{np.remote-area-allowance[a]}} for Category A to {{np.remote-area-allowance[e]}} for Category E.",
    "The slabs apply to what is left. The first {{np.income-tax-bands[0].hasta}} is taxed at {{np.income-tax-bands[0].tasa}}, the next band at {{np.income-tax-bands[1].tasa}}, then {{np.income-tax-bands[2].tasa}}, {{np.income-tax-bands[3].tasa}}, and {{np.income-tax-bands[-1].tasa}} above {{np.income-tax-bands[-1].desde}}. A woman whose only income is pay takes {{np.women-salary-rebate}} off the final tax.",
  ],
  ejemplo: [
    "A Fund contributor earns NPR 100,000 a month with basic pay of NPR 50,000. Income is NPR 1,200,000 and the provident share is NPR 60,000, so taxable income is NPR 1,140,000. The first band carries no tax for a contributor, and the remaining NPR 140,000 is taxed at 10%. The tax is NPR 14,000 a year, or NPR 1,166.67 a month.",
  ],
  faq: [
    {
      pregunta: "Do single people and couples pay different tax?",
      respuesta: "Not for the 2083/84 income year. The Inland Revenue Department table lists the same limits and rates for both columns, with 1% up to NPR 10 lakh and 29% above NPR 40 lakh.",
    },
    {
      pregunta: "Do I pay the 1% on the first band if I contribute to the Social Security Fund?",
      respuesta: "No. The Income Tax Act, 2058, schedule 1, says the 1% is not charged on income of people who contribute to the Social Security Fund or to a retirement fund, or on retirement income.",
    },
    {
      pregunta: "How much can I deduct for retirement contributions?",
      respuesta: "The smaller of NPR 5 lakh and one third of your assessable income, for contributions to an approved retirement fund.",
    },
    {
      pregunta: "What is the remote area allowance?",
      respuesta: "A deduction from taxable income for people working in a remote area. It runs from NPR 50,000 for Category A to NPR 10,000 for Category E.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Income for the year less the deductions the Income Tax Act allows." },
    { termino: "Income year", definicion: "The Nepali fiscal year, from Shrawan 1 to the end of Asar. The 2083/84 year began in July 2026." },
    { termino: "Lakh", definicion: "One hundred thousand. NPR 10 lakh is NPR 1,000,000." },
  ],
});
