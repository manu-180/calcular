import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.income-tax-calculator",
  h1: "Lesotho income tax calculator",
  title: "Income tax calculator Lesotho: yearly tax with RSL rates",
  description:
    "Work out your yearly income tax in Lesotho as an employee or sole trader, with the {{ls.income-tax-bands[0].hasta}} band and the {{ls.tax-credit}} tax credit.",
  intro: [
    "Use this for a full tax year, from 1 April to 31 March. It suits a sole trader filing a return, a pensioner, or an employee who wants to check the yearly total.",
    "The rates are the ones Revenue Services Lesotho (RSL) set for resident individuals from {{ls.income-tax-bands#desde}}.",
  ],
  comoSeCalcula: [
    "Take your income for the year and subtract your approved pension contributions (up to {{ls.superannuation-cap}} of income) and other allowable deductions.",
    "Tax the first {{ls.income-tax-bands[0].hasta}} at {{ls.income-tax-bands[0].tasa}} and the rest at {{ls.income-tax-bands[1].tasa}}.",
    "Subtract the tax credit of {{ls.tax-credit}}. A negative result means no tax, not a refund.",
  ],
  ejemplo: [
    "From RSL's table: on M114 000 a year, the first M77 760 costs M15 552 and the other M36 240 costs M10 872. Less the M12 240 credit, the tax is M14 184.",
  ],
  faq: [
    {
      pregunta: "How many tax rates does Lesotho have for individuals?",
      respuesta: "Two. Chargeable income up to {{ls.income-tax-bands[0].hasta}} a year is taxed at {{ls.income-tax-bands[0].tasa}} and income above it at {{ls.income-tax-bands[1].tasa}}.",
    },
    {
      pregunta: "Is the tax credit paid out if my tax is lower?",
      respuesta: "No. RSL treats a negative or nil result as non-taxable income. The credit only reduces tax, it never becomes a refund.",
    },
    {
      pregunta: "Who uses these rates?",
      respuesta: "Resident individuals, including sole traders for their yearly tax, employees and pensioners through PAYE.",
    },
  ],
  glosario: [
    { termino: "Tax year", definicion: "In Lesotho it runs from 1 April to 31 March." },
    { termino: "Sole trader", definicion: "A person who runs a business in their own name and pays income tax on its profit." },
    { termino: "RSL", definicion: "Revenue Services Lesotho, the tax authority. It was known before as the Lesotho Revenue Authority." },
  ],
});
