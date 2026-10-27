import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.personal-income-tax-calculator",
  h1: "Personal income tax calculator Malawi",
  title: "Personal income tax calculator Malawi 2026",
  description:
    "Work out income tax on your yearly taxable income in Malawi: the first {{mw.personal-tax-bands[0].hasta}} is tax free and the rest is taxed at {{mw.personal-tax-bands[1].tasa}}.",
  intro: [
    "Enter your taxable income for the year to see the income tax on it.",
    "The rates come from the Taxation (Amendment) Act 2025 and apply from 30 December 2025.",
  ],
  comoSeCalcula: [
    "The first {{mw.personal-tax-bands[0].hasta}} of taxable income a year is taxed at {{mw.personal-tax-bands[0].tasa}}.",
    "Everything above {{mw.personal-tax-bands[1].desde}} is taxed at {{mw.personal-tax-bands[1].tasa}}.",
  ],
  ejemplo: ["On taxable income of MK 6,000,000 the first MK 2,040,000 is tax free and MK 3,960,000 is taxed at 30%. The tax is MK 1,188,000."],
  faq: [
    {
      pregunta: "Is salary taxed with these rates?",
      respuesta: "No. Employment income has its own PAYE bands, with rates of 30%, 35% and 40% above the tax-free amount. Use the PAYE calculator for your salary.",
    },
    {
      pregunta: "Does this apply to a small business?",
      respuesta: "A business with a turnover up to MK 12.5 million a year usually pays presumptive tax instead, unless it chose the normal rules.",
    },
    {
      pregunta: "What rate do companies pay?",
      respuesta: "Companies pay corporate income tax: 30% on annual taxable income up to MK 5 billion and 40% in excess of MK 5 billion, under the 2025 amendments.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Income less the expenses the Taxation Act allows you to deduct." },
    { termino: "Year of assessment", definicion: "The tax year the MRA assesses your income for." },
  ],
});
