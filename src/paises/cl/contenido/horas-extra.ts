import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.horas-extra",
  h1: "Calculadora de horas extras {{anio}} en Chile",
  title: "Calculadora de horas extras {{anio}} en Chile (ley 40 horas)",
  description:
    "Calcula el valor de tu hora extra con el recargo legal de {{cl.recargo-hora-extra}} y la jornada de {{cl.jornada-maxima}} semanales de la ley de 40 horas. Fórmula de la Dirección del Trabajo.",
  intro: [
    "La hora extra se paga con un recargo de {{cl.recargo-hora-extra}} sobre tu hora normal. La hora normal es tu sueldo dividido por 30, multiplicado por 28 y dividido por las horas de cuatro semanas.",
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
    "Con el sueldo mínimo de 2026 ($553.553) y jornada de 42 horas, la hora extra vale $4.613.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el valor de la hora extra?",
      respuesta: "Divide tu sueldo por 30, multiplica por 28 y divide por 4 veces tu jornada semanal. A ese valor de hora normal súmale el {{cl.recargo-hora-extra}}.",
    },
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
