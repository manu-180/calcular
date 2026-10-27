import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "et.vat-calculator",
  h1: "VAT calculator Ethiopia",
  title: "VAT calculator Ethiopia: add or remove VAT",
  description:
    "Add VAT to a price or take it out at the {{et.vat}} standard rate of the Value Added Tax Proclamation No. 1341/2024.",
  intro: [
    "Value added tax in Ethiopia is charged at {{et.vat}} on most goods and services. Enter an amount and choose whether to add VAT or take it out of a price that already includes it.",
  ],
  comoSeCalcula: [
    "Adding VAT: the price without VAT times {{et.vat}}.",
    "Taking VAT out: the price with VAT divided by 1 plus the rate. The difference is the VAT.",
    "Zero-rated supplies pay 0% and exempt supplies pay no VAT. This calculator uses the standard rate.",
  ],
  ejemplo: [
    "ETB 10,000 plus VAT is ETB 11,500. A price of ETB 11,500 with VAT holds ETB 1,500 of VAT.",
  ],
  faq: [
    {
      pregunta: "Who has to register for VAT?",
      respuesta: "A person whose taxable supplies in a 12-month period are expected to exceed, or do exceed, {{et.vat-threshold}}.",
    },
    {
      pregunta: "Can I register below the threshold?",
      respuesta: "Yes, a business can apply for voluntary registration, but only if its yearly taxable supplies exceed ETB 1,000,000 or the amount set by a directive of the Minister.",
    },
    {
      pregunta: "Since when does this proclamation apply?",
      respuesta: "Proclamation No. 1341/2024 was published in the Federal Negarit Gazette on 21 August 2024 and replaced the earlier VAT law.",
    },
  ],
  glosario: [
    { termino: "VAT", definicion: "Value added tax, a tax on the consumption of goods and services." },
    { termino: "Zero-rated supply", definicion: "A taxable supply charged at 0%." },
    { termino: "Registration threshold", definicion: "The level of yearly taxable supplies above which VAT registration is compulsory." },
  ],
});
