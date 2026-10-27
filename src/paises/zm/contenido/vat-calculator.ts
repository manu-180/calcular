import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zm.vat-calculator",
  h1: "VAT calculator Zambia",
  title: "VAT calculator Zambia: add or remove VAT",
  description: "Add VAT to a price or take it out at the standard rate of {{zm.vat}} that ZRA charges on taxable supplies of goods and services.",
  intro: [
    "Enter a price and choose whether to add VAT or work out the VAT already inside it.",
    "The calculator uses the standard rate. Zero-rated and exempt supplies carry no VAT.",
  ],
  comoSeCalcula: [
    "To add VAT, multiply the price by {{zm.vat}}.",
    "To take it out, divide the price by 1 plus the rate, and the difference is the VAT.",
  ],
  ejemplo: ["A price of K1,000 before VAT becomes K1,160. A price of K580 with VAT holds K80 of VAT."],
  faq: [
    {
      pregunta: "When does a business have to register for VAT?",
      respuesta: "Registration is mandatory once annual taxable supplies are above {{zm.vat-threshold}}. Businesses with turnover above K400,000 can register voluntarily.",
    },
    {
      pregunta: "What is zero-rated?",
      respuesta: "Exports with proof of export, goods imported by diplomats with reciprocal privileges, supplies to donors for official purposes and some building materials for approved public benefit organisations.",
    },
    {
      pregunta: "Is rent subject to VAT?",
      respuesta: "Rent on commercial property is. Rent on property let for domestic purposes is not.",
    },
  ],
  glosario: [
    { termino: "Standard rated", definicion: "Goods and services that carry VAT at the standard rate." },
    { termino: "Zero rated", definicion: "Taxable supplies charged at 0%, so the seller can still claim input tax." },
  ],
});
