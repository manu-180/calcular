import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.minimum-wage",
  h1: "Minimum wage calculator Botswana",
  title: "Minimum wage Botswana: hourly, weekly and monthly",
  description: "Turn the Botswana minimum wage of {{bw.minimum-wage-hourly}} an hour into weekly and monthly pay for your hours, and check whether you are paid enough.",
  intro: ["Enter the hours you work each week to turn the hourly minimum wage into weekly and monthly pay."],
  comoSeCalcula: [
    "The minimum wage is {{bw.minimum-wage-hourly}} an hour.",
    "Weekly pay is the hourly rate times your weekly hours.",
    "Monthly pay is the weekly pay times 52 weeks, divided by 12.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [],
});
