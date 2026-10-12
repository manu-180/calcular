import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.domingo-trabajado",
  h1: "Calculadora de domingo trabajado en Panamá",
  title: "Domingo trabajado en Panamá: calcula tu recargo",
  description:
    "Si trabajas el domingo o tu día de descanso en Panamá, te pagan {{pa.recargo-descanso[domingo]}} de recargo y te deben otro día libre. Calcula cuánto te toca.",
  intro: [
    "Trabajar el domingo o tu día de descanso semanal se paga con un recargo del {{pa.recargo-descanso[domingo]}} sobre la jornada. Además, te deben dar otro día de descanso en la semana.",
    "Escribe tu salario, tu jornada y las horas que trabajaste. Te mostramos el valor de la hora, el recargo y el total del día.",
  ],
  comoSeCalcula: [
    "Valor de la hora: salario mensual entre las horas del mes de tu jornada.",
    "Pago de las horas: valor de la hora por las horas que trabajaste ese día.",
    "Recargo: {{pa.recargo-descanso[domingo]}} del pago de esas horas en domingo o en el día que te dieron como compensación.",
    "Si tu semana es de menos de seis días y trabajas un día libre: {{pa.recargo-descanso[libre-diurna]}} en jornada diurna y {{pa.recargo-descanso[libre-nocturna]}} en mixta o nocturna.",
  ],
  ejemplo: [
    "Con B/. 1,000 al mes en jornada diurna, 8 horas de domingo valen B/. 38.46. El recargo es B/. 19.23. Total del día: B/. 57.69.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se paga el domingo trabajado en Panamá?",
      respuesta: "La jornada con un recargo del {{pa.recargo-descanso[domingo]}}. Es decir, una vez y media lo que vale ese día.",
    },
    {
      pregunta: "¿Me tienen que dar otro día libre?",
      respuesta: "Sí. El descanso semanal es un derecho. Si trabajas el domingo, te deben otro día de descanso, y si también lo trabajas, lleva {{pa.recargo-descanso[compensatorio]}} de recargo.",
    },
    {
      pregunta: "¿Y si trabajo cinco días y me llaman el sábado?",
      respuesta: "Ese día libre por semana corta se paga con {{pa.recargo-descanso[libre-diurna]}} de recargo en jornada diurna y {{pa.recargo-descanso[libre-nocturna]}} en jornada mixta o nocturna.",
    },
    {
      pregunta: "¿Y si el domingo trabajé más de mi jornada?",
      respuesta: "Primero se aplica el recargo del domingo y, sobre ese resultado, el de las horas extra.",
    },
  ],
  glosario: [
    { termino: "Descanso semanal", definicion: "Un día completo de 24 horas sin trabajar cada semana, de preferencia el domingo." },
    { termino: "Día compensatorio", definicion: "El día de descanso que te dan a cambio del domingo trabajado." },
  ],
});
