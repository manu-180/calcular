import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.income-tax-calculator",
  h1: "Income Tax calculator 2026/27",
  title: "Income Tax calculator 2026/27 for the UK and Scotland",
  description:
    "Work out your Income Tax for 2026/27 with the {{gb.personal-allowance}} Personal Allowance and the bands for England, Wales, Northern Ireland and Scotland.",
  intro: [
    "Enter your total taxable income for the year and see how much Income Tax you pay, how it splits across the bands and your effective rate.",
    "England, Wales and Northern Ireland share the same bands. Scotland has six bands of its own, from a starter rate of 19% to a top rate of 48%.",
  ],
  comoSeCalcula: [
    "The first {{gb.personal-allowance}} of your income is tax free. This is your Personal Allowance.",
    "Above {{gb.personal-allowance-taper}}, the allowance goes down by £1 for every £2 of income, so it disappears at {{gb.additional-rate-threshold}}.",
    "The rest is taxed band by band. Each rate only applies to the slice of income inside its band, never to all of it.",
  ],
  ejemplo: [
    "On £50,000 in England, £12,570 is tax free and the other £37,430 is taxed at 20%. That is £7,486 a year.",
    "On £60,000 in Scotland you pay £13,182.05, because part of your income is taxed at 21% and 42%.",
  ],
  faq: [
    {
      pregunta: "What counts as taxable income?",
      respuesta:
        "Wages, self-employed profit, most pensions (including the State Pension), rental profit and some benefits. ISA interest and the first part of savings interest and dividends are covered by their own allowances.",
    },
    {
      pregunta: "Does moving into a higher band mean all my income is taxed more?",
      respuesta: "No. Only the part above the threshold is taxed at the higher rate. A pay rise never leaves you with less after Income Tax.",
    },
    {
      pregunta: "Why do I pay Scottish rates if I work in England?",
      respuesta: "Scottish Income Tax depends on where you live, not where your employer is. If your main home is in Scotland, you pay the Scottish rates.",
    },
    {
      pregunta: "Are dividends and savings taxed the same way?",
      respuesta:
        "No. They have their own allowances and rates, and Scottish taxpayers use the UK bands for them. Use the dividend tax calculator for dividends.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Your income after taking off the Personal Allowance." },
    { termino: "Effective rate", definicion: "Your total Income Tax divided by your total income." },
    { termino: "Marginal rate", definicion: "The rate you pay on the next pound you earn." },
  ],
});
