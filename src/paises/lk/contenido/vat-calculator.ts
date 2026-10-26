import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.vat-calculator",
  h1: "VAT calculator Sri Lanka",
  title: "VAT calculator Sri Lanka: add or remove 18% VAT",
  description:
    "Add VAT at {{lk.vat}} to a price or take it out of a price that includes it. Uses the standard rate of the Inland Revenue Department.",
  intro: [
    "Enter a price and choose whether it already includes VAT. You get the price before VAT, the VAT and the total.",
    "The calculator uses the standard rate, in force since {{lk.vat#desde}}.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by {{lk.vat}} and add the result.",
    "To take VAT out, divide the price by one plus the rate. The difference is the VAT.",
  ],
  ejemplo: ["A price of Rs. 10,000 before VAT becomes Rs. 11,800 with VAT. A receipt of Rs. 11,800 hides Rs. 1,800 of VAT."],
  faq: [
    {
      pregunta: "When does a business have to register for VAT?",
      respuesta: "When its taxable supplies exceed {{lk.vat-threshold-quarter}} in a quarter or {{lk.vat-threshold-year}} in 12 months. Importers and exporters of goods for commercial purposes must register whatever their turnover.",
    },
    {
      pregunta: "Is any supply taxed at zero?",
      respuesta: "Yes. Exports of goods and services are zero rated.",
    },
    {
      pregunta: "Is SSCL included in VAT?",
      respuesta: "No. The Social Security Contribution Levy is a separate charge of {{lk.sscl-rate}} on part or all of a business's turnover. Our SSCL calculator works it out.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value Added Tax, charged on supplies of goods and services and on imports." },
    { termino: "Zero rated", definicion: "A supply that is taxable but at 0%." },
  ],
});
