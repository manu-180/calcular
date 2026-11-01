import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bb.income-tax-calculator",
  h1: "Income tax calculator Barbados {{anio}}",
  title: "Income tax calculator {{anio}}: rates and the CIC refund",
  description:
    "Work out your Barbados income tax for the year at {{bb.income-tax[0].tasa}} and {{bb.income-tax[1].tasa}}, after the {{bb.personal-allowance}} allowance and the Compensatory Income Credit.",
  intro: [
    "For income year 2026 an employee in Barbados pays {{bb.income-tax[0].tasa}} on the first {{bb.income-tax[0].hasta}} of taxable income and {{bb.income-tax[1].tasa}} on the rest. Enter what you earn in the year to see the tax, the credit you can claim back and what you end up paying.",
    "The Compensatory Income Credit wipes out the tax for employees who earn up to {{bb.cic-income-limit}} a year, but only when you file your return. This page shows both numbers so you know what refund to expect.",
  ],
  comoSeCalcula: [
    "Taxable income: your income less the personal allowance of {{bb.personal-allowance}}.",
    "Tax: {{bb.income-tax[0].tasa}} on taxable income up to {{bb.income-tax[0].hasta}}, then {{bb.income-tax[1].tasa}} above that.",
    "Compensatory Income Credit: if you are an employee earning no more than {{bb.cic-income-limit}}, the BRA refunds the tax you paid, up to {{bb.cic-max}} for the year.",
    "Effective rate: the tax after the credit divided by your income.",
  ],
  ejemplo: [
    "On Bds$100,000 a year your taxable income is Bds$75,000. The first Bds$50,000 is taxed at 11.5% (Bds$5,750) and the other Bds$25,000 at 27.5% (Bds$6,875), for Bds$12,625 in total. At Bds$45,000 a year you would pay Bds$2,300 through PAYE and get all of it back through the credit.",
  ],
  faq: [
    {
      pregunta: "What is the Compensatory Income Credit?",
      respuesta:
        "A credit for resident employees earning more than $25,000 and up to {{bb.cic-income-limit}} a year. Policy note OGC No. 002/2026 raised the limit from $35,000 starting with income year 2025, and the credit for 2026 is at most {{bb.cic-max}}.",
    },
    {
      pregunta: "Who cannot claim the credit?",
      respuesta: "Self-employed people, people with income from goods and services, and company directors, according to the BRA policy note.",
    },
    {
      pregunta: "Does my employer stop deducting PAYE if I qualify?",
      respuesta: "No. The BRA reminds employers to deduct PAYE from anyone earning more than $25,000 a year, even if they qualify for the credit. You get the money back after filing.",
    },
    {
      pregunta: "When is the income tax return due?",
      respuesta: "The BRA set April 30, 2026 as the filing date for the 2025 return. The credit is claimed on that return through TAMIS.",
    },
  ],
  glosario: [
    { termino: "Personal allowance", definicion: "The part of your yearly income that is not taxed." },
    { termino: "Taxable income", definicion: "Income after the personal allowance and any other allowable deductions." },
    { termino: "CIC", definicion: "Compensatory Income Credit. A refund of income tax for lower and middle income employees." },
    { termino: "TAMIS", definicion: "The BRA online system for filing returns and claiming refunds." },
  ],
});
