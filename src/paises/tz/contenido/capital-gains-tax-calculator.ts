import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.capital-gains-tax-calculator",
  "h1": "Capital gains tax calculator Tanzania",
  "title": "Capital gains tax on land and buildings in Tanzania",
  "description": "Work out the tax on selling land or a building in Tanzania: {{tz.cgt-land-resident}} of the gain for residents, {{tz.cgt-land-non-resident}} for non-residents.",
  "intro": [
    "When you sell land or a building, you pay income tax on the gain in a single instalment before the title is transferred.",
    "Enter the selling price and your costs to see the tax."
  ],
  "comoSeCalcula": [
    "Gain = selling price less purchase price, acquisition, improvement, maintenance, repair and selling costs.",
    "The tax is {{tz.cgt-land-resident}} of the gain for a resident and {{tz.cgt-land-non-resident}} for a non-resident.",
    "Without documents for the cost, the tax is {{tz.cgt-land-no-records}} of the selling price or approved value."
  ],
  "ejemplo": [
    "A resident who sells a plot for TSh 150 million with TSh 105 million of costs has a gain of TSh 45 million and pays TSh 4.5 million."
  ],
  "faq": [
    {
      "pregunta": "When is the tax paid?",
      "respuesta": "Before the transfer. The Registrar of Titles will not register it without a TRA certificate that the tax was paid or is not payable."
    },
    {
      "pregunta": "Is my home exempt?",
      "respuesta": "Yes, if you owned it and lived in it for three years or more and the gain is not more than {{tz.cgt-residence-exempt-gain}}."
    },
    {
      "pregunta": "What about farm land?",
      "respuesta": "Land worth less than TSh 10 million used for farming for at least two of the last three years is exempt."
    }
  ],
  "glosario": [
    {
      "termino": "Single instalment",
      "definicion": "The tax paid once, before the title passes to the buyer."
    }
  ]
});
