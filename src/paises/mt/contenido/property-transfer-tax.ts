import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.property-transfer-tax",
  h1: "Property transfer tax calculator Malta",
  title: "Property sale tax Malta: {{mt.property-transfer-tax[standard]}} final tax calculator",
  description:
    "Work out the final tax when you sell property in Malta: {{mt.property-transfer-tax[standard]}} normally, {{mt.property-transfer-tax[within-5-years]}} within five years, {{mt.property-transfer-tax[before-2004]}} if bought before 2004, or exempt for your home.",
  intro: [
    "When you sell immovable property in Malta, you pay a final tax on the transfer value instead of tax on the gain.",
    "Enter the price and say how you got the property. You get the tax and what you keep.",
  ],
  comoSeCalcula: [
    "The usual rate is {{mt.property-transfer-tax[standard]}} of the transfer value, which is the price or the market value, whichever is higher.",
    "Property sold within five years of buying it pays {{mt.property-transfer-tax[within-5-years]}}, and property bought before 1 January 2004 pays {{mt.property-transfer-tax[before-2004]}}.",
    "Property inherited after 24 November 1992 pays {{mt.property-transfer-tax[inherited-gain]}} on the gain over the value declared on inheritance. Property inherited before 25 November 1992 pays {{mt.property-transfer-tax[inherited-before-1992]}} of the price.",
    "Your own home is exempt if you lived in it for at least three years in a row before the sale and sell within twelve months of moving out.",
  ],
  ejemplo: ["Selling a flat bought in 2015 for €350,000 means a final tax of {{mt.property-transfer-tax[standard]}}, which is €28,000."],
  faq: [
    {
      pregunta: "Is the tax final?",
      respuesta: "Yes. It is separate from your other income tax, it cannot be used as a credit and it is never refunded.",
    },
    {
      pregunta: "Who pays it?",
      respuesta: "The seller. Buyers pay a different tax, the duty on documents and transfers.",
    },
    {
      pregunta: "Can I choose the normal rate for inherited property?",
      respuesta: "Yes. For property inherited after 24 November 1992 you can declare to the notary that you want the normal rate on the price instead of the rate on the gain.",
    },
  ],
  glosario: [
    { termino: "Transfer value", definicion: "The higher of the price and the market value of the property." },
    { termino: "Final tax", definicion: "A tax that settles what is due on that income in full, with nothing to add in your tax return." },
  ],
});
