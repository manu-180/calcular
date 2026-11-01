import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bt.gst-calculator",
  h1: "GST calculator Bhutan {{anio}}",
  title: "GST calculator Bhutan {{anio}}: add or remove {{bt.gst-rate}}",
  description: "Add or remove Bhutan's Goods and Services Tax on any price at the single rate of {{bt.gst-rate}}. Enter an amount.",
  intro: [
    "Bhutan's Goods and Services Tax has one standard rate, {{bt.gst-rate}}, on taxable goods, services and imports. It came into force on {{bt.gst-rate#desde}}. Enter a price to add the tax, or take it out of a price that already includes it.",
    "Only businesses registered with the Department of Revenue and Customs charge it. Required registration starts at {{bt.gst-threshold}} of turnover a year.",
  ],
  comoSeCalcula: [
    "To add GST: multiply the price by {{bt.gst-rate}} and add the result.",
    "To remove it: divide the price with GST by 1.05. The difference is the tax.",
    "Do not take {{bt.gst-rate}} off a price with GST. That gives too low a price before tax.",
  ],
  ejemplo: ["A price of Nu. 1,000 before tax carries Nu. 50 of GST, so the total is Nu. 1,050. Going the other way, a bill of Nu. 2,500 with GST has a price of Nu. 2,380.95 and Nu. 119.05 of tax."],
  faq: [
    {
      pregunta: "What is the GST rate in Bhutan?",
      respuesta: "{{bt.gst-rate}} on taxable supplies and imports, other than zero rated ones (Schedule I of the Goods and Services Tax Act of Bhutan 2020, as amended by section 67 of the GST (Amendment) Act of Bhutan 2025).",
    },
    {
      pregunta: "When did GST start?",
      respuesta: "On 1 January 2026, as section 2 of the Act now says after the 2025 amendment.",
    },
    {
      pregunta: "Is everything taxed?",
      respuesta: "No. Schedule IV lists exempt supplies and Schedule V zero rated ones, so a shop may have sales at {{bt.gst-rate}} and others with no GST. Check the Act for the item you sell.",
    },
    {
      pregunta: "Who must register?",
      respuesta: "A business with annual turnover of {{bt.gst-threshold}} or more. See the GST registration calculator.",
    },
  ],
  glosario: [
    { termino: "GST", definicion: "Goods and Services Tax, a tax on what is consumed in Bhutan, collected by registered businesses." },
    { termino: "Zero rated", definicion: "Taxable at 0 %, so no GST is added to the price." },
    { termino: "DRC", definicion: "The Department of Revenue and Customs, which runs GST." },
  ],
});
