import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ls.vat-calculator",
  h1: "VAT calculator for Lesotho",
  title: "VAT calculator Lesotho: add or remove 15% VAT",
  description:
    "Add or remove VAT in Lesotho at the standard {{ls.vat-rates[standard]}}, {{ls.vat-rates[electricity]}} on electricity or {{ls.vat-rates[zero]}} on zero-rated supplies.",
  intro: [
    "Enter a price, say whether it already includes VAT and pick the rate. You get the VAT and the price with and without it.",
    "The rates are the ones Revenue Services Lesotho lists on its tax rates page.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price without VAT by the rate.",
    "To remove VAT from a price that includes it, divide the price by one plus the rate. The difference is the VAT.",
    "Most goods and services, and telecommunications, are at {{ls.vat-rates[standard]}}. Electricity is at {{ls.vat-rates[electricity]}}. Exports and basic commodities are zero-rated.",
  ],
  ejemplo: ["A price of M1 150 including VAT at 15% is M1 000 before VAT, with M150 of VAT."],
  faq: [
    {
      pregunta: "What is the VAT rate in Lesotho?",
      respuesta: "The standard rate is {{ls.vat-rates[standard]}}. Electricity has its own rate of {{ls.vat-rates[electricity]}}.",
    },
    {
      pregunta: "Which supplies are zero-rated?",
      respuesta: "RSL lists exports and basic commodities at {{ls.vat-rates[zero]}}. The VAT Act sets out exactly which goods count.",
    },
    {
      pregunta: "Is telecommunications taxed differently?",
      respuesta: "Telecommunications is at {{ls.vat-rates[standard]}}, the same as other goods and services.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value Added Tax, the tax on most sales of goods and services in Lesotho." },
    { termino: "Zero-rated", definicion: "Taxable at 0%: no VAT is charged on the sale." },
  ],
});
