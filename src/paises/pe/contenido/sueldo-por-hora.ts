import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.sueldo-por-hora",
  h1: "Calculadora de sueldo por hora y por día",
  title: "Sueldo por hora 2026: calcula cuánto ganas por hora",
  description:
    "Convierte tu sueldo mensual en pago por hora, por día y por quincena. Compáralo con la hora de la remuneración mínima de {{pe.rmv}}.",
  intro: [
    "Saber cuánto ganas por hora te sirve para revisar tus horas extras, comparar ofertas de trabajo o cobrar un trabajo por horas.",
    "Pon tu sueldo y las horas de tu jornada. Te damos el valor de tu hora y de tu día, como lo calcula el Ministerio de Trabajo.",
  ],
  comoSeCalcula: [
    "Tu sueldo mensual (con la asignación familiar si la cobras) se divide entre 30: ese es el valor de tu día.",
    "El valor del día se divide entre las horas de tu jornada diaria: ese es el valor de tu hora.",
    "Para comparar, la hora de la remuneración mínima es la RMV de {{pe.rmv}} dividida entre 30 y entre 8.",
  ],
  ejemplo: ["Ganas S/ 2,400 y trabajas 8 horas al día. Tu día vale S/ 80 y tu hora, S/ 10."],
  faq: [
    {
      pregunta: "¿Por qué se divide entre 30 y no entre los días que trabajo?",
      respuesta: "Porque el sueldo mensual paga los 30 días del mes, incluidos los de descanso. Es la forma que usa el Ministerio de Trabajo para calcular el valor de la hora.",
    },
    {
      pregunta: "¿Cuánto es el sueldo mínimo por hora?",
      respuesta: "Es la RMV de {{pe.rmv}} dividida entre 30 días y entre 8 horas. La calculadora te lo muestra en la última fila del resultado.",
    },
    {
      pregunta: "¿Para qué me sirve el valor de mi hora?",
      respuesta: "Es la base para calcular tus horas extras, que se pagan con una sobretasa encima de este valor.",
    },
  ],
  glosario: [
    { termino: "Valor hora", definicion: "Lo que se paga por una hora de trabajo ordinario: el sueldo entre 30 y entre las horas de la jornada." },
    { termino: "Jornada", definicion: "Las horas que trabajas al día. El máximo legal es 8 horas diarias o 48 semanales." },
  ],
});
