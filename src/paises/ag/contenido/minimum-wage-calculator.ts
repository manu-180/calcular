import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ag.minimum-wage-calculator",
  h1: "Minimum wage calculator Antigua and Barbuda {{anio}}",
  title: "Minimum wage calculator {{anio}}: hourly to monthly",
  description: "Turn the national minimum wage per hour into weekly and monthly pay for the hours you work.",
  intro: ["Enter the hours you work in a week to see the minimum pay for a week and a month."],
  comoSeCalcula: ["Multiply the hourly minimum wage by your weekly hours, then by 52 and divide by 12 for a month."],
  ejemplo: ["At {{ag.minimum-wage-hourly}} an hour, 40 hours a week is EC$460 a week."],
  faq: [
    { pregunta: "Who sets the minimum wage?", respuesta: "Section C22 of the Labour Code lets the Minister issue a minimum wage Order after a Minimum Wage Advisory Committee reports." },
    { pregunta: "Is the hourly rate current?", respuesta: "The rate is shown as {{ag.minimum-wage-hourly}} an hour." },
    { pregunta: "Where must the rates be posted?", respuesta: "Section C22(5) requires employers to post the rates on the notice board." },
  ],
  glosario: [{ termino: "Minimum Wage Order", definicion: "A Ministerial Order that sets the lowest wage." }],
});
