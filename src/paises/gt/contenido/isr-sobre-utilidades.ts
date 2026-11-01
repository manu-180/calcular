import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.isr-sobre-utilidades",
  h1: "Calculadora del ISR sobre utilidades",
  title: "ISR sobre utilidades en Guatemala: calculadora {{anio}}",
  description:
    "Calcule el ISR de su empresa en el régimen sobre las utilidades de actividades lucrativas: renta imponible, impuesto del año y pagos trimestrales.",
  intro: [
    "En el régimen sobre las utilidades de actividades lucrativas, el ISR se paga sobre la ganancia: ingresos menos costos y gastos deducibles. La tarifa es del {{gt.isr-utilidades}}.",
    "Durante el año se hacen pagos a cuenta cada trimestre y en la declaración anual se ajusta la diferencia.",
  ],
  comoSeCalcula: [
    "Renta imponible = ingresos que pagan ISR menos costos y gastos deducibles.",
    "ISR del año = renta imponible × {{gt.isr-utilidades}}.",
    "Si hay pérdida, no se paga ISR ese año.",
  ],
  ejemplo: ["Una empresa con utilidad de Q400,000 en el año paga Q100,000 de ISR, unos Q25,000 por trimestre."],
  faq: [
    {
      pregunta: "¿Qué gastos son deducibles?",
      respuesta: "Los necesarios para producir la renta y que estén respaldados con factura o documento legal: salarios con sus cuotas del IGSS, alquileres, servicios, depreciaciones y otros que indica la ley.",
    },
    {
      pregunta: "¿Cuándo se pagan los pagos trimestrales?",
      respuesta: "Dentro de los 10 días hábiles siguientes al cierre de cada trimestre. La declaración anual se presenta hasta el 31 de marzo del año siguiente.",
    },
    {
      pregunta: "¿Puedo restar el ISO que pagué?",
      respuesta: "Sí, si eligió acreditar el ISO al ISR. Lo pagado de ISO en el año se descuenta del ISR.",
    },
  ],
  glosario: [
    { termino: "Renta imponible", definicion: "La ganancia sobre la que se calcula el impuesto." },
    { termino: "Pago a cuenta", definicion: "Pago trimestral adelantado que se descuenta del ISR del año." },
  ],
});
