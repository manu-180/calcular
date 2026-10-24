import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.dubai-transfer-fee",
  h1: "Dubai Land Department fee calculator",
  title: "DLD transfer fee calculator: Dubai property costs",
  description:
    "Work out the Dubai Land Department costs of buying property: the {{ae.dld-transfer-fee}} transfer fee, registration trustee fee, mortgage registration and title deed.",
  intro: [
    "When a property in Dubai is sold, the Dubai Land Department charges a fee on the sale value plus registration costs.",
    "Enter the price and the mortgage, if any, to see the main fees.",
  ],
  comoSeCalcula: [
    "The transfer fee is {{ae.dld-transfer-fee}} of the sale value.",
    "The registration trustee fee is {{ae.dld-registrar-fee[below-500k]}} if the price is below AED 500,000 and {{ae.dld-registrar-fee[from-500k]}} from AED 500,000.",
    "A mortgage adds {{ae.dld-mortgage-fee}} of the loan, and the title deed costs {{ae.dld-title-deed}}.",
  ],
  ejemplo: ["On a AED 2 million home with a AED 1.5 million mortgage, the fees add up to AED 88,200."],
  faq: [
    {
      pregunta: "How much is the DLD transfer fee?",
      respuesta: "{{ae.dld-transfer-fee}} of the sale value.",
    },
    {
      pregunta: "Is there a fee for registering a mortgage?",
      respuesta: "Yes, {{ae.dld-mortgage-fee}} of the mortgage value.",
    },
    {
      pregunta: "Are there other fees?",
      respuesta: "Yes, smaller ones: AED 10 knowledge and AED 10 innovation fees, map fees and, when selling a mortgaged property, fees for releasing the mortgage.",
    },
  ],
  glosario: [
    { termino: "DLD", definicion: "Dubai Land Department, which registers property in Dubai." },
    { termino: "Title deed", definicion: "The document that records who owns the property." },
  ],
});
