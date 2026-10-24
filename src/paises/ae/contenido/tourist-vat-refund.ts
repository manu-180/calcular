import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.tourist-vat-refund",
  h1: "UAE tourist VAT refund calculator",
  title: "VAT refund for tourists UAE: how much you get back",
  description:
    "Estimate your VAT refund as a tourist in the UAE: {{ae.tourist-refund-share}} of the {{ae.vat}} VAT you paid, less a fee for each tax-free tag.",
  intro: [
    "Tourists can get back part of the {{ae.vat}} VAT on goods bought in the UAE and taken out of the country.",
    "Enter what you paid and how many tax-free tags you have to estimate the refund.",
  ],
  comoSeCalcula: [
    "Work out the VAT inside the price: price × {{ae.vat}} ÷ (100% + {{ae.vat}}).",
    "You receive {{ae.tourist-refund-share}} of that VAT, after a fee of {{ae.tourist-refund[fee-per-tag]}} for each tax-free tag.",
    "The purchase has to be at least {{ae.tourist-refund[minimum-purchase]}} at a store registered in the scheme.",
  ],
  ejemplo: ["On AED 5,250 of shopping with two tags, the VAT is AED 250 and the refund about AED 202.90."],
  faq: [
    {
      pregunta: "Who can claim a VAT refund in the UAE?",
      respuesta: "Tourists aged 18 or over who buy from retailers in the scheme and take the goods out of the UAE.",
    },
    {
      pregunta: "How long do I have to validate my purchases?",
      respuesta: "You validate them at the point of exit within 90 days of the purchase. Refunds for validated tags can be claimed within one year.",
    },
    {
      pregunta: "What isn't refunded?",
      respuesta: "Anything used fully or partly in the UAE, and goods you don't have with you when you leave.",
    },
  ],
  glosario: [
    { termino: "Tax-free tag", definicion: "The tag the shop puts on the receipt when you shop tax-free." },
    { termino: "Planet", definicion: "The operator of the tax refund system for tourists in the UAE." },
  ],
});
