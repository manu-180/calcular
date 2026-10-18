import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.dollar-to-shilling",
  "h1": "Dollar to Tanzanian shilling converter",
  "title": "Dollar to Tanzanian shilling today: BoT rate {{tz.usd}}",
  "description": "Convert US dollars to Tanzanian shillings and back with the Bank of Tanzania mean rate of {{tz.usd#desde}}: {{tz.usd}} per dollar.",
  "intro": [
    "Convert any amount between US dollars and Tanzanian shillings with the rate the Bank of Tanzania publishes.",
    "The latest mean rate is {{tz.usd}} per dollar, for {{tz.usd#desde}}."
  ],
  "comoSeCalcula": [
    "Dollars to shillings: multiply by the BoT mean rate.",
    "Shillings to dollars: divide by the same rate."
  ],
  "ejemplo": [
    "At TSh 2,633.12 per dollar, US$100 is TSh 263,311.99."
  ],
  "faq": [
    {
      "pregunta": "What is the BoT mean rate?",
      "respuesta": "The average of the buying and selling rates the Bank of Tanzania publishes for each currency."
    },
    {
      "pregunta": "Will I get this rate at a bank?",
      "respuesta": "Not exactly. Banks and bureaux de change add their own margin."
    },
    {
      "pregunta": "How often does it change?",
      "respuesta": "The Bank of Tanzania publishes a rate for each trading day."
    }
  ],
  "glosario": [
    {
      "termino": "Mean rate",
      "definicion": "The midpoint between the buying and selling rate."
    }
  ]
});
