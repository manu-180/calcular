import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pk.minimum-wage",
  h1: "Minimum wage in Pakistan 2026-27",
  title: "Minimum wage Pakistan 2026-27: {{pk.minimum-wage}} a month",
  description: "The federal minimum wage is {{pk.minimum-wage}} a month from 1 July 2026. Compare your salary with it.",
  intro: [
    "From 1 July 2026 the federal government raised the minimum wage from Rs. 37,000 to {{pk.minimum-wage}} a month.",
    "Provinces declare their own minimum wages for workers in their territory, so check your province's notification too.",
  ],
  comoSeCalcula: ["The minimum is a monthly amount. Over a year it is 12 times as much. Enter your salary to see the difference."],
  ejemplo: ["A salary of Rs. 38,000 is Rs. 2,700 below the federal minimum wage."],
  faq: [
    {
      pregunta: "Who announced the new minimum wage?",
      respuesta: "The Finance Division's office memorandum of 21 August 2026 applies {{pk.minimum-wage}} from 1 July 2026 to federal government employees.",
    },
    {
      pregunta: "Does the minimum wage affect EOBI?",
      respuesta: "Yes. EOBI contributions are a percentage of the declared minimum wage.",
    },
    {
      pregunta: "Is income tax charged on the minimum wage?",
      respuesta: "No. A yearly salary up to Rs. 600,000 is taxed at 0%, and the minimum wage is below that.",
    },
  ],
  glosario: [{ termino: "Minimum wage", definicion: "The lowest monthly pay allowed for an unskilled adult worker." }],
});
