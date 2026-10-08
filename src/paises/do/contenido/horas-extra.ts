import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.horas-extra",
  h1: "Calculadora de horas extras en República Dominicana",
  title: "Horas extras en RD: calcula cuánto te deben pagar",
  description:
    "Calcula tus horas extras en RD: recargo de {{do.recargo-hora-extra}} o de {{do.recargo-hora-extra-68}} según las horas de tu semana, y {{do.recargo-nocturno}} por horas nocturnas. Según el Código de Trabajo.",
  intro: [
    "En República Dominicana cada hora extra se paga con un {{do.recargo-hora-extra}} más que la hora normal, y con un {{do.recargo-hora-extra-68}} más si tu semana pasa de {{do.limite-horas-recargo-35}}.",
    "Las horas que trabajas después de tu jornada normal son horas extra. Escribe tu salario y tus horas, y ves el valor de cada hora y el total a cobrar.",
  ],
  comoSeCalcula: [
    "El valor de tu hora normal es el salario mensual dividido entre {{do.divisor-salario-diario}} y después entre las horas de tu jornada diaria.",
    "Mientras tu semana no pasa de {{do.limite-horas-recargo-35}}, cada hora extra lleva {{do.recargo-hora-extra}} más.",
    "Las horas extra por encima de {{do.limite-horas-recargo-35}} a la semana llevan {{do.recargo-hora-extra-68}} más.",
    "Las horas de tu jornada entre las 9 de la noche y las 7 de la mañana llevan un recargo de {{do.recargo-nocturno}}.",
  ],
  ejemplo: [
    "Con RD$30,000 al mes y jornada de 8 horas, tu hora vale RD$157.36. Una hora extra común se paga RD$212.44, y una por encima de 68 horas semanales, RD$314.72.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula una hora extra en RD?",
      respuesta: "Divides tu salario mensual entre {{do.divisor-salario-diario}} y después entre las horas de tu jornada. A esa hora le sumas el {{do.recargo-hora-extra}}. Con RD$30,000 y 8 horas, la hora vale RD$157.36 y la extra RD$212.44.",
    },
    {
      pregunta: "¿Cuál es la jornada máxima en República Dominicana?",
      respuesta: "{{do.jornada-diaria}} por día y {{do.jornada-semanal}} por semana. Lo que pase de tu jornada normal es hora extra.",
    },
    {
      pregunta: "¿Qué pasa si trabajo en mi día de descanso?",
      respuesta: "Puedes elegir entre cobrar ese día con 100 % de aumento o tomar un descanso igual la semana siguiente.",
    },
    {
      pregunta: "¿Las horas extra pagan ISR?",
      respuesta: "Sí. Se suman a tu salario del mes para calcular la retención.",
    },
    {
      pregunta: "¿Las horas extra cuentan para la regalía pascual?",
      respuesta: "No. La regalía se calcula solo con el salario ordinario.",
    },
  ],
  glosario: [
    { termino: "Hora extra", definicion: "Hora trabajada después de tu jornada normal." },
    { termino: "Jornada nocturna", definicion: "El horario entre las 9 de la noche y las 7 de la mañana." },
    { termino: "Recargo", definicion: "Lo que se suma al valor de la hora normal." },
  ],
});
