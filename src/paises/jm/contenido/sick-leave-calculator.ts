import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jm.sick-leave-calculator",
  h1: "Sick leave calculator Jamaica",
  title: "Sick leave calculator Jamaica: paid sick days you are owed",
  description:
    "Find your paid sick leave under the Holidays with Pay Order: one day per {{jm.leave-days-per}} worked in the first year, then {{jm.sick-leave-weeks}} a year.",
  intro: [
    "Every worker in Jamaica except casual workers is entitled to paid sick leave. How much depends on how long you have been with your employer.",
    "Enter your months of service and your weekly pay to see your paid sick days and what they are worth.",
  ],
  comoSeCalcula: [
    "In your first {{jm.sick-leave-first-months}}: one day of paid sick leave for every {{jm.leave-days-per}} worked.",
    "After {{jm.sick-leave-first-months}}: {{jm.sick-leave-weeks}} of paid sick leave a year, counted in normal working weeks.",
    "The pay is worked out from your normal weekly wage.",
  ],
  ejemplo: ["After 18 months on a 5-day week you are entitled to 10 days of paid sick leave a year. On J$40,000 a week they are worth J$80,000."],
  faq: [
    {
      pregunta: "How many sick days do I get in Jamaica?",
      respuesta: "After your first 12 months, {{jm.sick-leave-weeks}} a year, counted in normal working weeks. On a 5-day week that is 10 days.",
    },
    {
      pregunta: "Do casual workers get sick leave?",
      respuesta: "No. Workers hired by the day or for a single task get a sick benefit instead.",
    },
    {
      pregunta: "Can my contract give me more?",
      respuesta: "Yes. The Holidays with Pay Order sets the minimum. A contract or union agreement can give more paid sick days.",
    },
  ],
  glosario: [{ termino: "Normal working week", definicion: "The days and hours you usually work in a week." }],
});
