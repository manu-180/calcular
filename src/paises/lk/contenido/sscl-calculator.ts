import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.sscl-calculator",
  h1: "SSCL calculator",
  title: "SSCL calculator Sri Lanka: Social Security Contribution Levy",
  description:
    "Work out the Social Security Contribution Levy at {{lk.sscl-rate}} on the liable part of your quarterly turnover, by type of business.",
  intro: [
    "The Social Security Contribution Levy is charged on the turnover of businesses above the threshold, every quarter. How much of the turnover counts depends on what the business does.",
    "Choose your activity and enter the turnover for the quarter.",
  ],
  comoSeCalcula: [
    "Liable turnover: importers and service providers count 100% of turnover, manufacturers {{lk.sscl-liable-share[manufacture]}}, wholesalers and retailers {{lk.sscl-liable-share[trade]}}, and registered distributors of a local manufacturer {{lk.sscl-liable-share[distributor]}}.",
    "SSCL: {{lk.sscl-rate}} of the liable turnover.",
    "You are liable when turnover goes above {{lk.sscl-threshold-quarter}} in a quarter or {{lk.sscl-threshold-year}} over four consecutive quarters.",
  ],
  ejemplo: ["A retail shop with Rs. 20 million of sales in a quarter counts half, Rs. 10 million, and pays Rs. 250,000 of SSCL."],
  faq: [
    {
      pregunta: "How often is SSCL paid?",
      respuesta: "It is charged for every quarter and paid monthly on a self-assessment basis.",
    },
    {
      pregunta: "Are bad debts part of the turnover?",
      respuesta: "No. A bad debt incurred in the quarter is left out, and if it is recovered later it is added to the turnover of that later quarter.",
    },
    {
      pregunta: "How are financial services and land sales treated?",
      respuesta: "Financial services pay on the value addition attributable to them, and sales of land with improvements pay on the value of the improvement. This calculator does not cover those two cases.",
    },
  ],
  glosario: [
    { termino: "SSCL", definicion: "Social Security Contribution Levy, charged for every quarter since 1 October 2022." },
    { termino: "Liable turnover", definicion: "The part of turnover on which the levy is charged." },
  ],
});
