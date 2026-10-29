import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.bonus-tax-calculator",
  h1: "Bonus tax calculator for Lesotho",
  title: "Bonus tax calculator Lesotho: PAYE on a bonus",
  description: "See how much PAYE comes off a bonus in Lesotho and what you keep, with the {{ls.income-tax-bands[0].tasa}} and {{ls.income-tax-bands[1].tasa}} rates.",
  intro: [
    "A bonus is employment income, so PAYE applies to it. Enter your normal monthly salary and the bonus to see the tax on it and the amount you take home.",
    "Because PAYE is worked out month by month, a bonus often pushes part of your pay into the higher rate.",
  ],
  comoSeCalcula: [
    "Work out PAYE for a normal month: {{ls.income-tax-bands[0].tasa}} on the first twelfth of {{ls.income-tax-bands[0].hasta}}, {{ls.income-tax-bands[1].tasa}} above it, less one twelfth of the {{ls.tax-credit}} credit.",
    "Work out PAYE again on salary plus bonus.",
    "The difference is the tax on the bonus.",
  ],
  ejemplo: ["On M10 000 a month with a M10 000 bonus, PAYE goes from M1 332 to M4 332. The bonus costs M3 000 in tax and you keep M7 000."],
  faq: [
    {
      pregunta: "Is a bonus taxed in Lesotho?",
      respuesta: "Yes. Bonuses are part of employment income under section 18(1) of the Income Tax Act.",
    },
    {
      pregunta: "Why is so much of my bonus taxed at the higher rate?",
      respuesta: "If your salary is already above the monthly band, every loti of bonus is taxed at {{ls.income-tax-bands[1].tasa}}.",
    },
    {
      pregunta: "When does my employer pay the tax on my bonus to RSL?",
      respuesta: "Like all PAYE, by the 15th of the month after the month it was deducted.",
    },
  ],
  glosario: [
    { termino: "Bonus", definicion: "Extra pay on top of your normal salary." },
    { termino: "PAYE", definicion: "Income tax your employer deducts from your pay each month." },
  ],
});
