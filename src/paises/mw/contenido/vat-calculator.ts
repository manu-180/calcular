import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mw.vat-calculator",
  h1: "VAT calculator Malawi",
  title: "VAT calculator Malawi: add or remove 17.5% VAT",
  description:
    "Add VAT to a price or take it out at the standard rate of {{mw.vat}}, in force since {{mw.vat#desde}} under the VAT (Amendment) (No. 2) Act, 2025.",
  intro: [
    "Enter a price and choose whether to add VAT to it or take VAT out of a price that already includes it.",
    "The standard rate went up from 16.5% to {{mw.vat}} when the VAT (Amendment) (No. 2) Act, 2025 was published.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by {{mw.vat}} and add the result to the price.",
    "To take VAT out, divide the price that includes VAT by 1 plus the rate. What is left over is the VAT.",
  ],
  ejemplo: ["A price of MK 10,000 before VAT carries MK 1,750 of VAT, so you pay MK 11,750. Taking VAT out of MK 11,750 gives back MK 10,000."],
  faq: [
    {
      pregunta: "When did VAT go up to 17.5%?",
      respuesta: "The VAT (Amendment) (No. 2) Act, 2025 was published on 30 December 2025. The MRA says the new rate applies from that date.",
    },
    {
      pregunta: "Is VAT charged on imports?",
      respuesta: "Yes. VAT is payable at {{mw.vat}} on importation, including on goods that are free of import duty.",
    },
    {
      pregunta: "Are exports charged VAT?",
      respuesta: "No. The MRA tax incentives handbook says VAT on all exports is zero rated.",
    },
  ],
  glosario: [
    { termino: "Standard rate", definicion: "The VAT rate that applies to most goods and services." },
    { termino: "Zero rated", definicion: "Taxable at 0%, so no VAT is added to the price." },
  ],
});
