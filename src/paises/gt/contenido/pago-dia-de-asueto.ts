import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.pago-dia-de-asueto",
  h1: "Calculadora del pago por trabajar un día de asueto",
  title: "Pago por trabajar en asueto o descanso en Guatemala",
  description:
    "Calcule cuánto le deben pagar aparte por trabajar un día de asueto o su día de descanso semanal. Se paga como tiempo extraordinario.",
  intro: [
    "Los días de asueto y el descanso semanal se pagan aunque no trabaje: ya están incluidos en su salario mensual.",
    "Si trabaja ese día, las horas trabajadas se le pagan aparte como tiempo extraordinario, con un recargo del {{gt.recargo-horas-extra}} sobre la hora ordinaria.",
  ],
  comoSeCalcula: [
    "Hora ordinaria = salario mensual / 30 / horas de su jornada.",
    "Hora en asueto = hora ordinaria × (1 + {{gt.recargo-horas-extra}}).",
    "Pago adicional = hora en asueto × horas trabajadas ese día.",
  ],
  ejemplo: ["Gana Q4,800 en jornada diurna de {{gt.jornada-horas[diurna]}}: la hora ordinaria es Q20 y por 8 horas en asueto le pagan Q240 aparte."],
  faq: [
    {
      pregunta: "¿Cuáles son los días de asueto en Guatemala?",
      respuesta: "El Código de Trabajo fija el 1 de enero, el jueves, viernes y sábado santos, el 1 de mayo, el 30 de junio, el 15 de septiembre, el 20 de octubre, el 1 de noviembre, el 25 de diciembre, medio día el 24 y el 31 de diciembre y el día de la fiesta de su localidad. Las madres trabajadoras tienen además el 10 de mayo.",
    },
    {
      pregunta: "¿Me pueden obligar a trabajar en asueto?",
      respuesta: "Solo en trabajos que por su naturaleza no se pueden interrumpir o en casos que autorice la Inspección General de Trabajo. Aun así, le tienen que pagar las horas como tiempo extraordinario.",
    },
    {
      pregunta: "¿Pueden darme otro día libre en lugar de pagarme?",
      respuesta: "La ley dice que las horas trabajadas en asueto se pagan como tiempo extraordinario. Un día libre a cambio no reemplaza ese pago.",
    },
  ],
  glosario: [
    { termino: "Asueto", definicion: "Día feriado pagado que fija el Código de Trabajo." },
    { termino: "Descanso semanal", definicion: "Un día pagado de descanso por cada semana de trabajo." },
  ],
});
