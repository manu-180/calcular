import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.gst-calculator",
  h1: "GST calculator Liberia",
  title: "Liberia GST calculator: add or remove the {{lr.gst-rate}} GST",
  description: "Add GST to a price or take it out in Liberia with the {{lr.gst-rate}} rate on goods and services set by the Tax Amendment Act of December 2025.",
  intro: [
    "Enter a price to add Liberia's goods and services tax (GST) or to find how much GST a price already includes.",
    "The standard rate is {{lr.gst-rate}} on goods and on services. Exports of goods are zero-rated.",
  ],
  comoSeCalcula: [
    "Adding GST: price × {{lr.gst-rate}}.",
    "Removing GST: price ÷ (1 + {{lr.gst-rate}}), and the difference is the GST.",
    "Exports of goods: 0%.",
  ],
  ejemplo: ["A service billed at L$10,000 carries L$1,300 of GST, so the customer pays L$11,300."],
  faq: [
    {
      pregunta: "When did GST go up to {{lr.gst-rate}}?",
      respuesta: "The Liberia Tax Amendment Act of December 2025 was approved on 24 March 2026 and published on 1 April 2026. The LRA started applying the new rate on 1 May 2026.",
    },
    {
      pregunta: "Are telecommunications services taxed at the same rate?",
      respuesta: "No. The Act adds a surtax on telecommunications services, and the LRA notice of 7 April 2026 puts their rate at 15 percent. This calculator uses the standard rate only.",
    },
    {
      pregunta: "Is GST being replaced by VAT?",
      respuesta: "Yes. The LRA says VAT will replace GST with a full implementation date of 1 January 2027. Until then GST applies.",
    },
  ],
  glosario: [
    { termino: "GST", definicion: "Goods and services tax, charged on taxable supplies of goods and services by registered businesses." },
    { termino: "Zero-rated", definicion: "Taxed at 0 percent, as exports of goods are." },
  ],
});
