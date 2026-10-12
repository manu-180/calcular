import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.detracciones",
  h1: "Calculadora de detracciones de servicios",
  title: "Detracciones 2026: calcula cuánto depositar",
  description:
    "Calcula la detracción de una factura de servicios: {{pe.detraccion-servicios[demas-servicios]}} en la mayoría, {{pe.detraccion-servicios[arrendamiento]}} en alquileres y {{pe.detraccion-servicios[construccion]}} en construcción. Tabla del anexo 3 de SUNAT.",
  intro: [
    "Si pagas una factura por un servicio sujeto a detracción, tienes que separar un porcentaje y depositarlo en la cuenta del proveedor en el Banco de la Nación. El resto se lo pagas directo.",
    "Pon el importe total de la factura y el tipo de servicio. Te decimos cuánto depositar y cuánto pagar al proveedor.",
  ],
  comoSeCalcula: [
    "Se toma el importe total de la factura, con IGV incluido.",
    "Se aplica el porcentaje del tipo de servicio: {{pe.detraccion-servicios[demas-servicios]}} para intermediación laboral, mantenimiento, otros servicios empresariales y demás servicios; {{pe.detraccion-servicios[arrendamiento]}} para arrendamiento, movimiento de carga, comisión mercantil, fabricación por encargo y transporte de personas; {{pe.detraccion-servicios[construccion]}} para contratos de construcción.",
    "Si el importe es de {{pe.monto-minimo-detraccion}} o menos, no hay detracción.",
  ],
  ejemplo: ["Contratas un servicio de catering por S/ 55,000 más IGV: la factura es S/ 64,900. Depositas S/ 7,788 (12 %) en el Banco de la Nación y le pagas S/ 57,112 al proveedor."],
  faq: [
    {
      pregunta: "¿Quién deposita la detracción?",
      respuesta: "El que paga el servicio (el cliente). La deposita en la cuenta de detracciones que el proveedor tiene en el Banco de la Nación.",
    },
    {
      pregunta: "¿Desde qué monto se aplica la detracción de servicios?",
      respuesta: "Cuando el importe de la operación es mayor a {{pe.monto-minimo-detraccion}}.",
    },
    {
      pregunta: "¿Para qué sirve la plata de la cuenta de detracciones?",
      respuesta: "El proveedor la usa para pagar sus impuestos y deudas con SUNAT.",
    },
    {
      pregunta: "¿El transporte de carga está en esta tabla?",
      respuesta: "No. El servicio de transporte de bienes por carretera tiene su propio régimen de detracción, con otras reglas.",
    },
  ],
  glosario: [
    { termino: "Detracción", definicion: "Descuento que hace el cliente sobre el pago de ciertos bienes y servicios para depositarlo en la cuenta del proveedor en el Banco de la Nación (SPOT)." },
    { termino: "SPOT", definicion: "Sistema de Pago de Obligaciones Tributarias, el nombre oficial del sistema de detracciones." },
  ],
});
