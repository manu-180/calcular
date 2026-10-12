import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.retencion-uno-por-ciento",
  h1: "Calculadora de la retención del {{hn.retencion-proveedores}} a proveedores en Honduras",
  title: "Retención del {{hn.retencion-proveedores}} a proveedores en Honduras",
  description: "Calcule la retención del {{hn.retencion-proveedores}} del ISR que hacen las empresas con ventas de más de {{hn.retencion-proveedores-ventas-minimas}} al año a sus proveedores.",
  intro: [
    "Las empresas y comerciantes con ventas de más de {{hn.retencion-proveedores-ventas-minimas}} al año son agentes de retención: le retienen el {{hn.retencion-proveedores}} del ISR a sus proveedores.",
    "No se retiene a los proveedores que están en el régimen de pagos a cuenta.",
  ],
  comoSeCalcula: ["Retención = valor de la compra o del servicio × {{hn.retencion-proveedores}}.", "Se paga al proveedor el valor menos la retención."],
  ejemplo: ["Una empresa grande compra L250,000 en mercadería. Retiene L2,500 y paga L247,500, más el ISV de la factura."],
  faq: [
    {
      pregunta: "¿Quién retiene el {{hn.retencion-proveedores}}?",
      respuesta: "Las personas jurídicas y comerciantes individuales con ventas de más de {{hn.retencion-proveedores-ventas-minimas}} al año, cuando el SAR los designa agentes de retención.",
    },
    {
      pregunta: "¿Pierdo ese dinero si soy el proveedor?",
      respuesta: "No. Es un anticipo de su ISR. Lo resta en su declaración anual con los comprobantes de retención.",
    },
    {
      pregunta: "¿A quién no se le retiene?",
      respuesta: "A los proveedores que están en el régimen de pagos a cuenta autorizado por el SAR.",
    },
  ],
  glosario: [
    { termino: "Agente de retención", definicion: "Quien está obligado a descontar un impuesto al pagar y entregarlo al SAR." },
    { termino: "Comprobante de retención", definicion: "El documento que prueba la retención y sirve para restarla en la declaración." },
  ],
});
