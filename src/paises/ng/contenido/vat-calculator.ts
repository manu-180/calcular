import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ng.vat-calculator",
  h1: "VAT calculator Nigeria",
  title: "VAT calculator Nigeria: add or remove 7.5% VAT",
  description: "Add VAT at {{ng.vat}} to a price or take it out of a price that already includes it, under the Nigeria Tax Act 2025.",
  intro: [
    "Value Added Tax in Nigeria is {{ng.vat}} on taxable goods and services. Enter an amount to add VAT or to find the price before VAT.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by {{ng.vat}} and add the result.",
    "To remove VAT from a price that includes it, divide by 1 plus the rate (1.075 at 7.5%).",
  ],
  ejemplo: ["A ₦100,000 invoice carries ₦7,500 of VAT, so the customer pays ₦107,500."],
  faq: [
    {
      pregunta: "Has the VAT rate changed with the new tax law?",
      respuesta: "No. The Nigeria Tax Act, 2025 keeps VAT at {{ng.vat}} on the value of all taxable supplies.",
    },
    {
      pregunta: "Are some goods and services exempt?",
      respuesta: "Yes. The Act lists exempt supplies, so check whether yours is on the list before charging VAT.",
    },
    {
      pregunta: "Do small businesses charge VAT?",
      respuesta: "It depends on the registration rules for your business. Ask the Nigeria Revenue Service if you are not sure.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value Added Tax, charged on taxable goods and services." },
    { termino: "Taxable supply", definicion: "A sale of goods or services that VAT applies to." },
  ],
});
