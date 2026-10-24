import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.quebec-overtime",
  h1: "Quebec overtime pay calculator",
  title: "Quebec overtime: time and a half after 40 hours",
  description: "Work out your pay for a week with overtime in Quebec: hours above {{ca.qc-overtime[hours]}} a week are paid with a {{ca.qc-overtime[premium]}} premium.",
  intro: [
    "Enter your usual hourly wage and the hours you worked in the week to see your regular pay, your overtime pay and the total.",
    "It follows Quebec's Act respecting labour standards. Your contract or collective agreement can give more.",
  ],
  comoSeCalcula: [
    "Hours up to {{ca.qc-overtime[hours]}} in the week are paid at your usual hourly wage.",
    "Each hour above {{ca.qc-overtime[hours]}} is paid at your usual wage plus a {{ca.qc-overtime[premium]}} premium.",
  ],
  faq: [
    {
      pregunta: "From how many hours is it overtime?",
      respuesta: "From {{ca.qc-overtime[hours]}} hours in the week.",
    },
    {
      pregunta: "How much is the overtime premium?",
      respuesta: "{{ca.qc-overtime[premium]}} of your usual hourly wage, on top of that wage.",
    },
    {
      pregunta: "Does this cover jobs under the Canada Labour Code?",
      respuesta: "No. It follows Quebec's Act respecting labour standards. For federally regulated jobs, use the overtime calculator for Canada.",
    },
  ],
  glosario: [
    { termino: "Usual hourly wage", definicion: "The wage you normally earn for an hour of work." },
    { termino: "Overtime", definicion: "Hours worked above the standard work week." },
  ],
});
