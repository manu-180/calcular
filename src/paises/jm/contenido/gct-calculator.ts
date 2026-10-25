import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.gct-calculator",
  h1: "GCT calculator Jamaica",
  title: "GCT calculator Jamaica: add or remove {{jm.gct-standard}} GCT",
  description:
    "Add General Consumption Tax to a price or take it out, at the standard rate of {{jm.gct-standard}}. Works for invoices, quotes and receipts.",
  intro: [
    "General Consumption Tax (GCT) is Jamaica's tax on goods and services. Most items carry the standard rate of {{jm.gct-standard}}.",
    "Enter a price to add GCT to it, or a price that already includes GCT to see how much of it is tax.",
  ],
  comoSeCalcula: [
    "Adding GCT: price × {{jm.gct-standard}} = GCT. Price plus GCT = total.",
    "Taking GCT out: total ÷ (1 + {{jm.gct-standard}}) = price before GCT. The difference is the GCT.",
  ],
  ejemplo: ["J$10,000 plus GCT at 15% is J$11,500. A receipt for J$11,500 includes J$1,500 of GCT."],
  faq: [
    {
      pregunta: "What is the GCT rate in Jamaica?",
      respuesta: "The standard rate is {{jm.gct-standard}}, in force since {{jm.gct-standard#desde}}. Some supplies have other rates, and some are zero-rated or exempt.",
    },
    {
      pregunta: "What is the difference between zero-rated and exempt?",
      respuesta: "Neither carries GCT on the sale. A business selling zero-rated goods can still claim back the GCT it paid on its purchases. A business selling exempt goods cannot.",
    },
    {
      pregunta: "What was the GCT rate before?",
      respuesta: "16.5%, from June 2012 until the cut to {{jm.gct-standard}} in April 2020.",
    },
  ],
  glosario: [
    { termino: "GCT", definicion: "General Consumption Tax, charged by registered taxpayers on the goods and services they supply." },
    { termino: "Input tax credit", definicion: "The GCT a registered business paid on its purchases, which it can set against the GCT it charges." },
  ],
});
