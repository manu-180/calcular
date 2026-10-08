import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.horas-extra",
  h1: "Calculadora de horas extras en Venezuela",
  title: "Horas extras en Venezuela: recargo de {{ve.recargo-horas-extra}} y bono nocturno",
  description:
    "Calcula tus horas extras con el recargo de {{ve.recargo-horas-extra}} de la LOTTT y el bono nocturno de {{ve.recargo-nocturno}}. En bolívares o en dólares, paso a paso.",
  intro: [
    "En Venezuela cada hora extra se paga con al menos un {{ve.recargo-horas-extra}} más que tu hora normal. Si trabajas de noche, ese recargo se calcula sobre la hora que ya lleva el bono nocturno de {{ve.recargo-nocturno}}.",
    "Las horas extra son las que trabajas fuera de tu jornada. Escribe tu salario, tu jornada y las horas, y te mostramos el resultado en bolívares y en dólares.",
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
      pregunta: "¿Cómo se calcula una hora extra en Venezuela?",
      respuesta: "Divide tu salario mensual entre {{ve.dias-mes-salario}} y después entre las horas de tu jornada. A esa hora le sumas el {{ve.recargo-horas-extra}}. Con $240 al mes en jornada diurna, la hora vale $1 y la extra $1,50.",
    },
    {
      pregunta: "¿Cuánto es el bono nocturno?",
      respuesta: "Un {{ve.recargo-nocturno}} sobre la hora normal, por el trabajo entre las 7:00 p. m. y las 5:00 a. m.",
    },
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
