import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.stamp-duty-calculator",
  h1: "Stamp duty calculator Kenya",
  title: "Stamp duty calculator Kenya: 4% or 2% on land transfers",
  description: "Work out stamp duty on buying land or a house in Kenya: {{ke.stamp-duty-per-1000[municipality]}} per KSh 1,000 in a municipality and {{ke.stamp-duty-per-1000[other]}} outside.",
  intro: [
    "When you buy land or a house, the buyer pays stamp duty on the transfer. Enter the value and where the property is.",
    "The rate is higher inside a municipality than outside.",
  ],
  comoSeCalcula: [
    "Inside a municipality the duty is {{ke.stamp-duty-first-2000[municipality]}} on the first KSh 2,000 and {{ke.stamp-duty-per-1000[municipality]}} for each further KSh 1,000 or part of it. That works out at 4%.",
    "Outside a municipality it is {{ke.stamp-duty-first-2000[other]}} on the first KSh 2,000 and {{ke.stamp-duty-per-1000[other]}} for each further KSh 1,000 or part. That works out at 2%.",
    "The duty is charged on the price or the value of the property.",
  ],
  ejemplo: ["A house worth KSh 8 million in a municipality pays KSh 320,000 of stamp duty."],
  faq: [
    {
      pregunta: "Who pays stamp duty?",
      respuesta: "The schedule of the Stamp Duty Act names the purchaser or transferee as the person liable for a transfer on sale.",
    },
    {
      pregunta: "Why does part of KSh 1,000 count as a full 1,000?",
      respuesta: "The schedule charges the duty for every KSh 1,000 and also for any fractional part of KSh 1,000.",
    },
    {
      pregunta: "Are some transfers exempt?",
      respuesta: "Some transfers are exempt under the Act. Check the exemption with KRA before you rely on it.",
    },
  ],
  glosario: [{ termino: "Transferee", definicion: "The person who receives the property in a transfer." }],
});
