import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.corporate-income-tax",
  h1: "Corporation tax calculator for The Gambia",
  title: "Corporation tax calculator Gambia: profit or turnover",
  description: "Work out corporation income tax in The Gambia: the higher of {{gm.corporate-tax-rate}} of net profit and the minimum tax of {{gm.minimum-tax-turnover[audited]}} or {{gm.minimum-tax-turnover[unaudited]}} of turnover.",
  intro: [
    "Companies in The Gambia pay the higher of two amounts: income tax on net profit or a minimum tax on turnover. Enter both figures to see which one applies.",
    "The rate on profit is {{gm.corporate-tax-rate}}. The minimum tax is {{gm.minimum-tax-turnover[audited]}} of turnover with audited accounts and {{gm.minimum-tax-turnover[unaudited]}} otherwise.",
  ],
  comoSeCalcula: [
    "Tax on profit: net profit × {{gm.corporate-tax-rate}} (nothing on a loss).",
    "Minimum tax: turnover × {{gm.minimum-tax-turnover[audited]}} for audited accounts or {{gm.minimum-tax-turnover[unaudited]}} for other accounts.",
    "The company pays whichever is higher.",
  ],
  ejemplo: ["A company with D5 million of turnover and D800,000 of profit pays D216,000, because 27% of the profit is more than 1% of turnover."],
  faq: [
    {
      pregunta: "When are returns and payments due?",
      respuesta: "The annual corporate income tax return is due by 31 March. During the year the company makes quarterly declarations and payments within 15 days after each quarter.",
    },
    {
      pregunta: "Why does a company with a loss still pay tax?",
      respuesta: "Because the minimum tax on turnover applies even when there is no profit.",
    },
    {
      pregunta: "What else does a company pay?",
      respuesta: "It withholds PAYE from salaries, dividend income tax on the dividends it pays and withholding tax on some contract payments, and pays fringe benefits tax on benefits in kind.",
    },
  ],
  glosario: [
    { termino: "Turnover", definicion: "Total sales of the year before any costs." },
    { termino: "Minimum tax", definicion: "The floor on income tax, worked out as a share of turnover." },
  ],
});
