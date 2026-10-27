import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.income-tax-calculator",
  h1: "Income tax calculator Sri Lanka",
  title: "Income tax calculator Sri Lanka 2026/27: tax for the year",
  description:
    "Work out your personal income tax for the year of assessment with the {{lk.personal-relief}} relief and rates from {{lk.income-tax-bands[0].tasa}} to {{lk.income-tax-bands[-1].tasa}}.",
  intro: [
    "Use this when you file your income tax return or want to check what you owe for the year of assessment, which runs from 1 April to 31 March.",
    "Add your employment income and your other income, such as business profits, rent or interest. Then enter the APIT and advance income tax already taken from you to see the balance.",
  ],
  comoSeCalcula: [
    "Your assessable income is everything you entered. The personal relief of {{lk.personal-relief}} comes off first.",
    "The rest is your taxable income. The first {{lk.income-tax-bands[0].hasta}} is taxed at {{lk.income-tax-bands[0].tasa}}, the next slices at {{lk.income-tax-bands[1].tasa}}, {{lk.income-tax-bands[2].tasa}} and {{lk.income-tax-bands[3].tasa}}, and anything above {{lk.income-tax-bands[-1].desde}} at {{lk.income-tax-bands[-1].tasa}}.",
    "Tax already paid during the year is credited. If it is more than the tax, the difference is shown as paid in excess.",
  ],
  ejemplo: [
    "With Rs. 3,600,000 of salary, the taxable income is Rs. 1,800,000. The tax is Rs. 150,000 on the first Rs. 1,500,000 plus 24% of Rs. 300,000, so Rs. 222,000 for the year.",
  ],
  faq: [
    {
      pregunta: "When is the income tax return due?",
      respuesta: "The IRD sets 30 November after the end of the year of assessment as the due date for the return.",
    },
    {
      pregunta: "Do I pay tax in instalments?",
      respuesta: "If you are an instalment payer, yes: by 15 August, 15 November, 15 February and 15 May, with the final payment after the year closes.",
    },
    {
      pregunta: "Are capital gains and gratuity taxed here?",
      respuesta: "No. Gains from selling investment assets and terminal benefits such as a retiring gratuity have their own rates. Use the capital gains tax and gratuity tax calculators for those.",
    },
  ],
  glosario: [
    { termino: "Year of assessment", definicion: "The tax year, from 1 April to 31 March of the next year." },
    { termino: "Personal relief", definicion: "The amount every resident individual, and every non-resident citizen, can deduct before tax." },
    { termino: "Taxable income", definicion: "Assessable income less the personal relief and other allowed reliefs." },
  ],
});
