import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.vat-calculator",
  h1: "VAT calculator Mauritius",
  title: "VAT calculator Mauritius: add or remove {{mu.vat}}",
  description: "Add VAT at {{mu.vat}} to a price in Mauritius or take it out of a price that includes it. Uses the standard rate of the VAT Act.",
  intro: [
    "Value Added Tax in Mauritius is charged at a standard rate of {{mu.vat}} on goods and services supplied by a VAT-registered business, and on imports.",
    "Enter a price and choose whether to add VAT or take it out.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price without VAT by {{mu.vat}}. Add the result to the price.",
    "To take VAT out, divide the price with VAT by 1 plus the rate. The difference is the VAT.",
  ],
  ejemplo: ["A price of Rs 1,000 before VAT becomes Rs 1,150. A price of Rs 2,300 with VAT includes Rs 300 of VAT."],
  faq: [
    {
      pregunta: "What is the VAT rate in Mauritius?",
      respuesta: "The standard rate is {{mu.vat}}, set in the Fourth Schedule to the VAT Act. Some supplies are zero-rated or exempt.",
    },
    {
      pregunta: "Is VAT charged on imports?",
      respuesta: "Yes. VAT is payable on goods imported into Mauritius, whether or not the importer is registered for VAT.",
    },
    {
      pregunta: "How do I take VAT out of a total?",
      respuesta: "Divide the total by 1.15. On Rs 2,300, that leaves Rs 2,000 before VAT and Rs 300 of VAT.",
    },
  ],
  glosario: [{ termino: "Zero-rated supply", definicion: "A taxable supply charged VAT at 0%." }],
});
