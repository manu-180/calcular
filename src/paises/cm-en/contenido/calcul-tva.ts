import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.calcul-tva",
  h1: "VAT calculator for Cameroon",
  title: "VAT calculator Cameroon: add or remove VAT",
  description:
    "Add or remove VAT: standard rate of {{cm.tva[general]}} plus {{cm.cac}} council additional tax. Go from a price before tax to the full price in one step.",
  intro: [
    "In Cameroon, the VAT on an invoice includes the principal and the council additional tax (CAC). That is why people talk about an overall rate.",
    "Choose the direction and the rate. You get the price before tax, the VAT, the CAC and the full price.",
  ],
  comoSeCalcula: [
    "VAT principal is {{cm.tva[general]}} at the standard rate and {{cm.tva[reduit]}} at the reduced rate.",
    "The council additional tax adds {{cm.cac}} of the principal, so the overall rate is a little higher than the principal.",
    "To remove VAT from a full price, divide it by one plus the overall rate.",
  ],
  ejemplo: ["On 100,000 F before tax at the standard rate: 17,500 F VAT and 1,750 F CAC. The full price is 119,250 F."],
  faq: [
    {
      pregunta: "Why is the overall rate higher than the VAT rate?",
      respuesta: "It is the standard rate of {{cm.tva[general]}} plus a {{cm.cac}} council additional tax. Both appear on the invoice.",
    },
    {
      pregunta: "What does the reduced rate cover?",
      respuesta: "The General Tax Code keeps it for social housing: a sale to a first-time home buyer, rent from a public developer and the loan interest, with a tax clearance.",
    },
    {
      pregunta: "Do small businesses charge VAT?",
      respuesta: "No. The global synthetic tax replaces VAT for businesses under that regime. Only businesses under the actual earnings regime charge it.",
    },
  ],
  glosario: [{ termino: "CAC", definicion: "Council additional tax, added to VAT and paid to local councils." }],
});
