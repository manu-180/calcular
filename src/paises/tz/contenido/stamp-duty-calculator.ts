import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.stamp-duty-calculator",
  "h1": "Stamp duty calculator Tanzania",
  "title": "Stamp duty calculator Tanzania: leases, shares, agreements",
  "description": "Work out stamp duty in Tanzania Mainland: {{tz.stamp-lease-rate}} of the annual rent on a lease, {{tz.stamp-share-transfer-rate}} on share transfers, fixed fees on agreements.",
  "intro": [
    "Some legal documents must be stamped within 30 days of being signed. Choose the document to see the duty.",
    "For a lease, enter the annual rent. For a share transfer, the value of the shares."
  ],
  "comoSeCalcula": [
    "Lease, of any length: {{tz.stamp-lease-rate}} of the annual rent.",
    "Transfer of shares: {{tz.stamp-share-transfer-rate}} of the value approved by the Board.",
    "Agreement, affidavit or power of attorney: {{tz.stamp-agreement}}. Memorandum of association: {{tz.stamp-memorandum}}."
  ],
  "ejemplo": [
    "A shop lease with TSh 12 million of rent a year pays TSh 120,000 of stamp duty."
  ],
  "faq": [
    {
      "pregunta": "When must a document be stamped?",
      "respuesta": "Within 30 days of signing in Mainland Tanzania, or within 30 days of arriving if signed abroad."
    },
    {
      "pregunta": "Who pays?",
      "respuesta": "Usually the person who draws, makes or signs the document."
    },
    {
      "pregunta": "What if I am not sure the duty applies?",
      "respuesta": "You can ask the Stamp Duty Officer for a formal decision."
    }
  ],
  "glosario": [
    {
      "termino": "Instrument",
      "definicion": "A legal document such as a lease, a transfer or an agreement."
    }
  ]
});
