import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.retencion-en-la-fuente",
  h1: "Calculadora de retención en la fuente del impuesto a la renta",
  title: "Retención en la fuente 2026: porcentajes del SRI",
  description: "Calcula la retención del impuesto a la renta de una factura con los porcentajes del SRI vigentes: honorarios {{ec.retencion-renta[honorarios]}}, bienes {{ec.retencion-renta[bienes]}} y más.",
  intro: [
    "Cuando una empresa o un agente de retención te paga una factura, se queda con una parte para el impuesto a la renta. Eso es la retención en la fuente.",
    "Elige qué se paga y pon el valor sin IVA. Te mostramos la retención y lo que recibes.",
  ],
  comoSeCalcula: [
    "Cada tipo de pago tiene su porcentaje, fijado por el SRI.",
    "La retención se calcula sobre el valor sin IVA.",
    "Recibes el total de la factura (con IVA) menos la retención.",
  ],
  ejemplo: ["Una factura de honorarios de $1.000 más IVA suma $1.150. Te retienen $100 y recibes $1.050."],
  faq: [
    {
      pregunta: "¿Cuánto me retienen por honorarios profesionales?",
      respuesta: "El {{ec.retencion-renta[honorarios]}} del valor sin IVA, si el servicio tiene que ver con tu título profesional.",
    },
    {
      pregunta: "¿Cuánto se retiene en la compra de bienes?",
      respuesta: "El {{ec.retencion-renta[bienes]}} del valor sin IVA.",
    },
    {
      pregunta: "¿A los RIMPE se les retiene?",
      respuesta: "A un emprendedor RIMPE, el {{ec.retencion-renta[rimpe-emprendedor]}}. A un negocio popular, el {{ec.retencion-renta[rimpe-popular]}}.",
    },
    {
      pregunta: "¿Qué hago con lo que me retuvieron?",
      respuesta: "Lo descuentas del impuesto a la renta que declaras. Si te retuvieron más de lo que debes, puedes pedir la devolución al SRI.",
    },
  ],
  glosario: [
    { termino: "Agente de retención", definicion: "Quien está obligado a retener el impuesto al pagar: empresas, entidades públicas y personas designadas por el SRI." },
    { termino: "Comprobante de retención", definicion: "El documento electrónico que te entregan con el valor retenido." },
  ],
});
