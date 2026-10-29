import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gm.vat-calculator",
  h1: "VAT calculator for The Gambia",
  title: "VAT calculator Gambia: add or remove {{gm.vat-rate}} VAT",
  description: "Add {{gm.vat-rate}} VAT to a price or take it out of a VAT-inclusive price, using the standard rate set by the Gambia Revenue Authority.",
  intro: [
    "Enter a price and choose whether it already includes VAT. You get the VAT, the price without it and the price with it.",
    "The standard VAT rate in The Gambia is {{gm.vat-rate}}. Exports are zero-rated and some supplies, such as basic foods and medical services, are exempt.",
  ],
  comoSeCalcula: [
    "Adding VAT: price × {{gm.vat-rate}}.",
    "Taking VAT out: divide the price by (100 + rate) and multiply by the rate. This is the method in the GRA VAT brochure.",
  ],
  ejemplo: ["A VAT-inclusive sale of D1,150,000 holds D150,000 of VAT and D1,000,000 of value, the example the GRA gives."],
  faq: [
    {
      pregunta: "Who must register for VAT?",
      respuesta: "Businesses with taxable supplies of {{gm.vat-registration-threshold}} or more in a tax year must register. From {{gm.vat-voluntary-threshold}} a business may register voluntarily. Below that, it cannot register or charge VAT.",
    },
    {
      pregunta: "Which goods and services are exempt?",
      respuesta: "The GRA lists basic foods such as rice, sugar, flour, cooking oil, onions and potatoes, education, prescription drugs, medical services, agricultural products and inputs, residential rent and domestic transport not linked to tourism, among others.",
    },
    {
      pregunta: "Do prices have to include VAT?",
      respuesta: "Yes. VAT-registered businesses must quote and advertise prices with VAT included and issue VAT-inclusive invoices and receipts.",
    },
    {
      pregunta: "When is VAT paid to the GRA?",
      respuesta: "Registered businesses file a VAT return and pay every month, by the 15th of the following month, even in a month without sales.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value Added Tax, a tax on the consumption of goods and services charged by registered businesses and on imports." },
    { termino: "Zero-rated", definicion: "Taxable at 0%, as exports are, so the seller can still recover the VAT paid on its costs." },
  ],
});
