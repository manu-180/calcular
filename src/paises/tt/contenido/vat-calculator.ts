import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.vat-calculator",
  h1: "VAT calculator Trinidad and Tobago",
  title: "VAT calculator Trinidad and Tobago: add or remove {{tt.vat-standard}}",
  description: "Add {{tt.vat-standard}} VAT to a price or take it out of a price that already includes it. Uses the standard rate set by the IRD.",
  intro: [
    "Value Added Tax applies to most goods and services in Trinidad and Tobago and is included in the price you pay at the till.",
    "Use this to add VAT to a quote or to find the VAT inside a receipt.",
  ],
  comoSeCalcula: [
    "To add VAT: multiply the price by {{tt.vat-standard}} and add the result.",
    "To take VAT out: divide the price by 1 plus the rate. The difference is the VAT.",
  ],
  ejemplo: ["A TT$1,000 price plus VAT comes to TT$1,125. A receipt for TT$450 includes TT$50 of VAT."],
  faq: [
    {
      pregunta: "What is the VAT rate in Trinidad and Tobago?",
      respuesta: "The standard rate is {{tt.vat-standard}}. Some basic food items are zero-rated, so no VAT is charged on them.",
    },
    {
      pregunta: "When must a business register for VAT?",
      respuesta: "When its commercial supplies are more than {{tt.vat-registration-threshold}} in a 12-month period, or are expected to be.",
    },
    {
      pregunta: "Can a business recover the VAT it pays?",
      respuesta: "Yes. A VAT-registered business deducts the VAT it paid on business purchases from the VAT it charged its customers, and pays or claims back the difference.",
    },
  ],
  glosario: [
    { termino: "Zero-rated", definicion: "Taxable at a rate of 0%, so the buyer pays no VAT on that item." },
    { termino: "Tax invoice", definicion: "The invoice a VAT-registered business must issue, showing the VAT charged." },
  ],
});
