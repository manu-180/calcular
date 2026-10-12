import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.retenciones-ir",
  h1: "Calculadora de retenciones en la fuente del IR en Nicaragua",
  title: "Retenciones en la fuente del IR en Nicaragua: calculá",
  description: "Calculá la retención del IR en Nicaragua: {{ni.retenciones-ir[bienes-servicios]}} en compras de bienes y servicios, {{ni.retenciones-ir[tarjetas]}} en ventas con tarjeta y {{ni.retenciones-ir[profesionales]}} en servicios profesionales.",
  intro: [
    "Cuando una empresa o un agente retenedor te compra o te paga un servicio, se queda con una parte a cuenta de tu IR y la entrega a la DGI.",
    "Elegí el tipo de operación y poné el monto sin IVA. Te mostramos cuánto se retiene.",
  ],
  comoSeCalcula: [
    "Compra de bienes y servicios en general: {{ni.retenciones-ir[bienes-servicios]}}.",
    "Ventas cobradas con tarjeta de crédito o débito: {{ni.retenciones-ir[tarjetas]}}.",
    "Compra de bienes agropecuarios fuera de bolsa: {{ni.retenciones-ir[agropecuarios]}}.",
    "Servicios profesionales o técnicos de personas naturales: {{ni.retenciones-ir[profesionales]}}.",
    "En tarjetas y en bienes y servicios solo se retiene si la factura llega a {{ni.retencion-minimo-factura}}.",
  ],
  ejemplo: ["Si una empresa te compra mercadería por C$50,000 sin IVA, te retiene C$1,000 y te paga C$49,000 más el IVA."],
  faq: [
    {
      pregunta: "¿Cuánto es la retención del IR en compras en Nicaragua?",
      respuesta: "El {{ni.retenciones-ir[bienes-servicios]}} sobre la compra de bienes y servicios en general, si la factura llega a {{ni.retencion-minimo-factura}}.",
    },
    {
      pregunta: "¿La retención se calcula sobre el total con IVA?",
      respuesta: "No. Se calcula sobre el monto sin IVA.",
    },
    {
      pregunta: "¿Cuándo hay que pagar las retenciones a la DGI?",
      respuesta: "Hasta el quinto día del mes siguiente al de la retención.",
    },
    {
      pregunta: "¿Qué hago con lo que me retuvieron?",
      respuesta: "Lo restás de tu anticipo mensual o de tu IR anual. Guardá las constancias de retención.",
    },
  ],
  glosario: [
    { termino: "Agente retenedor", definicion: "Quien está obligado por la DGI a retener y entregar el impuesto de otros." },
    { termino: "Retención a cuenta", definicion: "Un adelanto del impuesto que se descuenta después en la declaración." },
  ],
});
