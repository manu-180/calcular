import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ke.overtime-calculator",
  h1: "Overtime calculator Kenya",
  title: "Overtime calculator Kenya: 1.5 and 2 times the hourly rate",
  description: "Work out overtime pay under the Regulation of Wages (General) Order: 1.5 times the hourly rate on normal days and twice on rest days and public holidays.",
  intro: [
    "Enter your wage and the extra hours you worked to see your overtime pay.",
    "If you earn a monthly wage, the calculator turns it into an hourly rate the way the wages order says.",
  ],
  comoSeCalcula: [
    "The normal working week is up to {{ke.normal-week-hours}} hours over six days. Hours beyond that are overtime.",
    "Overtime on normal days is paid at {{ke.overtime-normal-factor}} times the normal hourly rate. Work on your rest day or a public holiday is paid at {{ke.overtime-rest-day-factor}} times.",
    "For monthly paid employees the hourly rate is at least the basic monthly wage divided by {{ke.overtime-hourly-divisor}}.",
  ],
  ejemplo: ["On KSh 30,000 a month the hourly rate is KSh 133.33. Six overtime hours pay KSh 1,200."],
  faq: [
    {
      pregunta: "How many hours can I work in total?",
      respuesta: "Normal hours plus overtime cannot pass 116 hours in two consecutive weeks, or 144 hours for night work.",
    },
    {
      pregunta: "Is the night shift week different?",
      respuesta: "Yes. For night work the normal week is up to 60 hours.",
    },
    {
      pregunta: "Does this apply to farm workers?",
      respuesta: "Agricultural workers are covered by a separate wages order. This calculator follows the general order.",
    },
  ],
  glosario: [{ termino: "Normal hourly rate", definicion: "What you earn for one hour of normal work, before any overtime premium." }],
});
