import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.recibo-de-honorarios",
  h1: "Calculadora de recibo de honorarios con retenciones {{anio}}",
  title: "Recibo de honorarios {{anio}}: IVA y retenciones",
  description:
    "Calcula tu factura de honorarios: IVA, retención de ISR del {{mx.retencion-isr-honorarios}} (o {{mx.retencion-isr-resico}} en RESICO) y retención de dos terceras partes del IVA.",
  intro: [
    "Si facturas honorarios a una empresa, te retiene parte del ISR y del IVA. Por eso lo que te depositan es menos que el total de tu factura.",
    "Escribe tus honorarios antes de IVA, tu régimen y a quién le facturas para ver cada concepto.",
  ],
  comoSeCalcula: [
    "IVA: {{mx.iva-general}} de tus honorarios.",
    "Si le facturas a una persona moral, te retiene ISR: {{mx.retencion-isr-honorarios}} en actividades profesionales o {{mx.retencion-isr-resico}} si estás en RESICO.",
    "También te retiene dos terceras partes del IVA.",
    "Lo que recibes: honorarios más IVA, menos las dos retenciones.",
    "Una persona física no retiene: te paga el total con IVA.",
  ],
  ejemplo: ["Por 10,000 pesos de honorarios a una empresa, la factura suma 11,600 con IVA. Te retienen 1,000 de ISR y 1,066.67 de IVA, así que recibes 9,533.33."],
  faq: [
    {
      pregunta: "¿Cuánto me retienen por honorarios?",
      respuesta: "Una empresa te retiene {{mx.retencion-isr-honorarios}} de ISR sobre tus honorarios ({{mx.retencion-isr-resico}} en RESICO) y dos terceras partes del IVA.",
    },
    {
      pregunta: "¿Pierdo lo que me retienen?",
      respuesta: "No. Es un pago adelantado de tus impuestos: lo restas en tu declaración mensual del ISR y del IVA.",
    },
    {
      pregunta: "¿Una persona física me tiene que retener?",
      respuesta: "No. Solo retienen las personas morales. Si le facturas a una persona física, cobras el total y pagas tus impuestos en tu declaración.",
    },
  ],
  glosario: [
    { termino: "Persona moral", definicion: "Empresa o sociedad, a diferencia de una persona física." },
    { termino: "Retención", definicion: "Parte del impuesto que tu cliente descuenta de tu pago y entrega al SAT a tu nombre." },
  ],
});
