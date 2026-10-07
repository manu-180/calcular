import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.cuarta-categoria",
  h1: "Calculadora de recibo por honorarios",
  title: "Recibo por honorarios: calcula la retención del 8 %",
  description:
    "Calcula la retención de cuarta categoría ({{pe.retencion-cuarta}}) de tu recibo por honorarios y si puedes pedir la suspensión. Topes de SUNAT para 2026.",
  intro: [
    "Si trabajas como independiente y emites recibos por honorarios, la empresa que te paga te retiene un {{pe.retencion-cuarta}} como adelanto de tu impuesto a la renta.",
    "No hay retención si el recibo no pasa de {{pe.minimo-retencion-cuarta}}.",
    "Si en el año no vas a ganar más de {{pe.suspension-cuarta[anual]}}, puedes pedir a SUNAT que suspenda las retenciones. Para directores, síndicos y mandatarios el tope es {{pe.suspension-cuarta[anual-directores]}}.",
  ],
  comoSeCalcula: [
    "Si el recibo supera {{pe.minimo-retencion-cuarta}} y no tienes la suspensión, la retención es el {{pe.retencion-cuarta}} del monto total.",
    "Lo que cobras es el monto del recibo menos la retención.",
    "Al final del año, en la declaración anual, la retención se descuenta del impuesto. Para calcularlo se resta un {{pe.deduccion-cuarta}} de gastos (hasta {{pe.tope-deduccion-cuarta}}) y la deducción de {{pe.deduccion-renta-trabajo}}.",
  ],
  ejemplo: ["Es el ejemplo de SUNAT: emites un recibo de S/ 5,000 a una empresa. Te retienen S/ 400 y cobras S/ 4,600."],
  faq: [
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
