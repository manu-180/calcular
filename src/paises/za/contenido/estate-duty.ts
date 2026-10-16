import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.estate-duty",
  h1: "Estate duty calculator",
  title: "Estate duty calculator South Africa 2026/27",
  description: "Estimate estate duty on a deceased estate: a basic deduction of {{za.estate-duty-abatement}}, then 20% up to R30 million and 25% above it.",
  intro: [
    "Enter the value of the estate, its liabilities and what goes to a surviving spouse or to public benefit organisations. You get the estate duty SARS charges.",
    "Estate duty is levied on the property of South African residents and on the South African property of non-residents.",
  ],
  comoSeCalcula: [
    "Start with the value of the property and take off liabilities, bequests to public benefit organisations and property that goes to a surviving spouse.",
    "Take off the basic deduction of {{za.estate-duty-abatement}}. What is left is the dutiable amount.",
    "The duty is 20% on the first R30 million of the dutiable amount and 25% on the rest.",
  ],
  ejemplo: ["An estate of R12 million with R1 million of debt pays R1 500 000 in estate duty: 20% of R7,5 million."],
  faq: [
    {
      pregunta: "Is there estate duty on what I leave to my spouse?",
      respuesta: "No. Property that goes to a surviving spouse is deducted before estate duty is worked out.",
    },
    {
      pregunta: "Is estate duty the same as capital gains tax on death?",
      respuesta: "No. Death also counts as a disposal for capital gains tax, which is worked out separately, with a larger annual exclusion in the year of death.",
    },
    {
      pregunta: "What are allowable deductions?",
      respuesta: "Liabilities of the estate, bequests to public benefit organisations and property accruing to a surviving spouse, plus the basic deduction of {{za.estate-duty-abatement}}.",
    },
  ],
  glosario: [
    { termino: "Dutiable amount", definicion: "The value of the estate after all deductions, on which estate duty is charged." },
    { termino: "Basic deduction", definicion: "A fixed amount of {{za.estate-duty-abatement}} that every estate can deduct." },
  ],
});
