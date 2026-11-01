import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rw.small-business-tax-calculator",
  h1: "Small business tax calculator Rwanda",
  title: "Small business tax Rwanda: flat amount or 3% lump sum",
  description: "Income tax for micro and small enterprises: a flat yearly amount by turnover, or {{rw.lump-sum-rate}} of turnover up to {{rw.lump-sum-upper}}.",
  intro: [
    "Small traders in Rwanda do not need full accounts to pay income tax. The tax depends on annual turnover. Enter yours to see the amount and the regime.",
  ],
  comoSeCalcula: [
    "Turnover up to {{rw.flat-tax[0].hasta}}: no income tax.",
    "Micro-enterprises up to {{rw.flat-tax[-1].hasta}}: a flat amount from {{rw.flat-tax[1].cuotaFija}} to {{rw.flat-tax[-1].cuotaFija}} a year, by band.",
    "Small enterprises with turnover above {{rw.flat-tax[-1].hasta}} and up to {{rw.lump-sum-upper}}: {{rw.lump-sum-rate}} of annual turnover.",
    "Above {{rw.lump-sum-upper}}: the real regime, taxed on actual profit.",
  ],
  ejemplo: ["A shop with RWF 8,000,000 of turnover a year pays RWF 210,000. With RWF 15,000,000 it pays 3%: RWF 450,000."],
  faq: [
    {
      pregunta: "When is the annual tax due?",
      respuesta: "Declare and pay by 31 March of the following year. Quarterly prepayments are due by 30 June, 30 September and 31 December.",
    },
    {
      pregunta: "Can I choose to pay on profit instead?",
      respuesta: "Yes. A small enterprise can opt for the real regime if it keeps accounts. It must tell the RRA, and the choice cannot be reversed for three years.",
    },
    {
      pregunta: "Do I also pay a trading licence?",
      respuesta: "Yes, most businesses pay a trading licence to the district on top of income tax. Use the trading licence calculator to see the amount.",
    },
  ],
  glosario: [
    { termino: "Turnover", definicion: "Total sales in the year before any expense." },
    { termino: "Real regime", definicion: "Income tax on actual profit, worked out from the accounts." },
  ],
});
