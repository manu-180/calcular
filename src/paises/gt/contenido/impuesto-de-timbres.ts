import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.impuesto-de-timbres",
  h1: "Calculadora del impuesto de timbres fiscales",
  title: "Impuesto de timbres fiscales en Guatemala: calculadora",
  description:
    "Calcule el impuesto de timbres fiscales y de papel sellado de un contrato o documento con la tarifa vigente de la ley.",
  intro: [
    "El impuesto de timbres fiscales se paga sobre el valor de ciertos documentos, como contratos civiles y mercantiles. La tarifa general es del {{gt.timbres}} del valor del documento.",
    "Un caso común es la venta de una casa usada: la primera venta paga IVA, pero las siguientes pagan timbres.",
  ],
  comoSeCalcula: ["Impuesto = valor del documento × {{gt.timbres}}."],
  ejemplo: ["Un contrato de Q100,000 paga Q3,000 de timbres."],
  faq: [
    {
      pregunta: "¿Qué documentos pagan timbres?",
      respuesta: "Los contratos civiles y mercantiles, las escrituras de compraventa de bienes que no pagan IVA y otros documentos que indica la ley. Algunos pagan una cuota fija y otros están exentos.",
    },
    {
      pregunta: "¿Una venta paga IVA y timbres al mismo tiempo?",
      respuesta: "No. Si la operación paga IVA, el documento no paga además timbres.",
    },
    {
      pregunta: "¿Cuánto pago de timbres por la venta de un inmueble?",
      respuesta: "Si no es la primera venta, el {{gt.timbres}} del valor de la escritura. Su notario calcula el monto exacto y le indica cómo pagarlo.",
    },
  ],
  glosario: [{ termino: "Timbre fiscal", definicion: "Forma de pagar el impuesto que grava ciertos documentos. Hoy se paga con formulario electrónico." }],
});
