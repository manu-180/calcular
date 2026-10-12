import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.feriado-trabajado",
  h1: "Calculadora de feriado trabajado en Panamá",
  title: "Feriado trabajado en Panamá: calcula el recargo del {{pa.recargo-feriado}}",
  description:
    "En Panamá, trabajar un día de fiesta o duelo nacional se paga con {{pa.recargo-feriado}} de recargo. Calcula cuánto te toca por el 1 de mayo, el 28 de noviembre y otros feriados.",
  intro: [
    "Si trabajas un día de fiesta o duelo nacional, te pagan un recargo del {{pa.recargo-feriado}} sobre tu jornada ordinaria. También te deben otro día libre en la semana.",
    "Escribe tu salario, tu jornada y las horas que trabajaste. Te mostramos el recargo y el valor total del día.",
  ],
  comoSeCalcula: [
    "Valor de la hora: salario mensual entre las horas del mes de tu jornada.",
    "Pago normal: valor de la hora por las horas que trabajaste el feriado.",
    "Recargo: {{pa.recargo-feriado}} de ese pago normal.",
    "Valor total del día: el pago normal más el recargo.",
    "Si también trabajas el día libre que te deben a cambio, ese día lleva {{pa.recargo-descanso[compensatorio]}} de recargo.",
  ],
  ejemplo: [
    "Con B/. 1,000 al mes en jornada diurna, 8 horas valen B/. 38.46. El recargo del feriado es B/. 57.69 y el día completo vale B/. 96.15.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga un feriado trabajado en Panamá?",
      respuesta: "Tu jornada con un recargo del {{pa.recargo-feriado}}. El día trabajado vale en total dos veces y media tu jornada ordinaria.",
    },
    {
      pregunta: "¿Qué días son de fiesta o duelo nacional?",
      respuesta: "Los fija el Código de Trabajo y algunas leyes posteriores. Entre ellos están el 1 de enero, el martes de carnaval, el viernes santo, el 1 de mayo, las fiestas patrias de noviembre y el 25 de diciembre.",
    },
    {
      pregunta: "¿Si el feriado cae domingo?",
      respuesta: "El lunes siguiente pasa a ser día de descanso obligatorio. Si trabajas ese lunes, lleva {{pa.recargo-descanso[compensatorio]}} de recargo.",
    },
    {
      pregunta: "¿Y si trabajo en casa de familia?",
      respuesta: "En el trabajo doméstico el feriado trabajado tiene su propio recargo. Usa la calculadora de trabajo doméstico.",
    },
  ],
  glosario: [
    { termino: "Día de fiesta o duelo nacional", definicion: "Los feriados que fija el Código de Trabajo. Se descansan con goce de salario." },
    { termino: "Día puente", definicion: "Feriado que el Gobierno pasa a un lunes. Si lo trabajas, se paga como feriado." },
  ],
});
