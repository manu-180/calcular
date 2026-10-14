import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.sales-tax-calculator",
  h1: "Sales tax calculator for Canada (GST, HST, PST, QST)",
  title: "Sales tax calculator Canada: GST, HST, PST and QST",
  description: "Add or remove GST, HST, PST or QST for any province or territory. HST is {{ca.gst-hst@on}} in Ontario and GST is {{ca.gst-hst@ab}} in Alberta. Official CRA rates.",
  intro: [
    "Choose your province or territory and enter a price to add sales tax, or a total to take the tax back out.",
    "Rates come from the Canada Revenue Agency table of GST/HST and PST rates by province.",
  ],
  comoSeCalcula: [
    "Every province and territory has the federal GST of {{ca.gst-hst@ab}}. Five provinces combine it with their own tax as HST: {{ca.gst-hst@on}} in Ontario, {{ca.gst-hst@ns}} in Nova Scotia and {{ca.gst-hst@nb}} in New Brunswick, Newfoundland and Labrador and Prince Edward Island.",
    "British Columbia ({{ca.pst@bc}}), Manitoba ({{ca.pst@mb}}), Saskatchewan ({{ca.pst@sk}}) and Quebec ({{ca.pst@qc}} QST) add their own sales tax on top of the GST.",
    "To take tax out of a total, the total is divided by 1 plus the combined rate.",
  ],
  ejemplo: [
    "A $100 purchase in Ontario costs $113 with HST. In Quebec it costs $114.98: $5 of GST and $9.98 of QST.",
  ],
  faq: [
    {
      pregunta: "What is the difference between GST and HST?",
      respuesta: "GST is the federal sales tax. HST is a single tax that combines the GST with the provincial part in the provinces that harmonized.",
    },
    {
      pregunta: "Which provinces have no provincial sales tax?",
      respuesta: "Alberta, the Northwest Territories, Nunavut and Yukon only charge the GST of {{ca.gst-hst@ab}}.",
    },
    {
      pregunta: "When did the HST change in Nova Scotia?",
      respuesta: "It went down to {{ca.gst-hst@ns}} on April 1, 2025.",
    },
    {
      pregunta: "Does every product pay sales tax?",
      respuesta: "No. Some goods and services are zero-rated or exempt, and rules depend on where the supply is made and who buys it. Check the CRA or your province for a specific item.",
    },
  ],
  glosario: [
    { termino: "GST", definicion: "Goods and Services Tax, the federal sales tax." },
    { termino: "HST", definicion: "Harmonized Sales Tax: GST and provincial tax charged together as one tax." },
    { termino: "PST", definicion: "Provincial Sales Tax, charged by some provinces on top of the GST. Manitoba calls it RST and Quebec QST." },
  ],
});
