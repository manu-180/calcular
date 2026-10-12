import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.bono-nocturno",
  h1: "Calculadora de bono nocturno en Venezuela",
  title: "Bono nocturno en Venezuela: recargo de {{ve.recargo-nocturno}}",
  description:
    "Calcula tu bono nocturno con la LOTTT: un recargo de al menos {{ve.recargo-nocturno}} sobre el salario de la jornada diurna. Por jornadas o por horas, en bolívares o dólares.",
  intro: [
    "Si trabajas entre las 7:00 p. m. y las 5:00 a. m., te deben pagar un recargo de al menos {{ve.recargo-nocturno}} sobre lo que ganarías de día. Ese recargo se conoce como bono nocturno.",
    "Puedes calcularlo por jornadas nocturnas completas o por horas sueltas de noche dentro de una jornada mixta.",
  ],
  comoSeCalcula: [
    "Salario diario: tu salario mensual entre {{ve.dias-mes-salario}}. Es el valor de una jornada.",
    "Hora diurna: el salario diario entre {{ve.jornada-diurna-horas}}.",
    "Bono nocturno: {{ve.recargo-nocturno}} de la jornada o de la hora, por la cantidad trabajada de noche.",
  ],
  ejemplo: ["Con $240 al mes, cada jornada vale $8 y el bono nocturno es $2,40. Por 20 noches en el mes, el bono suma $48."],
  faq: [
    {
      pregunta: "¿Cuánto es el bono nocturno en Venezuela?",
      respuesta: "Al menos {{ve.recargo-nocturno}} sobre el salario de la jornada diurna. Tu contrato puede fijar más.",
    },
    {
      pregunta: "¿Qué horario es nocturno?",
      respuesta: "El que va de 7:00 p. m. a 5:00 a. m. La jornada nocturna no puede pasar de {{ve.jornada-nocturna-horas}} diarias.",
    },
    {
      pregunta: "¿Y si mi jornada mezcla horas de día y de noche?",
      respuesta: "Es una jornada mixta. Si tiene más de cuatro horas de noche, cuenta como nocturna completa. Si no, el bono se paga por las horas nocturnas.",
    },
    {
      pregunta: "¿El bono nocturno cuenta para las prestaciones?",
      respuesta: "Sí. Es salario, así que entra en el salario normal y en el integral.",
    },
  ],
  glosario: [
    { termino: "Bono nocturno", definicion: "Recargo por trabajar entre las 7:00 p. m. y las 5:00 a. m. (art. 117 de la LOTTT)." },
    { termino: "Jornada mixta", definicion: "La que combina horas de día y de noche." },
  ],
});
