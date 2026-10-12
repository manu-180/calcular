import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.descanso-semanal",
  h1: "Calculadora de pago por trabajar el día de descanso",
  title: "Pago por trabajar su día de descanso en El Salvador",
  description: "Si trabaja su día de descanso semanal, le pagan las horas con un recargo del {{sv.recargo-descanso-semanal}} y le deben otro día libre pagado. Calcule cuánto.",
  intro: [
    "Todo trabajador tiene un día de descanso pagado por semana, que en general es el domingo. Si lo trabaja de común acuerdo con su patrono, le pagan las horas con un recargo mínimo del {{sv.recargo-descanso-semanal}} y le dan otro día de descanso pagado.",
    "Ponga su salario, las horas que trabajó en su día de descanso y cuántas veces pasó.",
  ],
  comoSeCalcula: [
    "Valor de la hora: salario mensual dividido por 30 y por la jornada de {{sv.jornada-diurna}}.",
    "Pago: las horas trabajadas por el valor de la hora, más el {{sv.recargo-descanso-semanal}} de recargo.",
    "Por cada día de descanso trabajado le corresponde un día compensatorio pagado, en la misma semana o en la siguiente.",
  ],
  ejemplo: ["Con $600 al mes, ocho horas un domingo valen $20 más $10 de recargo: $30, y un día libre pagado."],
  faq: [
    {
      pregunta: "¿Mi día de descanso tiene que ser el domingo?",
      respuesta: "En general sí. Las empresas que trabajan sin parar, los servicios públicos y los negocios que abren los domingos pueden fijar otro día.",
    },
    {
      pregunta: "¿Qué pasa si además hago horas extra ese día?",
      respuesta: "Las horas extra de ese día se calculan sobre el salario con el recargo del descanso, así que valen más que una hora extra normal.",
    },
    {
      pregunta: "¿Pierdo el pago del descanso si falto un día?",
      respuesta: "Si no completa la semana laboral sin causa justificada, el patrono puede no pagarle ese día de descanso.",
    },
  ],
  glosario: [
    { termino: "Descanso compensatorio", definicion: "El día libre pagado que le deben por haber trabajado su descanso semanal." },
  ],
});
