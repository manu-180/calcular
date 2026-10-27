import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.income-tax-calculator",
  h1: "Income tax calculator Malta 2026",
  title: "Income tax Malta 2026: single, married and parent rates",
  description:
    "Work out your Malta income tax for 2026 with the single, married and parent rates, including the new rates for families with one child or two or more.",
  intro: [
    "Enter your chargeable income for 2026 and pick the rates that apply to you. You get the tax for the year, the monthly equivalent and your top band.",
    "Malta taxes the first {{mt.income-tax-single[0].hasta}} at 0% under single rates. Above that come bands at {{mt.income-tax-single[1].tasa}}, {{mt.income-tax-single[2].tasa}} and {{mt.income-tax-single[-1].tasa}}.",
  ],
  comoSeCalcula: [
    "Each slice of income pays the rate of its band. At single rates, income up to {{mt.income-tax-single[0].hasta}} pays nothing, the part up to {{mt.income-tax-single[1].hasta}} pays {{mt.income-tax-single[1].tasa}}, the part up to {{mt.income-tax-single[2].hasta}} pays {{mt.income-tax-single[2].tasa}} and the rest pays {{mt.income-tax-single[-1].tasa}}.",
    "The Income Tax Act writes the same thing as a formula for each band: multiply all your income by the band rate and subtract a fixed amount. Both ways give the same tax.",
    "Married couples who are taxed jointly get wider bands: nothing up to {{mt.income-tax-married[0].hasta}} and {{mt.income-tax-married[1].tasa}} up to {{mt.income-tax-married[1].hasta}}.",
  ],
  ejemplo: [
    "A single person with €30,000 of chargeable income pays nothing on the first {{mt.income-tax-single[0].hasta}}, €600 on the next €4,000 and €3,500 on the last €14,000. That is €4,100 for the year, about €341.67 a month.",
  ],
  faq: [
    {
      pregunta: "Who can use the new rates for families with children?",
      respuesta:
        "Residents in Malta who maintain a child aged 18 or under, or 23 or under in full-time education. At least one spouse or parent has to be an EU or EEA national, or a long-term resident whose child was born and lives in Malta. With two or more such children the bands are wider still: nothing up to {{mt.income-tax-married-two-children[0].hasta}} for a married couple and {{mt.income-tax-parent-two-children[0].hasta}} for a parent.",
    },
    {
      pregunta: "What are the parent rates?",
      respuesta:
        "They are for a parent who maintains a child or pays maintenance for one. The tax-free band is {{mt.income-tax-parent-one-child[0].hasta}} with one child. A parent who does not meet the conditions for the new rates keeps the older parent rates, with a tax-free band of {{mt.income-tax-parent[0].hasta}}.",
    },
    {
      pregunta: "Which year do these rates apply to?",
      respuesta:
        "To income earned from 1 January 2026, which Malta assesses in the year of assessment 2027. Your employer uses them for the tax deducted under the Final Settlement System (FSS) during 2026.",
    },
    {
      pregunta: "Is this the same as the tax on my payslip?",
      respuesta:
        "Over a full year it should be close, as FSS tables spread the same yearly tax over your pay periods. Overtime, part-time income and some allowances can be taxed at flat rates instead, so your final figure may differ.",
    },
  ],
  glosario: [
    { termino: "Chargeable income", definicion: "Your taxable income for the year after any deductions the law allows." },
    { termino: "FSS", definicion: "Final Settlement System, the way employers deduct income tax from wages in Malta." },
    { termino: "Year of assessment", definicion: "The year after the one in which you earn the income. Income earned in 2026 is assessed in 2027." },
  ],
});
