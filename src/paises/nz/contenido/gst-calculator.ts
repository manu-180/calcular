import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.gst-calculator",
  h1: "GST calculator NZ",
  title: "GST calculator NZ: add or remove 15% GST",
  description: "Add GST to a price or take it out of a GST-inclusive amount at the New Zealand rate of {{nz.gst-rate}}. Quick figures for invoices, quotes and returns.",
  intro: [
    "Add GST to a price, or work out how much GST is inside a price that already includes it.",
    "It uses the New Zealand GST rate of {{nz.gst-rate}}, the rate registered businesses charge on most goods and services.",
  ],
  comoSeCalcula: [
    "To add GST, multiply the price by {{nz.gst-rate}} and add the result to the price.",
    "To take GST out of an inclusive price, multiply it by 3 and divide by 23. That's the same as 15 divided by 115.",
  ],
  ejemplo: ["A quote of $1,000 including GST has $130.43 of GST in it. The price before GST is $869.57."],
  faq: [
    {
      pregunta: "Why is the GST fraction 3/23?",
      respuesta: "An inclusive price is 115% of the price before GST. The GST part is 15/115 of it, which simplifies to 3/23.",
    },
    {
      pregunta: "Who has to charge GST?",
      respuesta: "Businesses registered for GST charge it on most taxable supplies they make. Inland Revenue explains when you need to register.",
    },
    {
      pregunta: "Is GST charged on everything?",
      respuesta: "No. Some supplies are exempt or zero-rated. Check Inland Revenue's GST pages for what applies to your goods or services.",
    },
  ],
  glosario: [
    { termino: "GST", definicion: "Goods and services tax, a tax on most goods and services sold in New Zealand." },
    { termino: "GST-inclusive", definicion: "A price that already has GST added." },
  ],
});
