import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lr.annual-leave",
  h1: "Annual leave calculator Liberia",
  title: "Liberia annual leave calculator: your days off",
  description: "Find how many days of paid annual leave you are entitled to in Liberia under the Decent Work Act, based on your months of continuous service.",
  intro: [
    "Enter your months of service and your working days a week to see your annual leave.",
    "Leave grows with your years of continuous service with the same employer.",
  ],
  comoSeCalcula: [
    "Weeks of leave by continuous service with the same employer.",
    "Days of leave: weeks × your working days in a week. Weekly rest days and public holidays are not counted.",
  ],
  ejemplo: ["After three years with a five-day week, you get 3 weeks, which is 15 working days."],
  faq: [
    {
      pregunta: "Can I carry leave over?",
      respuesta: "Leave accumulates, but you cannot build up more than three years of entitlement.",
    },
    {
      pregunta: "Do public holidays count as leave?",
      respuesta: "No. Weekly rest days and public holidays are not part of your annual leave.",
    },
    {
      pregunta: "Is annual leave paid?",
      respuesta: "Yes. Enter your daily pay to see what your leave is worth.",
    },
  ],
  glosario: [{ termino: "Continuous service", definicion: "Unbroken time working for the same employer." }],
});
