import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "tz.vehicle-registration-calculator",
  "h1": "Vehicle registration cost Tanzania",
  "title": "Car registration cost Tanzania: licence fee, tax and levy",
  "description": "See the cost of first registration of a car in Tanzania: licence fee by engine size, registration tax of {{tz.vehicle-registration-tax}} and the HIV Response Levy.",
  "intro": [
    "When a vehicle is registered for the first time, TRA charges a licence fee, a registration tax and the HIV Response Levy. Choose the engine size.",
    "Import duties and VAT on an imported car are separate."
  ],
  "comoSeCalcula": [
    "The licence fee depends on engine capacity.",
    "Registration tax is {{tz.vehicle-registration-tax}} for a motor vehicle of any cylinder capacity.",
    "The HIV Response Levy also depends on engine capacity."
  ],
  "ejemplo": [
    "A 1,500 cc car pays TSh 200,000 of licence fee, TSh 250,000 of registration tax and TSh 100,000 of HIV Response Levy: TSh 550,000."
  ],
  "faq": [
    {
      "pregunta": "What does a transfer of ownership cost?",
      "respuesta": "TRA charges a transfer fee of {{tz.vehicle-transfer-fee}} for a motor vehicle."
    },
    {
      "pregunta": "Are electric vehicles different?",
      "respuesta": "Yes. TRA has separate registration amounts for electric and hybrid vehicles."
    },
    {
      "pregunta": "What about a personalised number plate?",
      "respuesta": "TRA charges TSh 5,000,000 for three years."
    }
  ],
  "glosario": [
    {
      "termino": "First registration",
      "definicion": "The first time a vehicle is entered in the Central Motor Vehicle Registry."
    }
  ]
});
