import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.salario-por-hora",
  h1: "Calculadora de salario por hora y por día en Honduras",
  title: "Salario por hora en Honduras: diurna, mixta y nocturna",
  description: "Pase su salario mensual a salario diario, semanal, quincenal y por hora según su jornada: diurna, mixta o nocturna.",
  intro: [
    "Saber cuánto vale su hora sirve para revisar horas extra, feriados y descuentos.",
    "En Honduras la jornada de día es de {{hn.jornada-horas[diurna]}}, la mixta de {{hn.jornada-horas[mixta]}} y la de noche de {{hn.jornada-horas[nocturna]}}. Con el mismo salario, la hora nocturna vale más.",
  ],
  comoSeCalcula: [
    "Salario diario = salario mensual / 30.",
    "Valor de la hora = salario diario / horas de su jornada.",
    "Salario quincenal = salario mensual / 2. Salario semanal = salario diario × 7.",
  ],
  ejemplo: ["Con L14,400 al mes, el día vale L480. La hora vale L60 de día, L68.57 en jornada mixta y L80 de noche."],
  faq: [
    {
      pregunta: "¿Cuántas horas es la jornada laboral en Honduras?",
      respuesta: "De día, {{hn.jornada-horas[diurna]}} diarias y 44 a la semana. Mixta, {{hn.jornada-horas[mixta]}} diarias y 42 a la semana. De noche, {{hn.jornada-horas[nocturna]}} diarias y 36 a la semana.",
    },
    {
      pregunta: "¿Por qué se divide entre 30 y no entre los días del mes?",
      respuesta: "Porque el salario mensual paga los 30 días, incluidos los de descanso. Así lo calcula también el acuerdo de salario mínimo.",
    },
    {
      pregunta: "¿Qué es la jornada mixta?",
      respuesta: "La que mezcla horas de día y de noche, con menos de 3 horas nocturnas. Si tiene 3 horas o más de noche, se toma como jornada nocturna.",
    },
    {
      pregunta: "¿Cuánto vale una hora extra?",
      respuesta: "El valor de la hora ordinaria más un recargo del {{hn.recargo-horas-extra[diurna]}}, {{hn.recargo-horas-extra[nocturna]}} o {{hn.recargo-horas-extra[prolongacion-nocturna]}} según el horario. Use la calculadora de horas extra.",
    },
  ],
  glosario: [
    { termino: "Jornada diurna", definicion: "La que se trabaja entre las 5:00 a. m. y las 7:00 p. m." },
    { termino: "Jornada mixta", definicion: "La que abarca horas de día y de noche, con menos de 3 horas nocturnas (artículo 321)." },
  ],
});
