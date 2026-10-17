import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.medicare-levy-calculator",
  h1: "Medicare levy calculator",
  title: "Medicare levy calculator: the 2% levy and low-income cut",
  description: "Work out your Medicare levy of {{au.medicare-levy}}, including the reduction for single people earning less than {{au.medicare-umbrales[limite]}}.",
  intro: [
    "The Medicare levy is {{au.medicare-levy}} of your taxable income, paid on top of income tax.",
    "On a low income you pay less or nothing. Enter your taxable income to see your levy as a single person with no dependants.",
  ],
  comoSeCalcula: [
    "If your taxable income is {{au.medicare-umbrales[umbral]}} or less, you pay no Medicare levy.",
    "Between {{au.medicare-umbrales[umbral]}} and {{au.medicare-umbrales[limite]}}, the levy is capped at {{au.medicare-tasa-reduccion}} of the income above {{au.medicare-umbrales[umbral]}}.",
    "Above {{au.medicare-umbrales[limite]}} you pay the full {{au.medicare-levy}}.",
  ],
  ejemplo: ["With a taxable income of $29,000 the levy is $98.90 instead of $580."],
  faq: [
    {
      pregunta: "What is the Medicare levy for?",
      respuesta: "It helps fund some of the costs of Medicare, Australia's public health system.",
    },
    {
      pregunta: "Is the Medicare levy surcharge the same thing?",
      respuesta: "No. The Medicare levy surcharge is a separate levy that some people pay on top of the Medicare levy. This calculator does not include it.",
    },
    {
      pregunta: "Do the thresholds apply to families?",
      respuesta: "Families and people entitled to the seniors and pensioners tax offset have other thresholds based on family income. This calculator uses the threshold for single people with no dependants.",
    },
    {
      pregunta: "Where do the thresholds come from?",
      respuesta: "They are set in the Medicare Levy Act 1986, and Parliament changes them by amending that Act. The calculator uses the amounts in force today.",
    },
  ],
  glosario: [
    { termino: "Threshold amount", definicion: "The taxable income at or below which no Medicare levy is payable." },
    { termino: "Phase-in limit", definicion: "The income at which the reduced levy ends and the full levy applies." },
  ],
});
