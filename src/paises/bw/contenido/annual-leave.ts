import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.annual-leave",
  h1: "Annual leave calculator Botswana",
  title: "Annual leave calculator Botswana: days and leave pay",
  description: "Work out the annual leave you have earned in Botswana at {{bw.annual-leave-days}} a month, how many days are left and what they are worth.",
  intro: ["Enter the months you have worked in the leave cycle and the days you have taken to see your leave balance and its value."],
  comoSeCalcula: [
    "You earn {{bw.annual-leave-days}} of paid leave for each month worked.",
    "The days you have taken come off what you earned.",
    "Each day left is worth your monthly basic pay divided by the working days in a month for your week.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [],
});
