import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.horas-extra",
  h1: "Calculadora de horas extra",
  title: "Horas extra en Venezuela: calcula cuánto te pagan",
  description:
    "Calcula el pago de tus horas extra con el recargo de {{ve.recargo-horas-extra}} de la LOTTT. Incluye el bono nocturno de {{ve.recargo-nocturno}}. En bolívares o en dólares.",
  intro: [
    "Las horas extra son las que trabajas fuera de tu jornada. La ley obliga a pagarlas con un recargo de al menos {{ve.recargo-horas-extra}} sobre tu hora normal.",
    "Si trabajas de noche, la hora ya lleva el bono nocturno de {{ve.recargo-nocturno}}, y el recargo de la hora extra se calcula sobre ese valor.",
  ],
  comoSeCalcula: [
    "Salario diario: tu salario mensual entre {{ve.dias-mes-salario}}.",
    "Hora normal: salario diario entre las horas de tu jornada (8 la diurna, 7 y media la mixta, 7 la nocturna).",
    "Jornada nocturna: a la hora normal se le suma {{ve.recargo-nocturno}}.",
    "Hora extra: la hora anterior más {{ve.recargo-horas-extra}}, por la cantidad de horas extra.",
  ],
  ejemplo: ["Con $240 al mes en jornada diurna, la hora vale $1 y cada hora extra $1,50."],
  faq: [
    {
      pregunta: "¿Cuántas horas extra me pueden pedir?",
      respuesta: "Hasta 10 por semana y 100 por año, y nunca más de 10 horas de trabajo en un día contando las extra.",
    },
    {
      pregunta: "¿Qué es la jornada mixta?",
      respuesta: "La que mezcla horas de día y de noche. Si tiene más de cuatro horas nocturnas, cuenta como nocturna completa.",
    },
    {
      pregunta: "¿Mi empresa puede pagar más recargo?",
      respuesta: "Sí. El {{ve.recargo-horas-extra}} es el mínimo de ley. Si tu contrato fija más, vale lo del contrato.",
    },
  ],
  glosario: [
    { termino: "Bono nocturno", definicion: "Recargo de la jornada entre las 7:00 p. m. y las 5:00 a. m." },
    { termino: "Hora extra", definicion: "Hora trabajada fuera de la jornada ordinaria." },
  ],
});
