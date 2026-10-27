import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.valor-hora",
  h1: "Calculadora del valor de la hora de trabajo",
  title: "Valor de la hora de trabajo {{anio}} en Colombia",
  description:
    "Calcula cuánto vale tu hora ordinaria y tu día de trabajo con la jornada máxima vigente de {{co.jornada-semanal}} a la semana.",
  intro: [
    "El valor de tu hora sale de dividir el salario por las horas del mes. Como la jornada máxima está bajando por etapas, la hora vale un poco más cada vez que cambia.",
    "Desde el 15 de julio de 2026 la jornada máxima es de {{co.jornada-semanal}} a la semana. Escribe tu salario y te mostramos el valor de la hora y del día.",
  ],
  comoSeCalcula: [
    "Horas del mes: la jornada semanal ({{co.jornada-semanal}}) repartida en 6 días, por 30 días.",
    "Valor de la hora: salario mensual dividido por las horas del mes.",
    "Valor del día: salario mensual dividido por 30.",
  ],
  ejemplo: ["Con el salario mínimo de 2026 ($1.750.905) y la jornada de 42 horas, la hora ordinaria vale $8.338 y el día $58.364."],
  faq: [
    {
      pregunta: "¿Cuántas horas se trabajan al mes en Colombia?",
      respuesta: "Con la jornada de {{co.jornada-semanal}} a la semana, se toman 210 horas al mes para calcular el valor de la hora.",
    },
    {
      pregunta: "¿Para qué sirve el valor de la hora?",
      respuesta: "Para liquidar horas extra, recargos nocturnos y dominicales. Con este valor puedes usar nuestra calculadora de horas extras.",
    },
    {
      pregunta: "¿La jornada sigue bajando?",
      respuesta: "La reducción de la Ley 2101 de 2021 llega a 42 horas semanales el 15 de julio de 2026, que es su última etapa.",
    },
  ],
  glosario: [
    { termino: "Jornada máxima", definicion: "Las horas semanales que se pueden trabajar sin que sean horas extra." },
    { termino: "Hora ordinaria", definicion: "Una hora dentro de tu jornada normal, sin recargos." },
  ],
});
