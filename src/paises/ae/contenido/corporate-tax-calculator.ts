import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.corporate-tax-calculator",
  h1: "UAE corporate tax calculator",
  title: "Corporate tax calculator UAE: 0% and 9%",
  description:
    "Work out UAE corporate tax: {{ae.corporate-tax[0].tasa}} on taxable income up to {{ae.corporate-tax[0].hasta}} and {{ae.corporate-tax[-1].tasa}} on the part above it.",
  intro: [
    "Corporate tax in the UAE is charged on the taxable income of companies and other businesses for each tax period.",
    "Enter your taxable income to see the tax and the effective rate.",
  ],
  comoSeCalcula: [
    "Taxable income up to {{ae.corporate-tax[0].hasta}} is taxed at {{ae.corporate-tax[0].tasa}}.",
    "The part above {{ae.corporate-tax[-1].desde}} is taxed at {{ae.corporate-tax[-1].tasa}}.",
    "Large multinationals that meet the OECD Pillar Two criteria may face a different rate.",
  ],
  ejemplo: ["A company with AED 1 million of taxable income pays 9% on AED 625,000: AED 56,250."],
  faq: [
    {
      pregunta: "Who has to pay corporate tax in the UAE?",
      respuesta: "UAE companies and other legal persons, foreign entities with a permanent establishment in the UAE, and individuals doing business as set by a Cabinet Decision. Free zone companies are in scope too.",
    },
    {
      pregunta: "When is the return due?",
      respuesta: "Within 9 months from the end of the tax period. The tax is generally paid by the same deadline.",
    },
    {
      pregunta: "Who is exempt?",
      respuesta: "Among others, government entities, some government-controlled entities, extractive businesses, qualifying public benefit entities and approved pension funds and investment funds.",
    },
  ],
  glosario: [
    { termino: "Taxable income", definicion: "Accounting profit before tax, adjusted under the Corporate Tax Law." },
    { termino: "Tax period", definicion: "Usually the financial year of the business." },
  ],
});
