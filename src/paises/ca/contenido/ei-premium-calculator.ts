import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.ei-premium-calculator",
  h1: "EI premium calculator 2026",
  title: "EI premium calculator 2026: employee and employer",
  description: "Calculate your 2026 Employment Insurance premiums at {{ca.ei-rates[employee]}} ({{ca.ei-rates[employee-qc]}} in Quebec) up to {{ca.ei-maximum}} of insurable earnings, plus the employer share.",
  intro: [
    "Enter your insurable earnings to see the EI premiums that come off your pay in 2026 and what your employer pays on top.",
    "Quebec has a lower EI rate and its own parental insurance plan (QPIP).",
  ],
  comoSeCalcula: [
    "EI is charged on insurable earnings up to {{ca.ei-maximum}} a year.",
    "The employee rate is {{ca.ei-rates[employee]}} outside Quebec and {{ca.ei-rates[employee-qc]}} in Quebec.",
    "The employer pays {{ca.ei-rates[employer]}} outside Quebec and {{ca.ei-rates[employer-qc]}} in Quebec, on the same earnings.",
  ],
  ejemplo: ["On $50,000 outside Quebec you pay $815 of EI premiums and your employer pays $1,141."],
  faq: [
    {
      pregunta: "What is the maximum EI premium in 2026?",
      respuesta: "$1,123.07 for an employee outside Quebec and $895.70 in Quebec, reached at {{ca.ei-maximum}} of insurable earnings.",
    },
    {
      pregunta: "Why does my employer pay more than I do?",
      respuesta: "The employer rate is 1.4 times the employee rate: {{ca.ei-rates[employer]}} against {{ca.ei-rates[employee]}}.",
    },
    {
      pregunta: "Do EI premiums lower my income tax?",
      respuesta: "Yes. Your EI premiums give you a non-refundable federal and provincial tax credit.",
    },
  ],
  glosario: [
    { termino: "Insurable earnings", definicion: "The pay on which EI premiums are charged, up to {{ca.ei-maximum}} a year in 2026." },
    { termino: "QPIP", definicion: "Quebec Parental Insurance Plan, which pays parental benefits in Quebec instead of EI." },
  ],
});
