import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.impuesto-al-salario",
  h1: "Calculadora del impuesto al salario en Costa Rica",
  title: "Impuesto al salario 2026: calcule su renta mensual",
  description:
    "Calcule el impuesto al salario 2026 con los tramos del Decreto 45333-H y los créditos de {{cr.credito-hijo}} por hijo y {{cr.credito-conyuge}} por cónyuge.",
  intro: [
    "El impuesto al salario es la renta que el patrono retiene cada mes a quienes ganan por encima del monto exento.",
    "Escriba su salario bruto del mes y, si los declara, sus hijos y su cónyuge. Le mostramos cuánto le retienen.",
  ],
  comoSeCalcula: [
    "Hasta ₡918.000 al mes no se paga impuesto.",
    "Sobre el exceso de ₡918.000 y hasta ₡1.347.000 se paga el 10 %. Hasta ₡2.364.000, el 15 %. Hasta ₡4.727.000, el 20 %. Y sobre el exceso, el 25 %.",
    "Cada tramo paga solo por la parte del salario que cae en él.",
    "Al impuesto se le restan los créditos fiscales: {{cr.credito-hijo}} por cada hijo y {{cr.credito-conyuge}} por el cónyuge.",
  ],
  ejemplo: [
    "Con un salario de ₡1.200.000, la parte gravada es ₡282.000. Al 10 %, el impuesto es ₡28.200 al mes.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuánto se paga renta en 2026?",
      respuesta: "Desde ₡918.000 mensuales. En 2026 el límite bajó un poco porque los tramos se ajustaron con una inflación negativa del 0,38 %.",
    },
    {
      pregunta: "¿Quién puede usar el crédito por hijo?",
      respuesta: "Por hijos menores de edad, con incapacidad para mantenerse o que estudien en la universidad hasta los 25 años. Si los dos padres trabajan, lo usa solo uno.",
    },
    {
      pregunta: "¿Las cuotas de la Caja se restan antes de calcular la renta?",
      respuesta: "No. El impuesto se calcula sobre el salario bruto del mes.",
    },
  ],
  glosario: [
    { termino: "Tramo", definicion: "Cada franja de salario con su propio porcentaje de impuesto." },
    { termino: "Crédito fiscal", definicion: "Un monto fijo que se resta del impuesto ya calculado." },
  ],
});
