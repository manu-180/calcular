import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.retencion-iva",
  h1: "Calculadora de retención y percepción del {{sv.retencion-iva}} de IVA",
  title: "Retención del {{sv.retencion-iva}} de IVA en El Salvador: calculadora",
  description: "Calcule la retención o percepción del {{sv.retencion-iva}} de IVA que hace un gran contribuyente y el total de la factura. Aplica desde {{sv.retencion-iva-minimo}} sin IVA.",
  intro: [
    "Cuando un gran contribuyente le compra a usted, le retiene el {{sv.retencion-iva}} del precio como anticipo de IVA. Cuando le vende, le cobra ese {{sv.retencion-iva}} de más: es la percepción.",
    "Solo se hace en operaciones de {{sv.retencion-iva-minimo}} o más, sin contar el IVA.",
  ],
  comoSeCalcula: [
    "IVA: el {{sv.iva}} del precio.",
    "Retención o percepción: el {{sv.retencion-iva}} del precio sin IVA, si llega a {{sv.retencion-iva-minimo}}.",
    "Si le retienen, se resta del total de la factura. Si le perciben, se suma.",
  ],
  ejemplo: [
    "Usted le vende $1,000 a un gran contribuyente: IVA $130, retención $10 y recibe $1,120.",
    "Usted le compra $1,000: paga $1,000 + $130 de IVA + $10 de percepción = $1,140.",
  ],
  faq: [
    {
      pregunta: "¿Pierdo ese {{sv.retencion-iva}}?",
      respuesta: "No. Es un pago adelantado de su IVA. En la declaración del mes lo resta del impuesto que le toca pagar.",
    },
    {
      pregunta: "¿Cómo sé si alguien es gran contribuyente?",
      respuesta: "Hacienda lo clasifica así y se lo indica en su tarjeta de contribuyente. También publica el listado en su sitio.",
    },
    {
      pregunta: "¿Se calcula sobre el precio con IVA?",
      respuesta: "No. El {{sv.retencion-iva}} va sobre el precio sin IVA.",
    },
    {
      pregunta: "¿Y si la compra es de menos de {{sv.retencion-iva-minimo}}?",
      respuesta: "No hay retención ni percepción. Se factura solo el precio más el IVA.",
    },
  ],
  glosario: [
    { termino: "Gran contribuyente", definicion: "Empresa o persona que Hacienda clasifica así por el tamaño de sus operaciones." },
    { termino: "Percepción", definicion: "El anticipo de IVA que cobra el gran contribuyente cuando vende." },
  ],
});
