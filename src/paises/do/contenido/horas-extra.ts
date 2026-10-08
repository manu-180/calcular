import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.horas-extra",
  h1: "Calculadora de horas extra",
  title: "Horas extra en RD: calcula cuánto te deben pagar",
  description:
    "Calcula el pago de tus horas extra con el recargo de {{do.recargo-hora-extra}} o {{do.recargo-hora-extra-68}} del Código de Trabajo, y el recargo de las horas nocturnas.",
  intro: [
    "Las horas que trabajas después de tu jornada normal se pagan con recargo. El recargo depende de cuántas horas suma tu semana.",
    "Escribe tu salario y tus horas, y ves el valor de cada hora y el total a cobrar.",
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
      pregunta: "¿Cuál es la jornada máxima en República Dominicana?",
      respuesta: "{{do.jornada-diaria}} por día y {{do.jornada-semanal}} por semana. Lo que pase de tu jornada normal es hora extra.",
    },
    {
      pregunta: "¿Las horas extra cuentan para la regalía pascual?",
      respuesta: "No. La regalía se calcula solo con el salario ordinario.",
    },
    {
      pregunta: "¿Qué pasa si trabajo en mi día de descanso?",
      respuesta: "Puedes elegir entre cobrar ese día con 100 % de aumento o tomar un descanso igual la semana siguiente.",
    },
    {
      pregunta: "¿Las horas extra pagan ISR?",
      respuesta: "Sí. Se suman a tu salario del mes para calcular la retención.",
    },
  ],
  glosario: [
    { termino: "Hora extra", definicion: "Hora trabajada después de tu jornada normal." },
    { termino: "Jornada nocturna", definicion: "El horario entre las 9 de la noche y las 7 de la mañana." },
    { termino: "Recargo", definicion: "Lo que se suma al valor de la hora normal." },
  ],
});
