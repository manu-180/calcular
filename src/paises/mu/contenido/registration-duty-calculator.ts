import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.registration-duty-calculator",
  h1: "Registration duty calculator Mauritius",
  title: "Registration duty Mauritius: buying a house or land",
  description:
    "Work out the {{mu.registration-duty}} registration duty and the {{mu.land-transfer-tax}} land transfer tax on a property sale in Mauritius, with the first home reduction.",
  intro: [
    "When a property changes hands in Mauritius, the buyer pays registration duty and the seller pays land transfer tax.",
    "Enter the price to see both, and whether the first home reduction brings the duty down.",
  ],
  comoSeCalcula: [
    "Registration duty is {{mu.registration-duty}} of the value in the deed. The buyer pays it when the deed is registered.",
    "Land transfer tax is {{mu.land-transfer-tax}} of the value, without VAT, and is paid by the seller.",
    "A buyer who qualifies gets the duty cut by up to {{mu.first-home-relief-house}} on a house or apartment, or up to {{mu.first-home-relief-land}} on bare land to build a home.",
  ],
  ejemplo: ["On a house of Rs 8 million the duty is Rs 400,000. With the first home reduction the buyer pays Rs 100,000, and the seller pays Rs 400,000 of land transfer tax."],
  faq: [
    {
      pregunta: "Who can get the first home reduction?",
      respuesta: "A citizen of Mauritius whose total income in the income year is no more than {{mu.first-home-income-cap}}, who has not had the reduction since 29 July 2016 and who was not the sole owner of other property, apart from agricultural land, on that date. Section 27 of the Registration Duty Act lists the other conditions.",
    },
    {
      pregunta: "How much is the reduction since the Finance Act 2026?",
      respuesta: "Up to {{mu.first-home-relief-house}} on a house or a residential lot, and up to {{mu.first-home-relief-land}} on bare land, from 13 August 2026.",
    },
    {
      pregunta: "Is there a condition on building?",
      respuesta: "Yes. For bare land, you must start building your home within a year and finish within 3 years of the transfer.",
    },
  ],
  glosario: [
    { termino: "Registration duty", definicion: "The duty charged when a deed is registered with the Registrar-General." },
    { termino: "Land transfer tax", definicion: "The tax the seller pays on the value of the property transferred." },
  ],
});
