import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.seller-stamp-duty",
  h1: "Seller's Stamp Duty calculator",
  title: "Seller's Stamp Duty (SSD) calculator Singapore 2026",
  description: "Check if you pay Seller's Stamp Duty when selling a home in Singapore and how much: from {{sg.ssd-2025[1]}} in the first year for homes bought from 4 July 2025.",
  intro: [
    "Seller's Stamp Duty (SSD) is paid when you sell a residential property within a set period after buying it. The sooner you sell, the higher the rate.",
    "Enter the selling price and both dates to see the duty and the date after which you can sell without it.",
  ],
  comoSeCalcula: [
    "Homes bought on or after 4 July 2025 have a 4-year holding period: {{sg.ssd-2025[1]}} if sold within the first year, {{sg.ssd-2025[2]}} in the second, {{sg.ssd-2025[3]}} in the third and {{sg.ssd-2025[4]}} in the fourth.",
    "Homes bought from 11 March 2017 to 3 July 2025 have a 3-year holding period: {{sg.ssd-2017[1]}}, {{sg.ssd-2017[2]}} and {{sg.ssd-2017[3]}}.",
    "The rate applies to the selling price or the market value, whichever is higher, and the duty is rounded down to the dollar.",
  ],
  ejemplo: ["A home bought on 1 August 2025 and sold for $1.2 million in October 2026 is in its second year, so the SSD is 12%, or $144,000."],
  faq: [
    {
      pregunta: "Which date counts as the buying date?",
      respuesta: "The holding period starts from the date your Option to Purchase was accepted. If you exercised an option on or after 4 July 2025, the new 4-year schedule applies.",
    },
    {
      pregunta: "Which properties does SSD apply to?",
      respuesta: "SSD applies to residential properties and residential land acquired on or after 20 February 2010 and sold within the holding period.",
    },
    {
      pregunta: "Who pays SSD?",
      respuesta: "The seller pays it, on the higher of the selling price and the market value of the property.",
    },
  ],
  glosario: [
    { termino: "SSD", definicion: "Seller's Stamp Duty, a duty on selling a home within its holding period." },
    { termino: "Holding period", definicion: "How long you must own a home before you can sell it without paying SSD." },
  ],
});
