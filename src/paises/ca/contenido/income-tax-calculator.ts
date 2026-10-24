import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.income-tax-calculator",
  h1: "Income tax calculator 2026 for Canada",
  title: "Income tax calculator 2026: federal and provincial",
  description: "Estimate your 2026 federal and provincial income tax, average and marginal rate. Every province and territory, Quebec included, with official figures.",
  intro: [
    "Enter your income and your province or territory to see how much income tax you pay in 2026, split between federal and provincial tax.",
    "It uses the 2026 brackets and credits published by the Canada Revenue Agency, including the CPP and EI credits that come with a job. For Quebec it uses the Quebec tax table from Finances Québec and takes the {{ca.qc-abatement}} Quebec abatement off federal tax.",
  ],
  comoSeCalcula: [
    "Taxable income is your employment and other income, less RRSP and pension deductions and the enhanced part of your CPP contributions.",
    "Federal tax applies the 2026 brackets, then takes off credits at the lowest federal rate: the basic personal amount of up to {{ca.federal-bpa[max]}}, the Canada employment amount of {{ca.canada-employment-amount}} and your base CPP and EI.",
    "Provincial tax works the same way with your province's brackets and basic personal amount. Ontario adds a surtax and the Ontario Health Premium (up to {{ca.on-health-premium-max}}), BC takes off its tax reduction of up to {{ca.bc-tax-reduction[amount]}}, and Alberta adds its supplemental credit.",
    "The marginal rate is the tax on your next $100 of income, so it includes surtaxes and clawbacks.",
  ],
  ejemplo: [
    "An Ontario employee earning $70,000 in 2026 has taxable income of $69,335 after the enhanced CPP deduction. Federal tax is $7,278.19 and Ontario tax is $3,855.73 (with a $600 health premium), for a total of $11,133.92. The marginal rate is 29.65%.",
  ],
  faq: [
    {
      pregunta: "Is this my tax refund?",
      respuesta: "No. It is the tax you owe for the year. Your refund or balance owing is the difference between this amount and the tax your employer already took off your pay.",
    },
    {
      pregunta: "Why does the federal basic personal amount change with income?",
      respuesta: "The full {{ca.federal-bpa[max]}} applies until your income reaches the start of the 29% bracket. Above that it shrinks gradually to {{ca.federal-bpa[min]}} at the start of the 33% bracket.",
    },
    {
      pregunta: "Which province's tax do I pay if I moved during the year?",
      respuesta: "You pay the tax of the province or territory where you lived on December 31, 2026.",
    },
    {
      pregunta: "Does this include tax credits like tuition, medical expenses or donations?",
      respuesta: "No. It includes the basic personal amount, the Canada employment amount and the CPP and EI credits. Other credits would lower your tax further.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Your income after deductions such as RRSP contributions. Tax brackets apply to this amount." },
    { termino: "Marginal tax rate", definicion: "The combined federal and provincial rate on the next dollar you earn." },
    { termino: "Non-refundable tax credit", definicion: "An amount that lowers the tax you owe, calculated at the lowest tax rate, but cannot create a refund on its own." },
  ],
});
