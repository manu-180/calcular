import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.small-business-tax",
  h1: "Small business tax calculator for The Gambia",
  title: "Small business tax Gambia: turnover tax calculator",
  description: "Sole traders in The Gambia with turnover under {{gm.presumptive-turnover-limit}} pay a final tax of {{gm.presumptive-rate}} of turnover. Work out yours and the quarterly payments.",
  intro: [
    "If you run a business as an individual and your yearly turnover is under {{gm.presumptive-turnover-limit}}, your income tax is simply {{gm.presumptive-rate}} of turnover. It is a final tax and you do not file an annual return.",
    "Above that limit you pay the higher of personal income tax on your profit and a minimum tax on turnover, which this calculator shows.",
  ],
  comoSeCalcula: [
    "Turnover under {{gm.presumptive-turnover-limit}}: turnover × {{gm.presumptive-rate}}, paid quarterly.",
    "Turnover of {{gm.presumptive-turnover-limit}} or more: the minimum tax is {{gm.minimum-tax-turnover[audited]}} of turnover with audited accounts and {{gm.minimum-tax-turnover[unaudited]}} otherwise. Income tax on your net profit applies if it is higher.",
  ],
  ejemplo: ["A shop with D400,000 of sales in the year pays D12,000, in four quarterly payments of D3,000."],
  faq: [
    {
      pregunta: "When are the quarterly payments due?",
      respuesta: "By the 15th of the month after each quarter. Larger businesses also file an annual return within three months after the end of the tax year.",
    },
    {
      pregunta: "What if I have no records or fixed place of business?",
      respuesta: "Small self-employed people without proper records or a permanent place of business fall under the informal sector income tax, a fixed amount a year that depends on the trade.",
    },
    {
      pregunta: "Is the tax year the calendar year?",
      respuesta: "Yes, unless the Commissioner General approves a special tax year for your business.",
    },
  ],
  glosario: [
    { termino: "Turnover", definicion: "All the money your business takes in from sales in the year, before costs." },
    { termino: "Final tax", definicion: "A tax that settles your income tax on that business, with no annual return to file." },
  ],
});
