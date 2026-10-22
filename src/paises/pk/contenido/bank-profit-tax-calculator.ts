import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.bank-profit-tax-calculator",
  h1: "Tax on bank profit calculator",
  title: "Tax on bank profit Pakistan: {{pk.profit-on-debt-bank}} withholding",
  description: "See the profit you keep on a bank savings account or term deposit after the {{pk.profit-on-debt-bank}} tax on profit on debt.",
  intro: ["Banks deduct tax from the profit they pay on accounts and deposits. Enter your deposit and rate to see the profit before and after tax."],
  comoSeCalcula: [
    "Profit = amount × rate × months ÷ 12.",
    "Tax on profit paid by a bank on an account or deposit is {{pk.profit-on-debt-bank}} (section 7B, Division IIIA of the First Schedule).",
    "The rate applies to persons on the Active Taxpayers List. People not on it have tax deducted at a higher rate.",
  ],
  ejemplo: ["Rs. 1 million at 10% earns Rs. 100,000 in a year. The bank deducts Rs. 20,000 and you keep Rs. 80,000."],
  faq: [
    {
      pregunta: "Who deducts the tax?",
      respuesta: "The bank, when it credits the profit to your account.",
    },
    {
      pregunta: "What about National Savings profit?",
      respuesta: "National Savings deducts its own withholding tax. Use the National Savings calculators for those certificates.",
    },
    {
      pregunta: "Does zakat apply too?",
      respuesta: "Savings and profit-and-loss sharing accounts at or above the nisab can have zakat deducted on the first day of Ramazan.",
    },
  ],
  glosario: [{ termino: "Profit on debt", definicion: "Profit or interest paid on deposits, accounts and securities." }],
});
