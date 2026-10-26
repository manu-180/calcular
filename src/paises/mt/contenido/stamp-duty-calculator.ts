import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mt.stamp-duty-calculator",
  h1: "Stamp duty calculator Malta 2026",
  title: "Stamp duty Malta 2026: first-time buyers and second homes",
  description:
    "Work out the duty on buying property in Malta: {{mt.duty-rates[standard]}} normally, {{mt.duty-rates[sole-residence]}} on part of a home you live in, and none on the first part for first-time buyers.",
  intro: [
    "Buying property in Malta means paying duty on documents and transfers, usually called stamp duty, when the final deed is signed.",
    "Enter the price and say what you are buying. You get the duty and how much the relief for homes saves you.",
  ],
  comoSeCalcula: [
    "The normal duty is {{mt.duty-rates[standard]}}: €5 for every €100 or part of €100 of the price or the market value, whichever is higher.",
    "If the property will be your sole ordinary residence, the first {{mt.duty-thresholds[sole-residence]}} pays {{mt.duty-rates[sole-residence]}} and the rest pays {{mt.duty-rates[standard]}}.",
    "A first-time buyer pays no duty on the first {{mt.duty-thresholds[first-time-buyer]}} and {{mt.duty-rates[standard]}} on the rest.",
  ],
  ejemplo: ["A first-time buyer paying €300,000 pays nothing on the first {{mt.duty-thresholds[first-time-buyer]}} and €5,000 on the other €100,000."],
  faq: [
    {
      pregunta: "Who counts as a first-time buyer?",
      respuesta:
        "For purchases from 28 October 2025, someone who has never bought, other than by inheritance, any property used or meant to be used as a home, including land or airspace to build one. A share under 25% of a property you bought before does not count, unless you already used this relief.",
    },
    {
      pregunta: "What if I buy only a share of the property?",
      respuesta: "The relief applies pro rata to the share you buy.",
    },
    {
      pregunta: "What does the notary need from me?",
      respuesta: "A declaration in the deed that you meet the conditions. The notary records it and warns you that it has to be true, and proof is sent to the tax administration with the notice of the transfer.",
    },
  ],
  glosario: [
    { termino: "Duty on documents and transfers", definicion: "The tax a buyer pays on the transfer of property in Malta, often called stamp duty." },
    { termino: "Sole ordinary residence", definicion: "The only or main home where you live, as declared in the deed." },
  ],
});
