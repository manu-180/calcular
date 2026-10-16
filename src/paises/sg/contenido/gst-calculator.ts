import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.gst-calculator",
  h1: "GST calculator for Singapore",
  title: "GST calculator Singapore: add or remove {{sg.gst}} GST",
  description: "Add {{sg.gst}} GST to a price or find the GST already included in it, using the rate published by IRAS.",
  intro: [
    "Goods and Services Tax (GST) is charged on most goods and services sold in Singapore. The rate is {{sg.gst}}.",
    "Enter a price and say whether it already includes GST. You get the price before GST, the GST and the full price.",
  ],
  comoSeCalcula: [
    "To add GST, multiply the price before GST by 1.09.",
    "To take GST out of a price that already includes it, divide the price by 1.09. What is left is the GST.",
    "Each amount is rounded to the cent.",
  ],
  ejemplo: ["A $109 bill that includes GST has $9 of GST, so the price before GST is $100."],
  faq: [
    {
      pregunta: "What is the GST rate in Singapore?",
      respuesta: "The GST rate is {{sg.gst}}. It went from 7% to 8% on 1 January 2023 and to 9% on 1 January 2024.",
    },
    {
      pregunta: "Does every business charge GST?",
      respuesta: "Only GST-registered businesses charge GST. They charge it on their sales in Singapore unless the sale can be zero-rated or is exempt under the GST law.",
    },
    {
      pregunta: "How do I find the GST in a price that includes it?",
      respuesta: "Divide the price by 109 and multiply by 9. For a $54.50 bill, the GST is $4.50.",
    },
  ],
  glosario: [
    { termino: "GST", definicion: "Goods and Services Tax, the consumption tax on goods and services in Singapore." },
    { termino: "Zero-rated supply", definicion: "A sale on which GST is charged at 0%, such as most exports." },
  ],
});
