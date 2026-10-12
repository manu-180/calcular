import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.salario-por-hora",
  h1: "Calculadora de salario por hora y por día",
  title: "Salario por hora en Costa Rica: diurna, mixta y nocturna",
  description:
    "Pase su salario mensual a salario por día y por hora según su jornada: diurna de {{cr.jornada-diaria[diurna]}}, mixta de {{cr.jornada-diaria[mixta]}} o nocturna de {{cr.jornada-diaria[nocturna]}}.",
  intro: [
    "Para saber cuánto vale su hora, divida el salario mensual entre 30 y después entre las horas de su jornada. La jornada cambia el resultado.",
    "Escriba su salario y elija su jornada: le mostramos el valor del día, de la hora y de la hora extra.",
  ],
  comoSeCalcula: [
    "Salario diario: el mensual entre {{cr.dias-mes-planilla}}.",
    "Salario por hora: el diario entre las horas de la jornada: {{cr.jornada-diaria[diurna]}} diurna, {{cr.jornada-diaria[mixta]}} mixta o {{cr.jornada-diaria[nocturna]}} nocturna.",
    "Hora extra: la hora ordinaria más {{cr.recargo-horas-extra}} (tiempo y medio).",
  ],
  ejemplo: ["Con ₡600.000 al mes y jornada diurna, el día vale ₡20.000, la hora ₡2.500 y la hora extra ₡3.750."],
  faq: [
    {
      pregunta: "¿Por qué se divide entre 30 y no entre los días hábiles?",
      respuesta: "Porque el salario mensual paga todos los días del mes, a razón de 30, aunque algunos sean de descanso. Así lo indica el decreto de salarios mínimos.",
    },
    {
      pregunta: "¿Cuál es la jornada mixta?",
      respuesta: "La que combina horas de día y de noche, de {{cr.jornada-diaria[mixta]}} como máximo. Si trabaja tres horas y media o más entre las 7 de la noche y las 5 de la mañana, se considera nocturna.",
    },
    {
      pregunta: "¿Cuántas horas tiene la jornada nocturna?",
      respuesta: "{{cr.jornada-diaria[nocturna]}} por día.",
    },
  ],
  glosario: [
    { termino: "Jornada diurna", definicion: "Entre las 5 de la mañana y las 7 de la noche." },
    { termino: "Tiempo y medio", definicion: "El pago de la hora extra: una vez y media la hora ordinaria." },
  ],
});
