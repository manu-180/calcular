import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.horas-extras",
  h1: "Calculadora de horas extras",
  title: "Horas extras en Bolivia: calcule cuánto le deben",
  description: "Calcule el pago de sus horas extras y de los feriados trabajados con su haber básico.",
  intro: [
    "La jornada es de 8 horas por día y 48 por semana. Lo que trabaja por encima son horas extras y se pagan con recargo.",
    "Escriba su haber básico, sus horas extras del mes y los feriados que trabajó.",
  ],
  comoSeCalcula: [
    "La hora normal es el haber básico dividido 30 y dividido 8.",
    "Cada hora extra se paga con el recargo de la Ley General del Trabajo.",
    "Cada feriado trabajado se paga con un recargo de {{bo.recargo-feriado}} sobre el día, salvo que el empleador le dé otro día de descanso.",
  ],
  faq: [],
  glosario: [{ termino: "Hora extra", definicion: "Cada hora trabajada por encima de la jornada de 8 horas por día." }],
});
