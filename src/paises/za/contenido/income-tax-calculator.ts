import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.income-tax-calculator",
  h1: "Income tax calculator 2026/27",
  title: "SARS income tax calculator 2026/27",
  description:
    "Calculate your income tax for the 2026/27 tax year with the SARS brackets, age rebates and medical scheme fees tax credits.",
  intro: [
    "Enter your taxable income for the year and your age. You get the tax on the SARS brackets, the rebates you qualify for and the tax you actually pay.",
    "The tables are for the 2027 year of assessment, from 1 March 2026 to 28 February 2027. Below {{za.tax-thresholds[under-65]}} a year, a person under 65 pays no income tax.",
  ],
  comoSeCalcula: [
    "Your taxable income is taxed bracket by bracket, from 18% on the first part up to 45% on the top part.",
    "Rebates come off the tax: {{za.tax-rebates[primary]}} for everyone, {{za.tax-rebates[secondary]}} more from age 65 and another {{za.tax-rebates[tertiary]}} from age 75.",
    "If you pay medical aid, the medical scheme fees tax credit comes off what is left, for each month you paid.",
  ],
  ejemplo: [
    "On a taxable income of R400 000 the brackets give R85 237. After the primary rebate you pay R67 417 for the year, or R5 618,08 a month.",
  ],
  faq: [
    {
      pregunta: "What is the tax threshold?",
      respuesta:
        "It is the income below which you pay no tax, because the rebates cancel it out. For this tax year it is {{za.tax-thresholds[under-65]}} under 65, {{za.tax-thresholds[65-to-74]}} from 65 and {{za.tax-thresholds[75-and-over]}} from 75.",
    },
    {
      pregunta: "What is the difference between my marginal and effective rate?",
      respuesta:
        "The marginal rate is what you pay on your next rand of income. The effective rate is your total tax divided by your income, which is always lower because of the lower brackets and the rebates.",
    },
    {
      pregunta: "Is this the same as provisional tax?",
      respuesta:
        "Provisional tax uses the same tables. It is paid in advance by people with income that is not salary, such as business or rental income, based on an estimate of their taxable income for the year.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Your income for the year after exemptions and deductions such as retirement fund contributions." },
    { termino: "Rebate", definicion: "A fixed amount SARS takes off your tax. Everyone gets the primary rebate; older taxpayers get more." },
    { termino: "Year of assessment", definicion: "The tax year, from 1 March to the end of February. It is named after the year it ends in." },
  ],
});
