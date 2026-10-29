import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.business-income-tax-calculator",
  h1: "Business income tax calculator Ethiopia",
  title: "Business income tax for individuals in Ethiopia (Schedule C)",
  description:
    "Work out the yearly business income tax of an individual with the Schedule C bands of Proclamation 1395/2025, from 0% up to {{et.business-income-tax[-1].tasa}}.",
  intro: [
    "Individuals who run a business and keep books pay business income tax on their taxable profit under Schedule C. Enter your taxable income for the year to see the tax.",
    "Category B taxpayers are left out: they pay a tax on their annual gross sales instead.",
  ],
  comoSeCalcula: [
    "The first {{et.business-income-tax[1].desde}} of taxable business income a year pays nothing.",
    "Then {{et.business-income-tax[1].tasa}} up to {{et.business-income-tax[2].desde}}, {{et.business-income-tax[2].tasa}} up to {{et.business-income-tax[3].desde}}, {{et.business-income-tax[3].tasa}} up to {{et.business-income-tax[4].desde}} and {{et.business-income-tax[4].tasa}} up to {{et.business-income-tax[5].desde}}.",
    "Income above {{et.business-income-tax[-1].desde}} pays {{et.business-income-tax[-1].tasa}}.",
  ],
  ejemplo: [
    "A taxable profit of ETB 150,000 pays ETB 28,800 for the year.",
  ],
  faq: [
    {
      pregunta: "Who uses these bands?",
      respuesta: "Individuals with business income, except Category B taxpayers. Companies and other bodies are taxed differently.",
    },
    {
      pregunta: "Is there a minimum tax?",
      respuesta: "Yes. Proclamation 1395/2025 added a minimum alternative tax: if the tax on business profit comes to less than 2.5% of turnover, the taxpayer pays a minimum tax of 2.5% of turnover. An entity under liquidation and a corporate body under debt restructuring are exempt.",
    },
    {
      pregunta: "Since when do these bands apply?",
      respuesta: "For income derived from 8 July 2025.",
    },
  ],
  glosario: [
    { termino: "Schedule C", definicion: "The part of the income tax law that covers business income." },
    { termino: "Category B taxpayer", definicion: "A small business that pays tax on its annual gross sales." },
  ],
});
