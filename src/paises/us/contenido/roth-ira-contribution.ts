import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.roth-ira-contribution",
  h1: "Roth IRA contribution calculator",
  title: "Roth IRA Contribution Limit Calculator {{anio}}",
  description:
    "Find how much you can put in a Roth IRA in {{anio}} based on your income and filing status. Limit of {{us.ira-limit}}, catch-up at 50 and the IRS phase-out worksheet.",
  intro: [
    "The Roth IRA limit shrinks as your income rises and disappears above a certain level. Enter your modified AGI and filing status to see your personal limit for 2026.",
  ],
  comoSeCalcula: [
    "The base limit is {{us.ira-limit}}, plus {{us.ira-catch-up}} if you are 50 or older, but never more than your taxable compensation.",
    "Single filers and heads of household get the full limit up to {{us.roth-phaseout-start[single]}} of MAGI and nothing from {{us.roth-phaseout-end[single]}}. On a joint return the range is {{us.roth-phaseout-start[mfj]}} to {{us.roth-phaseout-end[mfj]}}.",
    "Inside the range, the limit drops in proportion to how far into the range you are. The result rounds up to the next $10, and anything between zero and {{us.roth-minimum}} becomes {{us.roth-minimum}}.",
  ],
  ejemplo: ["A single filer age 35 with $160,000 of MAGI is $7,000 into the $15,000 phase-out range. The limit falls by 46.7%, from $7,500 to $4,000."],
  faq: [
    {
      pregunta: "What is the Roth IRA limit for 2026?",
      respuesta: "{{us.ira-limit}}, plus a {{us.ira-catch-up}} catch-up if you are 50 or older. The same limit is shared with any traditional IRA.",
    },
    {
      pregunta: "What if my income is too high?",
      respuesta:
        "You can still make a nondeductible contribution to a traditional IRA. Many people then convert it to a Roth IRA, a strategy known as a backdoor Roth. Talk to a tax professional first if you have other pre-tax IRA money.",
    },
    {
      pregunta: "Until when can I contribute for 2026?",
      respuesta: "Until the tax filing deadline in April 2027, not counting extensions.",
    },
  ],
  glosario: [
    { termino: "Roth IRA", definicion: "A retirement account funded with after-tax money. Qualified withdrawals in retirement are tax free." },
    { termino: "Modified AGI", definicion: "Your AGI with some items added back and any Roth conversion income left out." },
  ],
});
