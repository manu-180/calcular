import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.horas-extra",
  h1: "Calculadora de horas extra",
  title: "Horas extra 2026: calcula cuánto te pagan",
  description:
    "Calcula el valor de tu hora extra con el recargo legal de {{cl.recargo-hora-extra}} y la jornada máxima vigente de {{cl.jornada-maxima}} semanales (ley de 40 horas).",
  intro: [
    "Las horas extra son las que trabajas por encima de la jornada de tu contrato. Se pagan con un recargo de {{cl.recargo-hora-extra}} sobre el valor de la hora normal.",
    "Desde el {{cl.jornada-maxima#desde}} la jornada máxima es de {{cl.jornada-maxima}} semanales. Con menos horas, cada hora vale más.",
  ],
  comoSeCalcula: [
    "Se divide el sueldo mensual por 30 y se multiplica por 28. Así se obtiene el sueldo de cuatro semanas.",
    "Ese monto se divide por las horas de cuatro semanas (4 por tu jornada semanal). El resultado es el valor de la hora normal.",
    "La hora extra vale la hora normal más el recargo de {{cl.recargo-hora-extra}}.",
    "Si tu sueldo base es menor que el ingreso mínimo ({{cl.imm}}, en proporción a tu jornada), el cálculo se hace sobre el mínimo.",
  ],
  ejemplo: [
    "Es el ejemplo de la Dirección del Trabajo: con $800.000 de sueldo y 42 horas semanales, la hora normal vale $800.000 / 30 × 28 / 168 = $4.444. La hora extra vale $6.667.",
  ],
  faq: [
    {
      pregunta: "¿Cuántas horas extra se pueden hacer?",
      respuesta: "Hasta 2 por día, y solo para atender necesidades temporales de la empresa. El pacto tiene que constar por escrito.",
    },
    {
      pregunta: "¿Puedo cambiar horas extra por días libres?",
      respuesta: "Sí, si lo acuerdan por escrito. Por cada hora extra te corresponde una hora y media de descanso, con un máximo de cinco días hábiles al año.",
    },
    {
      pregunta: "¿Cuándo se pagan?",
      respuesta: "Junto con el sueldo del mes en que las trabajaste.",
    },
    {
      pregunta: "¿Qué pasa con la jornada en 2028?",
      respuesta: "El 26 de abril de 2028 la jornada máxima baja a 40 horas. Ese día sube el valor de la hora y lo actualizamos.",
    },
  ],
  glosario: [
    { termino: "Jornada ordinaria", definicion: "Las horas semanales pactadas en tu contrato, sin contar las extra." },
    { termino: "Recargo", definicion: "Porcentaje que se suma al valor de la hora normal cuando es extra." },
  ],
});
