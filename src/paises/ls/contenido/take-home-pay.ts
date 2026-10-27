import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.take-home-pay",
  h1: "Take-home pay calculator for Lesotho",
  title: "Take-home pay calculator Lesotho: PAYE after tax",
  description:
    "Work out your net salary after PAYE in Lesotho. Uses the {{ls.income-tax-bands[0].tasa}} and {{ls.income-tax-bands[1].tasa}} rates and the tax credit from Revenue Services Lesotho.",
  intro: [
    "Enter your gross monthly salary and see what lands in your account after PAYE. If you pay into an approved pension fund through payroll, add that too.",
    "The calculation uses the tax structure that Revenue Services Lesotho (RSL) published for the tax year that started on {{ls.income-tax-bands#desde}}.",
  ],
  comoSeCalcula: [
    "Your pension contribution comes off your salary first, up to {{ls.superannuation-cap}} of your pay. What is left is your chargeable income.",
    "The first {{ls.income-tax-bands[0].hasta}} of chargeable income a year is taxed at {{ls.income-tax-bands[0].tasa}}. Everything above it is taxed at {{ls.income-tax-bands[1].tasa}}. Each month the employer uses one twelfth of that band.",
    "The tax credit of {{ls.tax-credit}} a year comes off the tax. If the credit is bigger than the tax, you pay nothing, but the difference is not refunded.",
    "Take-home pay is your gross salary less PAYE and your pension contribution.",
  ],
  ejemplo: [
    "RSL's own example: on M10 000 a month, the first M6 480 is taxed at 20% (M1 296) and the other M3 520 at 30% (M1 056). Less the M1 020 credit, PAYE is M1 332 and take-home pay is M8 668.",
  ],
  faq: [
    {
      pregunta: "From what salary do I start paying PAYE?",
      respuesta: "Once {{ls.income-tax-bands[0].tasa}} of your chargeable income is more than the tax credit of {{ls.tax-credit}} a year. Below that point the credit wipes out the tax. For the 2026/27 tax year RSL puts the point at M5 100 a month.",
    },
    {
      pregunta: "What counts as employment income?",
      respuesta: "Wages, salary, bonuses, allowances, overtime, leave pay, commission, gratuity, fees and severance pay all count, under section 18(1) of the Income Tax Act.",
    },
    {
      pregunta: "Does my pension contribution lower my tax?",
      respuesta: "Yes, if the fund is approved. Your contribution and your employer's together are deductible up to {{ls.superannuation-cap}} of your employment income, and yours counts first.",
    },
    {
      pregunta: "When does my employer pay the PAYE to RSL?",
      respuesta: "By the 15th of the month after the month the tax was deducted from your pay.",
    },
  ],
  glosario: [
    { termino: "PAYE", definicion: "Pay As You Earn. The income tax your employer deducts from your salary every month and pays to RSL." },
    { termino: "Tax credit", definicion: "A fixed amount every resident individual takes off their tax. It is non-refundable." },
    { termino: "Chargeable income", definicion: "The income that is taxed after allowed deductions such as approved pension contributions." },
  ],
});
