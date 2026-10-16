import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.capital-gains-tax",
  h1: "Capital gains tax calculator for Canada 2026",
  title: "Capital gains tax calculator 2026 for Canada",
  description: "Estimate the tax on a capital gain in 2026. Only {{ca.capital-gains-inclusion-rate}} of the gain is taxed, at your federal and provincial rates. All provinces except Quebec.",
  intro: [
    "Enter what you sold for, what you paid and your other income to see how much tax the gain adds to your 2026 return.",
    "The capital gains inclusion rate stays at one half: the proposed increase to two thirds was cancelled.",
  ],
  comoSeCalcula: [
    "The capital gain is the selling price, after selling costs, less your adjusted cost base.",
    "Only {{ca.capital-gains-inclusion-rate}} of the gain is taxable. That taxable capital gain is added to your other income.",
    "The tax on the gain is the difference between your total 2026 income tax with the gain and without it, using the federal and provincial brackets of your province.",
  ],
  ejemplo: [
    "An Ontario employee earning $70,000 sells shares for $50,000 that cost $30,000. The gain is $20,000 and $10,000 is taxable. It adds $3,115 of tax, so you keep $16,885 of the gain.",
  ],
  faq: [
    {
      pregunta: "What is the capital gains inclusion rate in 2026?",
      respuesta: "{{ca.capital-gains-inclusion-rate}}. The government cancelled the planned increase to two thirds, so the one-half rate still applies.",
    },
    {
      pregunta: "Why is the tax not just half the gain times my marginal rate?",
      respuesta: "The taxable part of the gain can push you into a higher bracket, and in Ontario it can also raise the Ontario Health Premium. The calculator works out your tax with and without the gain, so those effects are included.",
    },
    {
      pregunta: "Does it work for Quebec?",
      respuesta: "No. Quebec residents pay Quebec provincial income tax through Revenu Québec, which this calculator does not cover yet.",
    },
  ],
  glosario: [
    { termino: "Adjusted cost base (ACB)", definicion: "What you paid for the property, including costs such as commissions, adjusted for some later events." },
    { termino: "Taxable capital gain", definicion: "The part of a capital gain that is included in your income: {{ca.capital-gains-inclusion-rate}} of the gain." },
    { termino: "Inclusion rate", definicion: "The share of a capital gain that is taxed." },
  ],
});
