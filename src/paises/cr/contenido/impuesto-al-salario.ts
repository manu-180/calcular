import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.impuesto-al-salario",
  h1: "Calculadora del impuesto al salario {{anio}} en Costa Rica",
  title: "Impuesto al salario {{anio}} en Costa Rica: tramos y cálculo",
  description:
    "Calcule su impuesto al salario {{anio}} con los tramos de renta del Decreto 45333-H y los créditos de {{cr.credito-hijo}} por hijo y {{cr.credito-conyuge}} por cónyuge.",
  intro: [
    "En 2026 el impuesto al salario en Costa Rica se paga sobre la parte del salario mensual que pasa de ₡918.000, con tramos del 10 % al 25 %. Por debajo de ese monto no hay retención.",
    "Escriba su salario bruto del mes y, si los declara, sus hijos y su cónyuge. Le mostramos cuánta renta le retiene el patrono cada mes.",
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
      pregunta: "¿Pago el 25 % sobre todo mi salario?",
      respuesta: "No. Cada porcentaje se aplica solo a la parte del salario que cae en su tramo. Por eso el impuesto total siempre es menor que el porcentaje más alto.",
    },
    {
      pregunta: "¿Cuánto rebaja el crédito por hijo y por cónyuge?",
      respuesta: "{{cr.credito-hijo}} al mes por cada hijo y {{cr.credito-conyuge}} por el cónyuge. Se restan del impuesto ya calculado, no del salario.",
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
    { termino: "Retención", definicion: "La renta que el patrono descuenta del salario y entrega a Hacienda cada mes." },
  ],
});
