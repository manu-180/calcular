import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.isr-regimen-simplificado",
  h1: "Calculadora del ISR en el régimen simplificado",
  title: "ISR régimen opcional simplificado: calcule su retención",
  description:
    "Calcule el ISR de una factura en el régimen opcional simplificado sobre ingresos: monto sin IVA, IVA, ISR y lo que recibe si le retienen.",
  intro: [
    "En el régimen opcional simplificado sobre ingresos de actividades lucrativas, el ISR se paga sobre lo que factura, sin restar gastos. Lo usan muchos profesionales y negocios que emiten factura con IVA.",
    "Si su cliente es agente de retención, le descuenta el ISR al pagarle. Si no, usted lo paga a la SAT el mes siguiente.",
  ],
  comoSeCalcula: [
    "Se quita el IVA del monto facturado: monto / (1 + {{gt.iva}}).",
    "Al monto sin IVA se le aplica la tarifa del régimen: un porcentaje sobre la parte que llega al primer tramo y otro más alto sobre lo que lo pasa.",
    "Lo que recibe = monto sin IVA + IVA menos el ISR retenido.",
  ],
  ejemplo: ["Una factura de Q11,200 con IVA tiene Q10,000 de base, Q1,200 de IVA y Q500 de ISR. Si le retienen, recibe Q10,700."],
  faq: [
    {
      pregunta: "¿Cuándo me retienen el ISR?",
      respuesta: "Cuando su cliente es agente de retención y la factura llega a {{gt.isr-simplificado-minimo-retencion}} sin IVA. Le tienen que entregar la constancia de retención.",
    },
    {
      pregunta: "¿Qué hago si no me retienen?",
      respuesta: "Paga usted el ISR de esas facturas en la declaración mensual del mes siguiente.",
    },
    {
      pregunta: "¿Me conviene el régimen simplificado o el de utilidades?",
      respuesta: "Si sus gastos son bajos, el simplificado suele salir más barato y es más fácil. Si tiene muchos gastos con factura, el de utilidades puede convenirle. Consulte a un contador antes de cambiar.",
    },
  ],
  glosario: [
    { termino: "Agente de retención", definicion: "Empresa o entidad que la SAT obliga a descontar el ISR al pagar facturas y entregarlo a la SAT." },
    { termino: "Constancia de retención", definicion: "Documento que prueba que le retuvieron el ISR. Lo necesita para su declaración." },
  ],
});
