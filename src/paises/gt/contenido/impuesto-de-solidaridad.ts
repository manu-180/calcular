import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.impuesto-de-solidaridad",
  h1: "Calculadora del Impuesto de Solidaridad (ISO)",
  title: "Impuesto de Solidaridad (ISO) en Guatemala: calculadora",
  description:
    "Calcule el ISO de cada trimestre con su activo neto y sus ingresos brutos. Le mostramos qué base aplica y cuánto paga en el año.",
  intro: [
    "El Impuesto de Solidaridad (ISO) lo pagan las empresas y personas con actividades mercantiles o agropecuarias inscritas en el régimen sobre las utilidades del ISR. Se paga cada trimestre.",
    "La base es la mayor entre una parte del activo neto y la misma parte de los ingresos brutos. La tarifa es del {{gt.iso-tasa}}.",
  ],
  comoSeCalcula: [
    "Se calcula el {{gt.iso-fraccion-base}} del activo neto y el {{gt.iso-fraccion-base}} de los ingresos brutos del año anterior.",
    "Se toma la base mayor. Si el activo neto es más de {{gt.iso-limite-activo}} veces los ingresos brutos, se usa la de ingresos.",
    "ISO del trimestre = base × {{gt.iso-tasa}}.",
  ],
  ejemplo: ["Con un activo neto de Q3,000,000 y ingresos brutos de Q2,000,000, la base es Q750,000 y paga Q7,500 por trimestre."],
  faq: [
    {
      pregunta: "¿Cuándo se paga el ISO?",
      respuesta: "Dentro del mes siguiente al cierre de cada trimestre calendario: en abril, julio, octubre y enero.",
    },
    {
      pregunta: "¿Puedo descontar el ISO del ISR?",
      respuesta: "Sí. Puede acreditar el ISO pagado al ISR del mismo año, o acreditar el ISR pagado al ISO. La opción se elige en la declaración.",
    },
    {
      pregunta: "¿Quién no paga ISO?",
      respuesta: "Entre otros, quienes están en el régimen opcional simplificado del ISR y las empresas durante sus primeros cuatro trimestres de operación.",
    },
  ],
  glosario: [
    { termino: "Activo neto", definicion: "El total del activo menos las depreciaciones y amortizaciones acumuladas y la reserva para cuentas incobrables." },
    { termino: "Ingresos brutos", definicion: "Todo lo que facturó en el año, antes de restar costos y gastos." },
  ],
});
