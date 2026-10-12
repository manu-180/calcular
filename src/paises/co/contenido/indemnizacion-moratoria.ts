import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.indemnizacion-moratoria",
  h1: "Calculadora de indemnización moratoria",
  title: "Indemnización moratoria: un día de salario por día",
  description:
    "Calcula la sanción que paga la empresa si no te paga la liquidación o no consigna tus cesantías a tiempo: un día de salario por cada día de retraso.",
  intro: [
    "Si al terminar el contrato la empresa no te paga salarios y prestaciones, te debe un día de salario por cada día de retraso. Es la indemnización moratoria.",
    "Lo mismo pasa si no consigna tus cesantías en el fondo antes del 15 de febrero. Escribe tu salario y las fechas para ver cuánto suma.",
  ],
  comoSeCalcula: [
    "Valor del día: tu último salario mensual dividido por 30.",
    "Días: desde la fecha en que te tenían que pagar hasta el pago.",
    "Tope: si ganabas más de {{co.moratoria-umbral}}, se paga hasta {{co.moratoria-meses}} meses. Después corren intereses de mora a la tasa máxima.",
    "Con un salario mínimo o menos, y en las cesantías no consignadas, no hay tope de meses.",
  ],
  ejemplo: ["Con un salario de $3.000.000 y 45 días de retraso en la liquidación, la empresa te debe $4.500.000 de indemnización moratoria."],
  faq: [
    {
      pregunta: "¿Desde cuándo corre la indemnización moratoria?",
      respuesta: "Desde el día en que termina el contrato sin que te paguen lo que te deben. Para las cesantías, desde el vencimiento del plazo de consignación.",
    },
    {
      pregunta: "¿Hay un tope?",
      respuesta: "Si ganabas más de {{co.moratoria-umbral}}, la indemnización diaria va hasta {{co.moratoria-meses}} meses. Desde el mes 25 se cobran intereses de mora.",
    },
    {
      pregunta: "¿Y si la empresa y yo no estamos de acuerdo en cuánto me debe?",
      respuesta: "La empresa puede consignar ante un juez de trabajo lo que reconoce deber. Así cumple mientras se resuelve la diferencia.",
    },
  ],
  glosario: [
    { termino: "Indemnización moratoria", definicion: "La sanción por pagar tarde la liquidación o las cesantías." },
  ],
});
