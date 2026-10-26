import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mu.sick-leave-calculator",
  h1: "Sick leave calculator Mauritius",
  title: "Sick leave in Mauritius: days on full pay",
  description:
    "See how much sick leave on full pay you have under the Workers' Rights Act: {{mu.sick-leave-days}} a year after 12 months, with unused days carried over.",
  intro: [
    "Sick leave lets you stay home when you are ill and still get your full pay.",
    "Enter your service and the days you have used to see what is left, including days carried over from past years.",
  ],
  comoSeCalcula: [
    "After 12 months of continuous employment you get {{mu.sick-leave-days}} of sick leave on full pay in each following 12-month period.",
    "Days you do not use are accumulated.",
    "A part-time worker gets the days a week they work, divided by the days a comparable full-time worker works, times {{mu.sick-leave-days}}.",
    "In the first year, after 6 months with no absence, a full-time worker earns one day a month up to the twelfth month.",
  ],
  ejemplo: ["After 3 years, with 4 days used this year and 20 carried over, a worker has 31 sick days available."],
  faq: [
    {
      pregunta: "When do I need a medical certificate?",
      respuesta: "When you are ill for more than 3 working days in a row. Send it on the fourth day of absence, or within 3 days of leaving hospital.",
    },
    {
      pregunta: "What are accumulated sick days used for?",
      respuesta: "Once your yearly sick leave runs out, days spent in hospital or recovering after a hospital stay can be taken from them, on full pay, with a medical certificate.",
    },
    {
      pregunta: "Do I have to tell my employer on the first day?",
      respuesta: "Yes, unless there is a reasonable cause or your employer already knows about the illness.",
    },
  ],
  glosario: [{ termino: "Full pay", definicion: "The same wage you get for a normal working day." }],
});
