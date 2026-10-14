import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.gst-calculator",
  h1: "GST calculator",
  title: "GST calculator: add or remove {{au.gst}} GST",
  description: "Add {{au.gst}} GST to a price or work out the GST included in it. Uses the GST rate published by the ATO.",
  intro: [
    "Goods and services tax (GST) is a {{au.gst}} tax on most goods and services sold in Australia.",
    "Enter a price and choose whether it already includes GST. You get the price without GST, the GST and the full price.",
  ],
  comoSeCalcula: [
    "To add GST, multiply the price before GST by 1.1.",
    "To find the GST in a price that already includes it, divide the price by 11. That is the GST, and the rest is the price without GST.",
    "Each result is rounded to the cent.",
  ],
  ejemplo: ["A $110 invoice that includes GST has $10 of GST. The price before GST is $100."],
  faq: [
    {
      pregunta: "What is the GST rate in Australia?",
      respuesta: "GST is {{au.gst}} on most goods, services and other items sold or consumed in Australia.",
    },
    {
      pregunta: "Why divide by 11 to remove GST?",
      respuesta: "A GST-inclusive price is 110% of the price before GST. The GST is 10 of those 110 parts, which is one eleventh of the total.",
    },
    {
      pregunta: "Does every sale include GST?",
      respuesta: "No. Some sales are GST-free and others are input taxed, so no GST is charged on them. Check the ATO rules for your type of sale.",
    },
  ],
  glosario: [
    { termino: "GST", definicion: "Goods and services tax, a broad tax on most goods and services sold in Australia." },
    { termino: "GST-free sale", definicion: "A sale that does not include GST, even when the seller is registered for GST." },
  ],
});
