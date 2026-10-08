import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.cuarta-categoria",
  h1: "Calculadora de recibo por honorarios 2026",
  title: "Recibo por honorarios 2026: calcula la retención del {{pe.retencion-cuarta}}",
  description:
    "Calcula cuánto cobras de tu recibo por honorarios tras la retención de cuarta categoría del {{pe.retencion-cuarta}} y si puedes pedir la suspensión a SUNAT. Pon el monto.",
  intro: [
    "Si tu recibo por honorarios pasa de {{pe.minimo-retencion-cuarta}}, la empresa que te paga te retiene el {{pe.retencion-cuarta}} como adelanto de tu impuesto a la renta. Cobras el monto del recibo menos esa retención.",
    "Si en el año no vas a ganar más de {{pe.suspension-cuarta[anual]}}, puedes pedir a SUNAT que suspenda las retenciones. Para directores, síndicos y mandatarios el tope es {{pe.suspension-cuarta[anual-directores]}}.",
  ],
  comoSeCalcula: [
    "Si el recibo supera {{pe.minimo-retencion-cuarta}} y no tienes la suspensión, la retención es el {{pe.retencion-cuarta}} del monto total.",
    "Lo que cobras es el monto del recibo menos la retención.",
    "Al final del año, en la declaración anual, la retención se descuenta del impuesto. Para calcularlo se resta un {{pe.deduccion-cuarta}} de gastos (hasta {{pe.tope-deduccion-cuarta}}) y la deducción de {{pe.deduccion-renta-trabajo}}.",
  ],
  ejemplo: [
    "Es el ejemplo de SUNAT: emites un recibo de S/ 5,000 a una empresa. Te retienen S/ 400 y cobras S/ 4,600.",
    "Con un recibo de S/ 2,000 te retienen S/ 160 y cobras S/ 1,840.",
  ],
  faq: [
    {
      pregunta: "¿Desde qué monto me retienen el {{pe.retencion-cuarta}}?",
      respuesta: "Cuando el recibo pasa de {{pe.minimo-retencion-cuarta}}. Si es de ese monto o menos, no hay retención.",
    },
    {
      pregunta: "¿Cómo pido la suspensión de retenciones?",
      respuesta: "En SUNAT Virtual, con tu clave SOL, con el formulario virtual 1609. Si cumples los requisitos, se aprueba de forma automática. Muestra la constancia a quien te paga y deja de retenerte hasta el 31 de diciembre.",
    },
    {
      pregunta: "¿Todos los que me pagan me retienen?",
      respuesta: "No. Retienen las personas, empresas y entidades obligadas a llevar contabilidad. Si quien te paga no lleva contabilidad, no te retiene.",
    },
    {
      pregunta: "¿Qué pasa si me retienen de más?",
      respuesta: "Lo recuperas en la declaración anual: si las retenciones superan tu impuesto, SUNAT te devuelve la diferencia.",
    },
  ],
  glosario: [
    { termino: "Renta de cuarta categoría", definicion: "Los ingresos de quien trabaja por su cuenta, sin relación de dependencia." },
    { termino: "Recibo por honorarios", definicion: "El comprobante electrónico que emite quien trabaja como independiente." },
    { termino: "Suspensión de retenciones", definicion: "Constancia de SUNAT que libera de retenciones a quien no va a superar el tope anual." },
  ],
});
