import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "bz.gst-calculator",
  "h1": "Belize GST calculator {{anio}}",
  "title": "Belize GST calculator {{anio}}: add or remove GST",
  "description": "Add General Sales Tax to a price or take it out of a total. The standard rate is {{bz.gst-rate}}. Enter the amount and read the tax at once.",
  "intro": [
    "General Sales Tax (GST) in Belize is charged at a standard rate of {{bz.gst-rate}}. The Belize Tax Service states this rate in its current documents for businesses that issue tax invoices.",
    "Use the calculator in two ways. Enter a price before tax to see the GST and the total, or enter a shelf price that already includes GST to see how much of it is tax."
  ],
  "comoSeCalcula": [
    "To add GST, multiply the price before tax by {{bz.gst-rate}} and add the result to the price.",
    "To take GST out of a price that includes it, divide the total by 100 plus the rate and multiply by the rate. At {{bz.gst-rate}} that is the total times 12.5 divided by 112.5.",
    "The Belize Tax Service works its own invoice examples the same way, with the tax applied to the value of the sale after any excise duty and environmental tax have been added.",
    "Zero-rated and exempt supplies do not carry GST at the standard rate. Check the GST schedules, or ask the Belize Tax Service, before you apply the rate to a particular good or service."
  ],
  "ejemplo": [
    "A supplier sells diesel and the value of the sale before GST is BZ$26,964.30. GST at 12.5% is BZ$3,370.54, so the customer pays BZ$30,334.84. This is the example used in the Belize Tax Service manual for electronic tax documents.",
    "For a shelf price that includes GST, take BZ$225.00. The tax inside it is BZ$25.00 and the price before tax is BZ$200.00."
  ],
  "faq": [
    {
      "pregunta": "What is the GST rate in Belize?",
      "respuesta": "The standard rate is {{bz.gst-rate}}, as stated in the Belize Tax Service orientation manual for issuers of electronic tax documents (version 1.3, May 2026)."
    },
    {
      "pregunta": "Does every sale carry GST?",
      "respuesta": "No. Standard-rated supplies carry the {{bz.gst-rate}} rate. Zero-rated supplies are taxed at 0% and exempt supplies are outside GST. The schedules to the General Sales Tax Act list which is which."
    },
    {
      "pregunta": "How do I find the GST inside a price that includes it?",
      "respuesta": "Divide the total by 100 plus the rate, then multiply by the rate. The calculator does this when you choose the option for a price with GST included."
    },
    {
      "pregunta": "Who has to register for GST?",
      "respuesta": "The Belize Tax Service registers businesses under the General Sales Tax Act. Ask the Belize Tax Service for the current registration threshold, because this calculator does not check it."
    }
  ],
  "glosario": [
    {
      "termino": "GST",
      "definicion": "General Sales Tax, the consumption tax that Belize charges on most goods and services."
    },
    {
      "termino": "Standard-rated",
      "definicion": "A supply that carries the full GST rate."
    },
    {
      "termino": "Zero-rated",
      "definicion": "A supply taxed at 0%, where the seller can still claim tax paid on its costs."
    }
  ]
});
