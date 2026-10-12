import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.salario-por-hora",
  h1: "Calculadora de salario por hora 2026",
  title: "Salario por hora: calcula cuánto ganas por hora",
  description:
    "Convierte tu sueldo mensual, quincenal o semanal a salario por hora según tu jornada diurna, nocturna o mixta, y mira cuánto vale tu hora extra doble y triple.",
  intro: [
    "Saber cuánto ganas por hora sirve para revisar tus horas extra, comparar ofertas o cobrar un trabajo por horas.",
    "La ley fija la jornada diaria según el horario: {{mx.horas-jornada[diurna]}} la diurna, {{mx.horas-jornada[nocturna]}} la nocturna y {{mx.horas-jornada[mixta]}} la mixta.",
  ],
  comoSeCalcula: [
    "Saca tu salario diario: sueldo mensual entre 30, quincenal entre 15 o semanal entre 7.",
    "Divide entre las horas de tu jornada diaria.",
    "La hora extra doble lleva un recargo de {{mx.recargo-hora-doble}} y la triple de {{mx.recargo-hora-triple}} sobre tu hora normal.",
  ],
  ejemplo: ["Con 15,000 pesos al mes en jornada diurna, tu salario diario es de 500 y tu hora vale 62.50. Una hora extra doble vale 125."],
  faq: [
    {
      pregunta: "¿Por qué se divide el sueldo mensual entre 30 y no entre los días que trabajo?",
      respuesta: "Porque el sueldo mensual incluye el pago de los días de descanso. La Ley Federal del Trabajo toma el mes de 30 días para sacar el salario diario.",
    },
    {
      pregunta: "¿Qué es la jornada mixta?",
      respuesta: "La que combina horas del día y de la noche, siempre que la parte nocturna sea menor a tres horas y media. Si es de tres horas y media o más, cuenta como nocturna.",
    },
    {
      pregunta: "¿Cambia mi salario por hora con la jornada de 40 horas?",
      respuesta: "La reforma baja las horas semanales poco a poco hasta 2030. Si tu sueldo se mantiene y trabajas menos horas, cada hora vale más.",
    },
  ],
  glosario: [{ termino: "Jornada diurna", definicion: "La que se trabaja entre las 6 y las 20 horas." }],
});
