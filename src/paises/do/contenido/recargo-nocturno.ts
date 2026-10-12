import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.recargo-nocturno",
  h1: "Calculadora del recargo por jornada nocturna",
  title: "Recargo nocturno en RD: calcula tu pago extra",
  description: "Calcula el recargo de {{do.recargo-nocturno}} por las horas que trabajas de 9 de la noche a 7 de la mañana, según el artículo 204 del Código de Trabajo.",
  intro: [
    "Las horas trabajadas entre las 9 de la noche y las 7 de la mañana se pagan con un aumento de al menos {{do.recargo-nocturno}} sobre la hora normal.",
    "Pon tu salario, tu jornada y las horas nocturnas del mes, y ves cuánto se suma a tu pago.",
  ],
  comoSeCalcula: [
    "Tu hora normal es el salario mensual dividido entre {{do.divisor-salario-diario}} y después entre las horas de tu jornada.",
    "A cada hora nocturna se le suma el {{do.recargo-nocturno}} de la hora normal.",
    "El recargo del mes es ese monto por la cantidad de horas nocturnas.",
  ],
  ejemplo: [
    "Con RD$30,000 al mes y jornada de 8 horas, la hora vale RD$157.36. Cada hora nocturna lleva RD$23.60 más. Con 20 horas nocturnas, cobras RD$472.08 extra.",
  ],
  faq: [
    { pregunta: "¿Qué horario es jornada nocturna en RD?", respuesta: "De las 9 de la noche a las 7 de la mañana." },
    { pregunta: "¿Cuánto es el recargo nocturno?", respuesta: "Al menos {{do.recargo-nocturno}} sobre el valor de la hora normal. Tu contrato o el convenio colectivo pueden darte más." },
    { pregunta: "¿Se suma con las horas extra?", respuesta: "Sí. Si una hora es nocturna y además extra, lleva los dos recargos." },
  ],
  glosario: [
    { termino: "Jornada nocturna", definicion: "El horario entre las 9 de la noche y las 7 de la mañana." },
    { termino: "Recargo", definicion: "Lo que se suma al valor de la hora normal." },
  ],
});
