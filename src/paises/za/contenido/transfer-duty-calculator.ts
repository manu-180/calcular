import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.transfer-duty-calculator",
  h1: "Transfer duty calculator",
  title: "Transfer duty calculator 2026: SARS rates",
  description: "Work out the transfer duty on a property purchase with the current SARS rates. No duty on properties up to R1 210 000.",
  intro: [
    "Enter the price of the property you are buying. You get the transfer duty and the total with the price.",
    "Transfer duty is a tax on property sales that are not subject to VAT.",
  ],
  comoSeCalcula: [
    "Up to R1 210 000 there is no transfer duty.",
    "Above that the rate climbs in steps: 3%, 6%, 8%, 11% and 13% on the part of the price in each band, plus a fixed amount for the bands below.",
    "These rates apply from 1 April 2025 and did not change on 1 April 2026.",
  ],
  ejemplo: ["On a R2 000 000 home the transfer duty is R33 786, or about 1.7% of the price."],
  faq: [
    {
      pregunta: "Do I pay transfer duty if the seller charges VAT?",
      respuesta: "No. Transfer duty only applies to property sales that are not subject to VAT.",
    },
    {
      pregunta: "Did the transfer duty rates change in 2026?",
      respuesta: "No. SARS kept the table that has applied since 1 April 2025.",
    },
    {
      pregunta: "Is transfer duty the only cost of buying a property?",
      respuesta: "No. Legal fees for the transfer and for any bond are separate. This calculator covers only the transfer duty.",
    },
  ],
  glosario: [{ termino: "Transfer duty", definicion: "A tax SARS charges when property changes hands, worked out on the price." }],
});
