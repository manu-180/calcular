import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.retencion-honorarios",
  h1: "Calculadora de retención sobre honorarios profesionales en Honduras",
  title: "Retención del {{hn.retencion-honorarios}} sobre honorarios en Honduras",
  description: "Calcule la retención del ISR del {{hn.retencion-honorarios}} sobre sus honorarios, con o sin ISV, y cuánto recibe al final. Con la Ley del Impuesto Sobre la Renta.",
  intro: [
    "Si cobra honorarios profesionales, dietas o comisiones a una empresa o al Estado, le retienen el {{hn.retencion-honorarios}} como anticipo del ISR.",
    "Escriba lo que va a facturar o lo que quiere recibir. Le mostramos la retención, el ISV si su factura lo lleva y lo que le queda.",
  ],
  comoSeCalcula: [
    "Retención = honorarios × {{hn.retencion-honorarios}}.",
    "Si la factura lleva ISV, se suma el {{hn.isv[general]}} sobre los honorarios. La retención se calcula sobre los honorarios, sin el ISV.",
    "Lo que recibe = total de la factura menos la retención.",
  ],
  ejemplo: ["Factura L10,000 de honorarios con ISV. La factura suma L11,500, le retienen L1,250 y recibe L10,250."],
  faq: [
    {
      pregunta: "¿Quién tiene que retener el {{hn.retencion-honorarios}}?",
      respuesta: "Las empresas y entidades del Estado que pagan honorarios, dietas, comisiones o servicios técnicos a personas residentes en Honduras.",
    },
    {
      pregunta: "¿La retención es un impuesto aparte?",
      respuesta: "No. Es un adelanto de su ISR del año. En su declaración anual la resta del impuesto que le toque pagar.",
    },
    {
      pregunta: "¿Hay casos en que no se retiene?",
      respuesta: "Sí. No se retiene a quien está en el régimen de pagos a cuenta, ni en algunos contratos de trabajo cuyos honorarios son su única fuente de ingresos y no pasan del tramo exento.",
    },
  ],
  glosario: [
    { termino: "Honorarios", definicion: "El pago por servicios profesionales independientes, sin relación de trabajo." },
    { termino: "Pagos a cuenta", definicion: "El régimen en el que el contribuyente adelanta su ISR en cuotas durante el año." },
  ],
});
