import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.gross-salary-calculator",
  h1: "Net to gross salary calculator",
  title: "Net to gross salary calculator for Lesotho",
  description: "Find the gross salary that gives you the take-home pay you want in Lesotho, after PAYE at {{ls.income-tax-bands[0].tasa}} and {{ls.income-tax-bands[1].tasa}}.",
  intro: [
    "Negotiating a job offer in net terms? Enter the take-home pay you want each month and get the gross salary to ask for.",
    "It works the PAYE calculation backwards with the current RSL band and tax credit. It assumes no pension contribution.",
  ],
  comoSeCalcula: [
    "PAYE takes {{ls.income-tax-bands[0].tasa}} of the first {{ls.income-tax-bands[0].hasta}} a year and {{ls.income-tax-bands[1].tasa}} above it, less the {{ls.tax-credit}} credit.",
    "The calculator finds the lowest gross salary whose take-home pay reaches the amount you entered.",
  ],
  ejemplo: ["To take home M8 668 a month you need M10 000 gross. PAYE on M10 000 is M1 332."],
  faq: [
    {
      pregunta: "Why does a gross salary of M5 000 give the same net?",
      respuesta: "Because {{ls.income-tax-bands[0].tasa}} of M5 000 is smaller than the monthly share of the {{ls.tax-credit}} tax credit, so no PAYE is due.",
    },
    {
      pregunta: "Does this include pension contributions?",
      respuesta: "No. If you pay into a pension fund, use the take-home pay calculator with your contribution to check the final figure.",
    },
    {
      pregunta: "How much of each extra loti do I keep?",
      respuesta: "Above the band, {{ls.income-tax-bands[1].tasa}} of each extra loti goes to PAYE and you keep the rest. Below it, {{ls.income-tax-bands[0].tasa}} goes to PAYE.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Your pay before PAYE and other deductions." },
    { termino: "Net salary", definicion: "What you take home after PAYE." },
  ],
});
