import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.vat-calculator",
  "h1": "VAT calculator Tanzania",
  "title": "VAT calculator Tanzania: add or remove {{tz.vat}} VAT",
  "description": "Add or remove VAT at the standard rate of {{tz.vat}} in Tanzania Mainland, or at {{tz.vat-electronic}} for qualifying electronic payments.",
  "intro": [
    "Enter an amount and choose whether to add VAT or take it out of a price that already includes it.",
    "Businesses register for VAT when taxable turnover reaches {{tz.vat-threshold}} in 12 months."
  ],
  "comoSeCalcula": [
    "The standard rate on goods, services and imports in Mainland Tanzania is {{tz.vat}}.",
    "A supply paid by an individual not registered for VAT through a bank or an approved electronic payment system is charged at {{tz.vat-electronic}}.",
    "To take VAT out of a price, divide by 1 plus the rate."
  ],
  "ejemplo": [
    "TSh 100,000 plus VAT is TSh 118,000."
  ],
  "faq": [
    {
      "pregunta": "When do I have to register for VAT?",
      "respuesta": "When taxable turnover reaches {{tz.vat-threshold}} in 12 months, or half of that in six months."
    },
    {
      "pregunta": "When is VAT due?",
      "respuesta": "By the 20th day of the following month, together with the return."
    },
    {
      "pregunta": "Are exports taxed?",
      "respuesta": "Exports of goods and some services are zero rated."
    }
  ],
  "glosario": [
    {
      "termino": "Zero rated",
      "definicion": "Taxable at 0%, so the business can still claim input VAT."
    }
  ]
});
