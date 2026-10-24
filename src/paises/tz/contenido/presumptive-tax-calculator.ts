import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.presumptive-tax-calculator",
  "h1": "Presumptive tax calculator Tanzania",
  "title": "Presumptive tax calculator Tanzania: small business tax",
  "description": "Work out presumptive income tax for small businesses with turnover up to {{tz.presumptive-ceiling}}. Turnover up to {{tz.presumptive-threshold}} pays no tax.",
  "intro": [
    "Resident individuals whose only income is a small business can pay a fixed or simple income tax based on turnover. Enter your annual turnover.",
    "The tax depends on whether you keep complete records."
  ],
  "comoSeCalcula": [
    "Turnover up to {{tz.presumptive-threshold}}: no tax.",
    "Up to {{tz.presumptive-band-1-limit}}: {{tz.presumptive-band-1-incomplete}} with incomplete records, or {{tz.presumptive-complete-rate}} of the turnover above {{tz.presumptive-threshold}} with complete records.",
    "Up to {{tz.presumptive-band-2-limit}}: {{tz.presumptive-band-2-incomplete}} with incomplete records, or {{tz.presumptive-band-2-base}} plus {{tz.presumptive-complete-rate}} of the turnover above {{tz.presumptive-band-1-limit}} with complete records.",
    "Up to {{tz.presumptive-ceiling}}: {{tz.presumptive-top-rate}} of turnover."
  ],
  "ejemplo": [
    "A shop with TSh 9 million of turnover and complete records pays TSh 150,000 a year."
  ],
  "faq": [
    {
      "pregunta": "Who can use the presumptive regime?",
      "respuesta": "A resident individual whose income comes only from a business in Tanzania, with turnover up to {{tz.presumptive-ceiling}}."
    },
    {
      "pregunta": "Do I need to file a return?",
      "respuesta": "No final return is needed under the presumptive system, unless you choose to file one."
    },
    {
      "pregunta": "Is there relief for new businesses?",
      "respuesta": "Yes. A new business can get no tax for its first 12 months if the Commissioner approves the relief."
    }
  ],
  "glosario": [
    {
      "termino": "Turnover",
      "definicion": "Total sales of the business in the year, before costs."
    }
  ]
});
