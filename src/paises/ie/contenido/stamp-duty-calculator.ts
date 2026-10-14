import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.stamp-duty-calculator",
  h1: "Stamp Duty calculator Ireland",
  title: "Stamp Duty calculator Ireland: residential rates",
  description: "Work out Stamp Duty on a home in Ireland: 1% up to €1 million, 2% up to €1.5 million and 6% above. Also covers non-residential property at {{ie.stamp-duty-non-residential}}.",
  intro: [
    "When you buy a property in Ireland you pay Stamp Duty to Revenue. Enter the price to see how much it comes to.",
    "Homes pay a lower rate on the first €1 million and higher rates above that. Commercial property and land pay a single rate of {{ie.stamp-duty-non-residential}}.",
  ],
  comoSeCalcula: [
    "For a home, each part of the price pays its own rate: 1% on the first €1 million, 2% on the part between €1 million and €1.5 million, and 6% on anything above €1.5 million.",
    "For non-residential property, the whole price pays {{ie.stamp-duty-non-residential}}.",
    "These rates apply to deeds signed on or after 2 October 2024.",
  ],
  ejemplo: ["A home bought for €1,200,000 pays 1% on €1 million (€10,000) and 2% on €200,000 (€4,000), so €14,000 in Stamp Duty."],
  faq: [
    {
      pregunta: "Do first-time buyers pay Stamp Duty?",
      respuesta: "Yes, the same residential rates apply. First-time buyers of a new home may be able to claim Help to Buy, which is a separate scheme.",
    },
    {
      pregunta: "What if I buy several apartments?",
      respuesta: "If the purchase covers three or more apartments in the same block, the rates are 1% up to €1 million and 2% above that.",
    },
    {
      pregunta: "Is there a higher rate for bulk buyers?",
      respuesta: "Yes. A 15% rate applies when a person buys ten or more houses (not apartments) within 12 months.",
    },
  ],
  glosario: [
    { termino: "Stamp Duty", definicion: "A tax charged on documents that transfer property, such as a deed of sale." },
    { termino: "Consideration", definicion: "The price paid for the property, on which Stamp Duty is charged." },
  ],
});
