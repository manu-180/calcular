import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.recargo-nocturno",
  h1: "Calculadora de recargo nocturno",
  title: "Recargo nocturno en Bolivia: calcule su pago",
  description: "Calcule el recargo por trabajo nocturno entre las 20 y las 6: del {{bo.recargo-nocturno[comercio]}} al {{bo.recargo-nocturno[nocivo]}} según dónde trabaja.",
  intro: [
    "El trabajo entre las 20 y las 6 horas se paga con un recargo sobre la hora normal. El porcentaje depende del lugar y del tipo de trabajo.",
    "Escriba su haber básico, las horas nocturnas del mes y dónde trabaja.",
  ],
  comoSeCalcula: [
    "La hora normal es el haber básico dividido 30 y dividido {{bo.jornada-horas-dia}}.",
    "Comercio, oficinas y vigilancia: {{bo.recargo-nocturno[comercio]}}. Industrias y fábricas: {{bo.recargo-nocturno[industria]}}.",
    "Mujeres y menores de 18 años: {{bo.recargo-nocturno[mujeres-menores]}}. Labores nocivas o peligrosas entre las 24 y las 6: {{bo.recargo-nocturno[nocivo]}}.",
    "El recargo es ese porcentaje de la hora normal por cada hora nocturna.",
  ],
  faq: [
    {
      pregunta: "¿Qué horario es trabajo nocturno en Bolivia?",
      respuesta: "El que se hace entre las 20 y las 6 horas. La jornada nocturna no puede pasar de 7 horas.",
    },
    {
      pregunta: "¿Cuánto es el recargo nocturno?",
      respuesta: "Entre {{bo.recargo-nocturno[comercio]}} y {{bo.recargo-nocturno[nocivo]}} de la hora normal, según el D.S. N° 90 de 1944: depende de si trabaja en comercio, industria, si es mujer o menor de edad, o si la labor es peligrosa.",
    },
    {
      pregunta: "¿Y si trabajo más de 7 horas de noche?",
      respuesta: "Lo que pasa de 7 horas en la jornada nocturna son horas extras y se pagan aparte, además del recargo.",
    },
  ],
  glosario: [
    { termino: "Recargo nocturno", definicion: "Porcentaje que se suma a la hora normal por trabajar de noche." },
    { termino: "Jornada nocturna", definicion: "Trabajo entre las 20 y las 6 horas, de 7 horas como máximo." },
  ],
});
